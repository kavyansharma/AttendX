import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Course, Department } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { BookOpen } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deptId, setDeptId] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const loadData = async () => {
    const [c, d] = await Promise.all([
      AdminService.getCourses(),
      AdminService.getDepartments(),
    ]);
    setCourses(c);
    setDepartments(d);
    if (d.length > 0) setDeptId(d[0].id);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminService.createCourse({ departmentId: deptId, code, name });
    setModalOpen(false);
    setCode('');
    setName('');
    loadData();
  };

  const columns: Column<Course>[] = [
    {
      header: 'Course Code',
      accessor: (item) => <span className="font-mono font-bold text-indigo-400">{item.code}</span>,
    },
    {
      header: 'Program / Course Name',
      accessor: (item) => (
        <div className="font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400" />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: (item) => <span className="text-xs text-slate-300">{item.departmentName}</span>,
    },
    {
      header: 'Duration',
      accessor: (item) => <span className="text-xs text-slate-400">{item.durationYears} Years ({item.totalSemesters} Semesters)</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Degree & Program Courses"
        subtitle="Manage degree programs offered across college departments"
        data={courses}
        columns={columns}
        searchPlaceholder="Search by Course Code or Program Name..."
        onAddClick={() => setModalOpen(true)}
        addLabel="Create Course Program"
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create Course Program</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Department *</label>
                <select
                  value={deptId}
                  onChange={(e) => setDeptId(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course Code *</label>
                <input
                  type="text"
                  required
                  placeholder="BTECH-CSE"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Program Name *</label>
                <input
                  type="text"
                  required
                  placeholder="B.Tech in Computer Science"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
