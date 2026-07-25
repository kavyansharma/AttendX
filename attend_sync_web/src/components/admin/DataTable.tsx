import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Plus, Download } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  onAddClick?: () => void;
  addLabel?: string;
  onCsvImportClick?: () => void;
}

export function DataTable<T extends { id: string }>({
  title,
  subtitle,
  data,
  columns,
  searchPlaceholder = 'Search records...',
  onSearchChange,
  onAddClick,
  addLabel = 'Add Record',
  onCsvImportClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (onSearchChange) onSearchChange(q);
  };

  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {onCsvImportClick && (
            <button
              onClick={onCsvImportClick}
              className="btn btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Bulk CSV Import</span>
            </button>
          )}

          {onAddClick && (
            <button onClick={onAddClick} className="btn btn-primary text-xs py-2 px-4">
              <Plus className="w-4 h-4" />
              <span>{addLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearch}
          className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
        />
      </div>

      {/* Table Box */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map(item => (
                <tr key={item.id}>
                  {columns.map((col, idx) => (
                    <td key={idx}>{col.accessor(item)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-slate-500 text-sm">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 pt-2">
        <span>
          Showing {data.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
          {Math.min(currentPage * pageSize, data.length)} of {data.length} records
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
