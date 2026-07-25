import React, { useState } from 'react';
import { X, Upload, Download, CheckCircle, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { CsvImportService } from '../../services/csvImportService';
import { CSVRowValidation, CSVStudentRow } from '../../types/admin';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (count: number) => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [csvText, setCsvText] = useState('');
  const [validations, setValidations] = useState<CSVRowValidation[]>([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const content = CsvImportService.getSampleCsvContent();
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'attendx_student_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvText(text);
        processValidation(text);
      };
      reader.readAsText(file);
    }
  };

  const processValidation = async (text: string) => {
    setLoading(true);
    const rows = CsvImportService.parseCsv(text);
    const results = await CsvImportService.validateCsvRows(rows);
    setValidations(results);
    setLoading(false);
  };

  const validCount = validations.filter(v => v.isValid).length;
  const invalidCount = validations.filter(v => !v.isValid).length;

  const handleConfirmImport = async () => {
    setImporting(true);
    const validRowsToImport: CSVStudentRow[] = validations.filter(v => v.isValid).map(v => v.data);
    const importedCount = await CsvImportService.importValidStudents(validRowsToImport);
    setImporting(false);
    onSuccess(importedCount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase text-indigo-400">Bulk Onboarding Engine</span>
            <h3 className="text-xl font-extrabold text-white mt-0.5">Bulk Student CSV Import</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Top Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400">
              Need the standard CSV format? Download our official template.
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="btn btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV Template</span>
            </button>
          </div>

          {/* File Upload Box */}
          <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 text-center space-y-3 bg-slate-950/50 transition-all">
            <Upload className="w-10 h-10 text-indigo-400 mx-auto" />
            <div className="text-sm font-bold text-white">Upload your Student Roster CSV</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Drag and drop your file here or click below to browse. Required columns: student_id, name, email, department, course, batch, section.
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csvFileInput"
            />
            <label htmlFor="csvFileInput" className="btn btn-primary text-xs py-2.5 px-6 inline-flex">
              Browse CSV File
            </label>
          </div>

          {/* Validation Summary Badges */}
          {validations.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider">Validation Results Overview</span>
                <div className="flex items-center gap-3">
                  <span className="badge badge-success text-xs font-bold">
                    ✓ {validCount} Valid Records Ready
                  </span>
                  {invalidCount > 0 && (
                    <span className="badge badge-danger text-xs font-bold">
                      ⚠ {invalidCount} Invalid Rows Blocked
                    </span>
                  )}
                </div>
              </div>

              {/* Validation Preview Table */}
              <div className="table-container max-h-60 overflow-y-auto">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Section</th>
                      <th>Validation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validations.map((v) => (
                      <tr key={v.rowNumber} className={v.isValid ? '' : 'bg-rose-950/20'}>
                        <td className="text-xs font-mono text-slate-500">{v.rowNumber}</td>
                        <td className="font-bold text-white">{v.data.student_id}</td>
                        <td className="text-xs">{v.data.name}</td>
                        <td className="text-xs text-slate-400">{v.data.email}</td>
                        <td className="text-xs text-slate-400">{v.data.section}</td>
                        <td>
                          {v.isValid ? (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Valid
                            </span>
                          ) : (
                            <div className="text-xs text-rose-400 font-bold space-y-0.5">
                              {v.errors.map((err, i) => (
                                <div key={i} className="flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {err}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button onClick={onClose} className="btn btn-secondary text-xs">
            Cancel
          </button>

          <button
            onClick={handleConfirmImport}
            disabled={validCount === 0 || importing}
            className="btn btn-primary text-xs py-2.5 px-6 font-bold"
          >
            {importing ? 'Importing...' : `Confirm Import ${validCount} Valid Students`}
            {!importing && <ArrowRight className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};
