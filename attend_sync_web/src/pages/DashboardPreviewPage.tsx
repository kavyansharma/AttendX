import React, { useState } from 'react';
import { UserRole } from '../types';
import { initialStudentData } from '../data/mockData';
import { UserCheck, BookOpen, Clock, AlertTriangle, ArrowLeft, Plus, CheckCircle, Search, Filter, ShieldCheck, LogOut, Download } from 'lucide-react';

interface DashboardPreviewPageProps {
  role: UserRole;
  onLogout: () => void;
}

export const DashboardPreviewPage: React.FC<DashboardPreviewPageProps> = ({ role, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'timetable' | 'corrections' | 'reports'>('attendance');
  const [markedCount, setMarkedCount] = useState(0);
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

  // Student Attendance Correction state
  const [correctionReason, setCorrectionReason] = useState('');
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);

  // Teacher marking state
  const [studentsList, setStudentsList] = useState([
    { id: '1', roll: '2024-CSE-001', name: 'Aarav Sharma', status: 'present' },
    { id: '2', roll: '2024-CSE-002', name: 'Ananya Gupta', status: 'present' },
    { id: '3', roll: '2024-CSE-003', name: 'Devansh Patel', status: 'absent' },
    { id: '4', roll: '2024-CSE-042', name: 'Rahul Verma', status: 'present' },
    { id: '5', roll: '2024-CSE-045', name: 'Priya Singh', status: 'present' },
  ]);

  const toggleStudentStatus = (id: string) => {
    setStudentsList(prev =>
      prev.map(s => (s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s))
    );
  };

  const markAllPresent = () => {
    setStudentsList(prev => prev.map(s => ({ ...s, status: 'present' })));
  };

  const submitTeacherSession = () => {
    setSessionSubmitted(true);
    setMarkedCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-16">
      {/* Top Bar Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span className="font-extrabold text-sm tracking-tight">
              AttendX <span className="text-indigo-400 uppercase font-mono text-xs font-bold">[{role.replace('_', ' ')}]</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Apex Institute of Technology • Spring 2026
          </span>
          <button
            onClick={onLogout}
            className="btn btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Role Dashboard Views */}
      <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* STUDENT ROLE DASHBOARD */}
        {role === 'student' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Student Dashboard</span>
                <h1 className="text-2xl font-black text-white">{initialStudentData.studentName}</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Roll: {initialStudentData.rollNumber} • {initialStudentData.course} ({initialStudentData.section})
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-400">{initialStudentData.overallPercentage}%</div>
                  <div className="text-[11px] text-slate-400">Overall Attendance</div>
                </div>
                <span className="badge badge-success px-4 py-2 text-xs">GOOD STANDING</span>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {initialStudentData.subjects.map(sub => (
                <div
                  key={sub.id}
                  className={`p-4 rounded-xl border ${
                    sub.status === 'low' ? 'bg-rose-950/20 border-rose-500/40' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-400">{sub.code}</span>
                    <span className={`font-black ${sub.status === 'low' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {sub.percentage}%
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate mb-2">{sub.name}</h4>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${sub.status === 'low' ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{sub.attended}/{sub.total} Classes</span>
                    {sub.status === 'low' ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Min 75%
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold">Safe</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Attendance Correction Form Box */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Submit Attendance Correction Request
              </h3>
              <p className="text-xs text-slate-400">
                Were you present in a class but marked absent? Submit a correction request with proof for your teacher to review.
              </p>

              {correctionSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  ✓ Correction request submitted successfully! Your teacher will review it in their portal.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white">
                    <option>Technical Communication (25 July - Absent)</option>
                    <option>Data Structures (24 July - Absent)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Reason (e.g. Attended lab session B)"
                    value={correctionReason}
                    onChange={e => setCorrectionReason(e.target.value)}
                    className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                  <button
                    onClick={() => setCorrectionSubmitted(true)}
                    className="btn btn-primary text-xs py-2"
                  >
                    Submit Request
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TEACHER ROLE DASHBOARD */}
        {role === 'teacher' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Faculty Portal</span>
                <h1 className="text-2xl font-black text-white">Dr. Kumar</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Department of Computer Science • CS402 Database Management Systems
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={markAllPresent} className="btn btn-secondary text-xs">
                  Mark All Present
                </button>
                <button
                  onClick={submitTeacherSession}
                  disabled={sessionSubmitted}
                  className="btn btn-primary text-xs"
                >
                  {sessionSubmitted ? '✓ Attendance Submitted & Synced' : 'Submit Class Attendance'}
                </button>
              </div>
            </div>

            {/* Student Marking Table */}
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Section</th>
                    <th>Attendance Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsList.map(st => (
                    <tr key={st.id}>
                      <td className="font-mono text-xs text-slate-400">{st.roll}</td>
                      <td className="font-bold text-white">{st.name}</td>
                      <td className="text-xs text-slate-400">CSE 2nd Yr - Sec A</td>
                      <td>
                        <span
                          className={`badge ${
                            st.status === 'present' ? 'badge-success' : 'badge-danger'
                          }`}
                        >
                          {st.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStudentStatus(st.id)}
                          className="px-3 py-1 text-xs rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 font-semibold"
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADMIN ROLE DASHBOARD */}
        {(role === 'admin' || role === 'super_admin') && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  College Administration Console
                </span>
                <h1 className="text-2xl font-black text-white">Apex Institute of Technology</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Institutional Master Management • 5,240 Students • 186 Faculty Members
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn btn-secondary text-xs flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF Report</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Total Departments</div>
                <div className="text-2xl font-black text-white mt-1">5</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Today's Class Sessions</div>
                <div className="text-2xl font-black text-indigo-400 mt-1">142 Conducted</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Average Attendance</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">81.4%</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Pending Correction Requests</div>
                <div className="text-2xl font-black text-amber-400 mt-1">12 Pending</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
