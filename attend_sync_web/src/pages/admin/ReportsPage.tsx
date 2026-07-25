import React from 'react';
import { Download, FileText, PieChart, Filter } from 'lucide-react';
import { collegeAnalyticsData } from '../../data/mockData';

export const ReportsPage: React.FC = () => {
  const handleExport = (type: string) => {
    alert(`Exporting ${type} report for Apex Institute of Technology...`);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Institutional Reporting Engine</span>
          <h1 className="text-2xl font-black text-white">Attendance Reports & Exports</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate and export attendance compliance reports in PDF, CSV, or Excel formats.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => handleExport('PDF')} className="btn btn-primary text-xs flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export Full PDF Report</span>
          </button>
          <button onClick={() => handleExport('CSV')} className="btn btn-secondary text-xs flex items-center gap-1.5 border-slate-700">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Subject & Section Report Generator
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Select Department</label>
              <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white">
                <option>Computer Science & Engineering</option>
                <option>Mechanical Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Select Section</label>
              <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white">
                <option>CSE-2A (B.Tech CSE Semester 4)</option>
                <option>CSE-2B (B.Tech CSE Semester 4)</option>
              </select>
            </div>
            <button onClick={() => handleExport('Filtered Section')} className="w-full btn btn-secondary text-xs py-2.5 mt-2">
              Generate Filtered Section Audit
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            At-Risk Compliance Report
          </h3>
          <p className="text-xs text-slate-400">
            Identify all students falling below the mandatory 75% attendance threshold across subjects.
          </p>
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs">
            <strong>438 At-Risk Students</strong> detected campus-wide. Ready for guardian notice export.
          </div>
          <button onClick={() => handleExport('At-Risk Warning List')} className="w-full btn btn-primary text-xs py-2.5">
            Export At-Risk Student Notices (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
