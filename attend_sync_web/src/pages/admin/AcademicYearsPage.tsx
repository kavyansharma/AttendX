import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { AcademicYear } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';

export const AcademicYearsPage: React.FC = () => {
  const [years, setYears] = useState<AcademicYear[]>([]);

  useEffect(() => {
    async function load() {
      const data = await AdminService.getAcademicYears();
      setYears(data);
    }
    load();
  }, []);

  const columns: Column<AcademicYear>[] = [
    {
      header: 'Year Label',
      accessor: (item) => <span className="font-bold text-white text-sm">{item.yearLabel}</span>,
    },
    {
      header: 'Start Date',
      accessor: (item) => <span className="text-xs text-slate-400 font-mono">{item.startDate}</span>,
    },
    {
      header: 'End Date',
      accessor: (item) => <span className="text-xs text-slate-400 font-mono">{item.endDate}</span>,
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`badge ${item.isCurrent ? 'badge-success' : 'badge-info'}`}>
          {item.isCurrent ? 'CURRENT ACTIVE YEAR' : 'ARCHIVED'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Academic Years"
        subtitle="Manage institutional calendar years and active academic sessions"
        data={years}
        columns={columns}
        searchPlaceholder="Search academic year..."
      />
    </div>
  );
};
