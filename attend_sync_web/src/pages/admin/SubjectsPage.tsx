import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Subject } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { BookOpen } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [subjectType, setSubjectType] = useState<'Theory' | 'Lab' | 'Elective'>('Theory');

  const loadData = async () => {
    const s = await AdminService.getSubjects();
    setSubjects(s);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminService.createSubject({
      departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      code,
      name,
      subjectType,
    });
    setModalOpen(false);
    setCode('');
    setName('');
    loadData();
  };

  const columns: Column<Subject>[] = [
    {
      header: 'Subject Code',
      accessor: (item) => <span className="font-mono font-bold text-indigo-400">{item.code}</span>,
    },
    {
      header: 'Subject Name',
      accessor: (item) => (
        <div className="font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400" />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: (item) => <span className="badge badge-info text-xs">{item.subjectType}</span>,
    },
    {
      header: 'Min Attendance Req',
      accessor: (item) => <span className="font-bold text-emerald-400 text-xs">{item.minAttendancePercentage}%</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Curriculum Subjects"
        subtitle="Manage semester subject catalog and attendance compliance thresholds"
        data={subjects}
        columns={columns}
        searchPlaceholder="Search by Subject Code or Name..."
        onAddClick={() => setModalOpen(true)}
        addLabel="Add Subject"
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Curriculum Subject</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Code *</label>
                <input
                  type="text"
                  required
                  placeholder="CS405"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Software Engineering"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Type *</label>
                <select
                  value={subjectType}
                  onChange={(e: any) => setSubjectType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  <option value="Theory">Theory</option>
                  <option value="Lab">Lab</option>
                  <option value="Elective">Elective</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
