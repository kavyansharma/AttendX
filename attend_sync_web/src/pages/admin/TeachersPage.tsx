import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Teacher } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { UserCheck } from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // New teacher form state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const loadTeachers = async () => {
    setLoading(true);
    const data = await AdminService.getTeachers();
    setTeachers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminService.createTeacher({
      employeeId: empId,
      fullName: name,
      email,
      departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    });
    setAddModalOpen(false);
    setEmpId('');
    setName('');
    setEmail('');
    loadTeachers();
  };

  const columns: Column<Teacher>[] = [
    {
      header: 'Employee ID',
      accessor: (item) => <span className="font-mono font-bold text-indigo-400">{item.employeeId}</span>,
    },
    {
      header: 'Faculty Name',
      accessor: (item) => (
        <div className="font-bold text-white flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-slate-400" />
          <span>{item.fullName}</span>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: (item) => <span className="text-xs text-slate-300">{item.departmentName}</span>,
    },
    {
      header: 'Email Address',
      accessor: (item) => <span className="text-xs text-slate-400">{item.email}</span>,
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>
          {item.isActive ? 'ACTIVE' : 'INACTIVE'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Faculty Management"
        subtitle="Manage college teaching staff profiles and department affiliations"
        data={teachers}
        columns={columns}
        searchPlaceholder="Search by Employee ID, Name, or Email..."
        onAddClick={() => setAddModalOpen(true)}
        addLabel="Register New Faculty"
      />

      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Register New Faculty</h3>
            <form onSubmit={handleAddTeacher} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Employee ID *</label>
                <input
                  type="text"
                  required
                  placeholder="EMP-CSE-104"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Ankit Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="ankit.mehta@apextech.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setAddModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  Register Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
