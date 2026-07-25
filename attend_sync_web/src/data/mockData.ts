import { StudentDashboardData } from '../types';

export const initialStudentData: StudentDashboardData = {
  studentName: 'Rahul Verma',
  rollNumber: '2024-CSE-042',
  course: 'B.Tech Computer Science',
  section: 'CSE 2nd Year - Sec A',
  overallPercentage: 82,
  totalClassesAttended: 82,
  totalClassesMissed: 18,
  subjects: [
    {
      id: 'sub-1',
      code: 'CS401',
      name: 'Data Structures & Algorithms',
      attended: 28,
      total: 36,
      percentage: 78,
      minRequired: 75,
      status: 'safe',
    },
    {
      id: 'sub-2',
      code: 'CS402',
      name: 'Database Management Systems',
      attended: 30,
      total: 36,
      percentage: 84,
      minRequired: 75,
      status: 'safe',
    },
    {
      id: 'sub-3',
      code: 'CS403',
      name: 'Operating Systems',
      attended: 32,
      total: 35,
      percentage: 91,
      minRequired: 75,
      status: 'safe',
    },
    {
      id: 'sub-4',
      code: 'HU401',
      name: 'Technical Communication',
      attended: 18,
      total: 26,
      percentage: 69,
      minRequired: 75,
      status: 'low',
    },
  ],
  recentUpdate: {
    subject: 'Database Management Systems',
    teacher: 'Dr. Kumar',
    status: 'Present',
    timestamp: '2 minutes ago',
  },
};

export const problemList = [
  {
    icon: 'FileText',
    title: 'Manual Paper Registers',
    description: 'Faculty waste 10–15 minutes every single period manually marking paper registers prone to physical damage.',
  },
  {
    icon: 'Clock',
    title: 'Delayed Data Entry',
    description: 'Attendance data is compiled manually weeks later. Students have zero visibility into their active standing.',
  },
  {
    icon: 'AlertTriangle',
    title: 'Deceptive Low-Attendance Surprises',
    description: 'Students only discover they are ineligible for end-term exams right before hall ticket distribution.',
  },
  {
    icon: 'UserX',
    title: 'Proxy Attendance Risk',
    description: 'Unverified paper systems allow proxy marking and unauthorized record tampering without audit trails.',
  },
  {
    icon: 'BarChart2',
    title: 'Laborious Report Generation',
    description: 'Administrators spend dozens of hours collating monthly Excel sheets across dozens of departments.',
  },
  {
    icon: 'HelpCircle',
    title: 'Friction-Heavy Correction Process',
    description: 'Correcting an inadvertent absent mark requires paper applications and multi-day manual signatures.',
  },
];

export const featureList = [
  {
    icon: 'Zap',
    title: 'Real-Time Attendance Sync',
    description: 'Students immediately see their updated attendance percentages as soon as a teacher submits a session.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Strict Role-Based Access Control',
    description: 'Students, teachers, and admins have precise isolated permissions backed by database Row Level Security.',
  },
  {
    icon: 'Bell',
    title: 'Proactive Low-Attendance Alerts',
    description: 'Automated warnings notify students and guardians before attendance drops below the compliance threshold.',
  },
  {
    icon: 'Calendar',
    title: 'Smart Timetable & Class Schedules',
    description: 'Direct integration with weekly timetable slots prevents duplicate sessions and ensures accurate period logs.',
  },
  {
    icon: 'RefreshCw',
    title: 'Transparent Correction Workflow',
    description: 'Students submit digital correction requests with reason notes; teachers review and approve with 1-click.',
  },
  {
    icon: 'PieChart',
    title: 'Instant Multi-Level Reports',
    description: 'Generate instant PDF/CSV exports for individual students, sections, batches, departments, or entire colleges.',
  },
  {
    icon: 'Lock',
    title: 'Immutable Security & Audit Trail',
    description: 'Every attendance entry, modification, and approval is logged with timestamp, user ID, and IP address.',
  },
  {
    icon: 'Smartphone',
    title: 'Cross-Platform Accessibility',
    description: 'Native Flutter app experience for mobile students alongside rich React desktop portals for faculty.',
  },
];

export const collegeAnalyticsData = {
  totalStudents: 5240,
  averageAttendance: 81.4,
  studentsAtRisk: 438,
  todaySessionsConducted: 142,
  departmentStats: [
    { name: 'Computer Science & Engineering', percentage: 84.2, totalStudents: 1420 },
    { name: 'Mechanical Engineering', percentage: 79.1, totalStudents: 1100 },
    { name: 'Civil Engineering', percentage: 81.5, totalStudents: 980 },
    { name: 'Management & Business Studies', percentage: 86.8, totalStudents: 890 },
    { name: 'Electronics & Communication', percentage: 82.0, totalStudents: 850 },
  ],
};
