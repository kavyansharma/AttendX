import { TimetableEntry } from '../types/admin';
import { AdminService } from './adminService';

const mockTimetables: TimetableEntry[] = [
  {
    id: 'tt-001',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    subjectId: 'sub1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    subjectName: 'Data Structures (CS401)',
    teacherId: 'tch-001',
    teacherName: 'Dr. Aris Thorne',
    day: 'monday',
    startTime: '09:00',
    endTime: '10:00',
    roomNumber: 'Lab 304',
    isActive: true,
  },
  {
    id: 'tt-002',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    subjectId: 'sub2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    subjectName: 'Database Systems (CS402)',
    teacherId: 'tch-002',
    teacherName: 'Dr. Kumar',
    day: 'monday',
    startTime: '10:00',
    endTime: '11:00',
    roomNumber: 'Lab 304',
    isActive: true,
  },
  {
    id: 'tt-003',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    subjectId: 'sub4c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    subjectName: 'Technical Communication (HU401)',
    teacherId: 'tch-003',
    teacherName: 'Prof. Sarah Jenkins',
    day: 'tuesday',
    startTime: '11:15',
    endTime: '12:15',
    roomNumber: 'Block B-102',
    isActive: true,
  },
];

export interface TimetableConflictCheck {
  hasConflict: boolean;
  conflictType: 'TEACHER_OVERLAP' | 'SECTION_OVERLAP' | 'NONE';
  message: string;
}

export class TimetableService {
  static async getTimetables(): Promise<TimetableEntry[]> {
    return [...mockTimetables];
  }

  /**
   * Validate if entry has schedule conflict before saving
   */
  static async checkConflict(entry: Partial<TimetableEntry>, excludeId?: string): Promise<TimetableConflictCheck> {
    const existing = mockTimetables.filter(t => t.isActive && t.id !== excludeId);

    // Convert HH:MM into minutes for overlap comparison
    const parseMins = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const newStart = parseMins(entry.startTime || '09:00');
    const newEnd = parseMins(entry.endTime || '10:00');

    // Check Teacher Conflict
    const teacherConflict = existing.find(t => {
      if (t.teacherId !== entry.teacherId || t.day !== entry.day) return false;
      const exStart = parseMins(t.startTime);
      const exEnd = parseMins(t.endTime);
      return (newStart >= exStart && newStart < exEnd) || (newEnd > exStart && newEnd <= exEnd) || (newStart <= exStart && newEnd >= exEnd);
    });

    if (teacherConflict) {
      return {
        hasConflict: true,
        conflictType: 'TEACHER_OVERLAP',
        message: `Teacher ${teacherConflict.teacherName} is already scheduled for ${teacherConflict.subjectName} (${teacherConflict.startTime}-${teacherConflict.endTime}) on ${entry.day?.toUpperCase()}.`,
      };
    }

    // Check Section Conflict
    const sectionConflict = existing.find(t => {
      if (t.sectionId !== entry.sectionId || t.day !== entry.day) return false;
      const exStart = parseMins(t.startTime);
      const exEnd = parseMins(t.endTime);
      return (newStart >= exStart && newStart < exEnd) || (newEnd > exStart && newEnd <= exEnd) || (newStart <= exStart && newEnd >= exEnd);
    });

    if (sectionConflict) {
      return {
        hasConflict: true,
        conflictType: 'SECTION_OVERLAP',
        message: `Section ${sectionConflict.sectionName} already has ${sectionConflict.subjectName} scheduled (${sectionConflict.startTime}-${sectionConflict.endTime}) on ${entry.day?.toUpperCase()}.`,
      };
    }

    return {
      hasConflict: false,
      conflictType: 'NONE',
      message: 'No schedule conflict detected.',
    };
  }

  static async createTimetable(entry: Partial<TimetableEntry>): Promise<TimetableEntry> {
    const conflict = await this.checkConflict(entry);
    if (conflict.hasConflict) {
      throw new Error(conflict.message);
    }

    const teachers = await AdminService.getTeachers();
    const subjects = await AdminService.getSubjects();
    const sections = await AdminService.getSections();

    const tch = teachers.find(t => t.id === entry.teacherId);
    const sub = subjects.find(s => s.id === entry.subjectId);
    const sec = sections.find(s => s.id === entry.sectionId);

    const newEntry: TimetableEntry = {
      id: `tt-${Date.now()}`,
      sectionId: entry.sectionId || '',
      sectionName: sec?.name || 'CSE-2A',
      subjectId: entry.subjectId || '',
      subjectName: sub?.name || 'Subject',
      teacherId: entry.teacherId || '',
      teacherName: tch?.fullName || 'Faculty',
      day: entry.day || 'monday',
      startTime: entry.startTime || '09:00',
      endTime: entry.endTime || '10:00',
      roomNumber: entry.roomNumber || 'Room 304',
      isActive: true,
    };

    mockTimetables.push(newEntry);
    return newEntry;
  }
}
