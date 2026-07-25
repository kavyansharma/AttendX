import React, { useState, useEffect } from 'react';
import { TimetableService, TimetableConflictCheck } from '../../services/timetableService';
import { AdminService } from '../../services/adminService';
import { TimetableEntry, Teacher, Subject, Section } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { AlertTriangle, Clock, Calendar, Plus } from 'lucide-react';

export const TimetablePage: React.FC = () => {
  const [timetables, setTimetables] = useState<TimetableEntry[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [day, setDay] = useState<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>('monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [roomNumber, setRoomNumber] = useState('Lab 304');

  // Conflict state
  const [conflict, setConflict] = useState<TimetableConflictCheck | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [tt, tch, sub, sec] = await Promise.all([
      TimetableService.getTimetables(),
      AdminService.getTeachers(),
      AdminService.getSubjects(),
      AdminService.getSections(),
    ]);
    setTimetables(tt);
    setTeachers(tch);
    setSubjects(sub);
    setSections(sec);

    if (sec.length > 0) setSelectedSection(sec[0].id);
    if (sub.length > 0) setSelectedSubject(sub[0].id);
    if (tch.length > 0) setSelectedTeacher(tch[0].id);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Validate conflict when form selection changes
  useEffect(() => {
    async function validate() {
      if (!selectedTeacher || !selectedSection) return;
      const res = await TimetableService.checkConflict({
        teacherId: selectedTeacher,
        sectionId: selectedSection,
        day,
        startTime,
        endTime,
      });
      setConflict(res.hasConflict ? res : null);
    }
    validate();
  }, [selectedTeacher, selectedSection, day, startTime, endTime]);

  const handleCreateTimetable = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await TimetableService.createTimetable({
        sectionId: selectedSection,
        subjectId: selectedSubject,
        teacherId: selectedTeacher,
        day,
        startTime,
        endTime,
        roomNumber,
      });
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Conflict detected');
    }
  };

  const columns: Column<TimetableEntry>[] = [
    {
      header: 'Day & Time Slot',
      accessor: (item) => (
        <div>
          <span className="font-bold text-white uppercase text-xs">{item.day}</span>
          <div className="text-[11px] text-indigo-400 font-mono font-semibold">
            {item.startTime} - {item.endTime}
          </div>
        </div>
      ),
    },
    {
      header: 'Section',
      accessor: (item) => <span className="badge badge-info text-xs">{item.sectionName}</span>,
    },
    {
      header: 'Subject',
      accessor: (item) => <span className="font-bold text-white text-xs">{item.subjectName}</span>,
    },
    {
      header: 'Assigned Faculty',
      accessor: (item) => <span className="text-xs text-slate-300">{item.teacherName}</span>,
    },
    {
      header: 'Room',
      accessor: (item) => <span className="text-xs text-slate-400 font-mono">{item.roomNumber}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Weekly Timetable Master Schedule"
        subtitle="Configure room time slots and validate faculty schedule overlap conflicts"
        data={timetables}
        columns={columns}
        searchPlaceholder="Search by Day, Subject, Teacher, or Room..."
        onAddClick={() => setModalOpen(true)}
        addLabel="Add Timetable Slot"
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create Timetable Entry</h3>

            {conflict && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{conflict.conflictType.replace('_', ' ')} DETECTED</div>
                  <p className="mt-0.5">{conflict.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreateTimetable} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Day *</label>
                <select
                  value={day}
                  onChange={(e: any) => setDay(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs uppercase"
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time *</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Time *</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Section *</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  {sections.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject *</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Faculty Member *</label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.fullName} ({t.employeeId})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={Boolean(conflict)}
                  className="btn btn-primary text-xs"
                >
                  Save Timetable Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
