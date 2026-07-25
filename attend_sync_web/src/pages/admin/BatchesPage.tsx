import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Batch } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';

export const BatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    async function load() {
      const data = await AdminService.getBatches();
      setBatches(data);
    }
    load();
  }, []);

  const columns: Column<Batch>[] = [
    {
      header: 'Batch Title',
      accessor: (item) => <span className="font-bold text-white text-sm">{item.name}</span>,
    },
    {
      header: 'Course',
      accessor: (item) => <span className="text-xs text-indigo-400">{item.courseName}</span>,
    },
    {
      header: 'Year Span',
      accessor: (item) => <span className="font-mono text-xs text-slate-400">{item.startYear} - {item.endYear}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Student Batches"
        subtitle="Group student cohorts by entry and graduation year"
        data={batches}
        columns={columns}
        searchPlaceholder="Search batches..."
      />
    </div>
  );
};
