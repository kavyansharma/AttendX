import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Semester } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';

export const SemestersPage: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    async function load() {
      const data = await AdminService.getSemesters();
      setSemesters(data);
    }
    load();
  }, []);

  const columns: Column<Semester>[] = [
    {
      header: 'Semester Name',
      accessor: (item) => <span className="font-bold text-white text-sm">{item.name}</span>,
    },
    {
      header: 'Course',
      accessor: (item) => <span className="text-xs text-indigo-400">{item.courseName}</span>,
    },
    {
      header: 'Semester Number',
      accessor: (item) => <span className="font-mono text-xs text-slate-300">Sem {item.semesterNumber}</span>,
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>
          {item.isActive ? 'IN PROGRESS' : 'CLOSED'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Course Semesters"
        subtitle="Manage active term terms and start/end cutoffs"
        data={semesters}
        columns={columns}
        searchPlaceholder="Search semester..."
      />
    </div>
  );
};
