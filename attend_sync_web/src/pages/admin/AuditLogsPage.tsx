import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { AuditLog } from '../../types/admin';
import { DataTable, Column } from '../../components/admin/DataTable';
import { ShieldCheck, User } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    async function load() {
      const data = await AdminService.getAuditLogs();
      setLogs(data);
    }
    load();
  }, []);

  const columns: Column<AuditLog>[] = [
    {
      header: 'Timestamp',
      accessor: (item) => <span className="font-mono text-xs text-slate-400">{item.createdAt}</span>,
    },
    {
      header: 'Administrator User',
      accessor: (item) => (
        <div className="font-bold text-white text-xs flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          <span>{item.userName}</span>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: (item) => (
        <span
          className={`badge ${
            item.action === 'CREATE'
              ? 'badge-success'
              : item.action === 'UPDATE'
              ? 'badge-warning'
              : 'badge-danger'
          }`}
        >
          {item.action}
        </span>
      ),
    },
    {
      header: 'Entity / Table',
      accessor: (item) => <span className="font-mono text-xs text-indigo-300">{item.entityName}</span>,
    },
    {
      header: 'IP Address',
      accessor: (item) => <span className="font-mono text-xs text-slate-500">{item.ipAddress || '127.0.0.1'}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="System Administrative Audit Trail"
        subtitle="Immutable security audit record of all creation, modification, and deletion events"
        data={logs}
        columns={columns}
        searchPlaceholder="Search audit logs by User, Action, or Entity..."
      />
    </div>
  );
};
