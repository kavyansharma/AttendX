import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Student } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { CsvImportModal } from '../../components/admin/CsvImportModal';
import { GraduationCap, CheckCircle2, XCircle } from 'lucide-react';

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [csvModalOpen, setCsvModalOpen] = useState(false);

  // New Student modal form state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newRoll, setNewRoll] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    const data = await AdminService.getStudents();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminService.createStudent({
      rollNumber: newRoll,
      fullName: newName,
      email: newEmail,
    });
    setAddModalOpen(false);
    setNewRoll('');
    setNewName('');
    setNewEmail('');
    loadStudents();
  };

  const columns: Column<Student>[] = [
    {
      header: 'Roll Number',
      accessor: (item) => <span className="font-mono font-bold text-indigo-400">{item.rollNumber}</span>,
    },
    {
      header: 'Student Name',
      accessor: (item) => (
        <div className="font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-slate-400" />
          <span>{item.fullName}</span>
        </div>
      ),
    },
    {
      header: 'Email Address',
      accessor: (item) => <span className="text-slate-400 text-xs">{item.email}</span>,
    },
    {
      header: 'Section',
      accessor: (item) => <span className="badge badge-info text-xs">{item.sectionName}</span>,
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
        title="Student Roster Management"
        subtitle="Manage individual student accounts or perform bulk CSV onboarding"
        data={students}
        columns={columns}
        searchPlaceholder="Search by Roll Number, Name, or Email..."
        onAddClick={() => setAddModalOpen(true)}
        addLabel="Add Single Student"
        onCsvImportClick={() => setCsvModalOpen(true)}
      />

      <CsvImportModal
        isOpen={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
        onSuccess={() => loadStudents()}
      />

      {/* Single Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Single Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Roll Number *</label>
                <input
                  type="text"
                  required
                  placeholder="2024-CSE-050"
                  value={newRoll}
                  onChange={(e) => setNewRoll(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rohit Kumar"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rohit.k@apextech.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setAddModalOpen(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
