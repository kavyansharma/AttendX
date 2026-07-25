import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Department } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { Building } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [hod, setHod] = useState('');

  const loadData = async () => {
    const data = await AdminService.getDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminService.createDepartment({ code, name, headOfDepartment: hod });
    setModalOpen(false);
    setCode('');
    setName('');
    setHod('');
    loadData();
  };

  const columns: Column<Department>[] = [
    {
      header: 'Department Code',
      accessor: (item) => <span className="font-mono font-bold text-indigo-400">{item.code}</span>,
    },
    {
      header: 'Department Name',
      accessor: (item) => (
        <div className="font-bold text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-slate-400" />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: 'Head of Department (HOD)',
      accessor: (item) => <span className="text-xs text-slate-300">{item.headOfDepartment}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="College Departments"
        subtitle="Manage academic department structures and assigned heads of department"
        data={departments}
        columns={columns}
        searchPlaceholder="Search by Department Code or Name..."
        onAddClick={() => setModalOpen(true)}
        addLabel="Create Department"
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create Department</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Code *</label>
                <input
                  type="text"
                  required
                  placeholder="CSE"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Department of Computer Science"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Head of Department</label>
                <input
                  type="text"
                  placeholder="Dr. Aris Thorne"
                  value={hod}
                  onChange={(e) => setHod(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
