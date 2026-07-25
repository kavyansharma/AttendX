import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { TeacherAssignment, Teacher, Subject, Section } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';

export const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const loadData = async () => {
    setLoading(true);
    const [asg, tch, sub, sec] = await Promise.all([
      AdminService.getAssignments(),
      AdminService.getTeachers(),
      AdminService.getSubjects(),
      AdminService.getSections(),
    ]);
    setAssignments(asg);
    setTeachers(tch);
    setSubjects(sub);
    setSections(sec);

    if (tch.length > 0) setSelectedTeacher(tch[0].id);
    if (sub.length > 0) setSelectedSubject(sub[0].id);
    if (sec.length > 0) setSelectedSection(sec[0].id);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminService.createAssignment({
      teacherId: selectedTeacher,
      subjectId: selectedSubject,
      sectionId: selectedSection,
    });
    setModalOpen(false);
    loadData();
  };

  const columns: Column<TeacherAssignment>[] = [
    {
      header: 'Faculty Member',
      accessor: (item) => <span className="font-bold text-white">{item.teacherName}</span>,
    },
    {
      header: 'Assigned Subject',
      accessor: (item) => <span className="text-xs font-semibold text-indigo-400">{item.subjectName}</span>,
    },
    {
      header: 'Section',
      accessor: (item) => <span className="badge badge-info text-xs">{item.sectionName}</span>,
    },
    {
      header: 'Academic Year',
      accessor: (item) => <span className="text-xs text-slate-400">{item.yearLabel}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Teacher Subject & Section Assignments"
        subtitle="Authorize faculty to mark live class attendance for specific subject sections"
        data={assignments}
        columns={columns}
        searchPlaceholder="Search by Teacher, Subject, or Section..."
        onAddClick={() => setModalOpen(true)}
        addLabel="Assign Subject to Faculty"
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">New Subject-Section Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Faculty *</label>
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Subject *</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Section *</label>
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

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
