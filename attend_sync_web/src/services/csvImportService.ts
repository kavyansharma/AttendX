import { CSVStudentRow, CSVRowValidation, Student } from '../types/admin';
import { AdminService } from './adminService';

export class CsvImportService {
  /**
   * Sample CSV Template Content for download
   */
  static getSampleCsvContent(): string {
    return [
      'student_id,name,email,department,course,batch,section,semester',
      '2024-CSE-050,Rohit Kumar,rohit.kumar@apextech.edu,CSE,BTECH-CSE,2024-2028,CSE-2A,Semester 4',
      '2024-CSE-051,Sneha Sharma,sneha.sharma@apextech.edu,CSE,BTECH-CSE,2024-2028,CSE-2A,Semester 4',
      '2024-CSE-052,Karan Patel,karan.patel@apextech.edu,CSE,BTECH-CSE,2024-2028,CSE-2B,Semester 4',
    ].join('\n');
  }

  /**
   * Parse CSV String into raw rows
   */
  static parseCsv(csvText: string): CSVStudentRow[] {
    const lines = csvText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows: CSVStudentRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length < headers.length) continue;

      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });

      rows.push({
        student_id: row['student_id'] || row['roll_number'] || row['roll'] || '',
        name: row['name'] || row['full_name'] || '',
        email: row['email'] || '',
        department: row['department'] || 'CSE',
        course: row['course'] || 'BTECH-CSE',
        batch: row['batch'] || '2024-2028',
        section: row['section'] || 'CSE-2A',
        semester: row['semester'] || 'Semester 4',
      });
    }

    return rows;
  }

  /**
   * Validate parsed rows against master system constraints
   */
  static async validateCsvRows(rows: CSVStudentRow[]): Promise<CSVRowValidation[]> {
    const existingStudents = await AdminService.getStudents();
    const existingRolls = new Set(existingStudents.map(s => s.rollNumber.toLowerCase()));
    const existingEmails = new Set(existingStudents.map(s => s.email.toLowerCase()));

    const seenBatchRolls = new Set<string>();
    const seenBatchEmails = new Set<string>();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validations: CSVRowValidation[] = [];

    rows.forEach((row, index) => {
      const errors: string[] = [];
      const rollLower = row.student_id.toLowerCase();
      const emailLower = row.email.toLowerCase();

      // Field presence checks
      if (!row.student_id) errors.push('Missing Student ID / Roll Number');
      if (!row.name) errors.push('Missing Student Name');
      if (!row.email) errors.push('Missing Student Email');

      // Email format
      if (row.email && !emailRegex.test(row.email)) {
        errors.push('Invalid email address format');
      }

      // System duplicate checks
      if (rollLower && existingRolls.has(rollLower)) {
        errors.push(`Student ID "${row.student_id}" already exists in system`);
      }
      if (emailLower && existingEmails.has(emailLower)) {
        errors.push(`Email "${row.email}" is already registered`);
      }

      // Batch CSV duplicate checks
      if (rollLower && seenBatchRolls.has(rollLower)) {
        errors.push(`Duplicate Student ID "${row.student_id}" within this CSV file`);
      }
      if (emailLower && seenBatchEmails.has(emailLower)) {
        errors.push(`Duplicate Email "${row.email}" within this CSV file`);
      }

      if (rollLower) seenBatchRolls.add(rollLower);
      if (emailLower) seenBatchEmails.add(emailLower);

      validations.push({
        rowNumber: index + 1,
        data: row,
        isValid: errors.length === 0,
        errors,
      });
    });

    return validations;
  }

  /**
   * Execute import of valid rows
   */
  static async importValidStudents(validRows: CSVStudentRow[]): Promise<number> {
    const studentsToInsert: Partial<Student>[] = validRows.map(r => ({
      rollNumber: r.student_id,
      fullName: r.name,
      email: r.email,
      courseName: r.course,
      batchName: r.batch,
      sectionName: r.section,
      admissionYear: 2024,
    }));

    return await AdminService.bulkInsertStudents(studentsToInsert);
  }
}
