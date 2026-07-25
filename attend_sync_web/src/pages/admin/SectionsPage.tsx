import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Section } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';

export const SectionsPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    async function load() {
      const data = await AdminService.getSections();
      setSections(data);
    }
    load();
  }, []);

  const columns: Column<Section>[] = [
    {
      header: 'Section Name',
      accessor: (item) => <span className="font-bold text-white text-sm">{item.name}</span>,
    },
    {
      header: 'Batch Cohort',
      accessor: (item) => <span className="text-xs text-indigo-400">{item.batchName}</span>,
    },
    {
      header: 'Term Semester',
      accessor: (item) => <span className="text-xs text-slate-300">{item.semesterName}</span>,
    },
    {
      header: 'Assigned Classroom',
      accessor: (item) => <span className="font-mono text-xs text-slate-400">{item.roomNumber}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Class Sections"
        subtitle="Manage classroom sections and lecture hall assignments"
        data={sections}
        columns={columns}
        searchPlaceholder="Search sections..."
      />
    </div>
  );
};
