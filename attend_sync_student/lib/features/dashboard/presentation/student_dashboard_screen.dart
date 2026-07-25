import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/utils/attendance_calculator.dart';
import '../../attendance/presentation/correction_request_screen.dart';
import '../../timetable/presentation/timetable_screen.dart';
import '../../auth/presentation/login_screen.dart';

class StudentDashboardScreen extends StatefulWidget {
  const StudentDashboardScreen({super.key});

  @override
  State<StudentDashboardScreen> createState() => _StudentDashboardScreenState();
}

class _StudentDashboardScreenState extends State<StudentDashboardScreen> {
  int _currentIndex = 0;

  final List<Map<String, dynamic>> _subjects = [
    {
      'code': 'CS401',
      'name': 'Data Structures & Algorithms',
      'attended': 28,
      'total': 36,
      'percentage': 77.8,
      'minReq': 75.0,
    },
    {
      'code': 'CS402',
      'name': 'Database Management Systems',
      'attended': 30,
      'total': 36,
      'percentage': 83.3,
      'minReq': 75.0,
    },
    {
      'code': 'CS403',
      'name': 'Operating Systems',
      'attended': 32,
      'total': 35,
      'percentage': 91.4,
      'minReq': 75.0,
    },
    {
      'code': 'HU401',
      'name': 'Technical Communication',
      'attended': 18,
      'total': 26,
      'percentage': 69.2,
      'minReq': 75.0,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.how_to_reg_rounded, color: AppColors.accentPrimary, size: 24),
            SizedBox(width: 8),
            Text(
              'AttendSync',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('No new notifications')),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout_rounded, color: AppColors.danger),
            onPressed: () {
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (_) => const LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: [
          _buildHomeDashboardTab(),
          const TimetableScreen(),
          const CorrectionRequestScreen(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        backgroundColor: AppColors.bgSecondary,
        selectedItemColor: AppColors.accentPrimary,
        unselectedItemColor: AppColors.textMuted,
        onTap: (idx) => setState(() => _currentIndex = idx),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_rounded),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today_rounded),
            label: 'Timetable',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.edit_note_rounded),
            label: 'Corrections',
          ),
        ],
      ),
    );
  }

  Widget _buildHomeDashboardTab() {
    // Overall Stats Calculation
    int totalAttended = 0;
    int totalConducted = 0;
    for (var s in _subjects) {
      totalAttended += (s['attended'] as int);
      totalConducted += (s['total'] as int);
    }
    final overallPct = AttendanceCalculator.calculatePercentage(totalAttended, totalConducted);
    final neededClasses = AttendanceCalculator.classesNeededToReachTarget(
      attended: totalAttended,
      total: totalConducted,
      targetMinPercentage: 75.0,
    );

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Greeting Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [AppColors.bgSecondary, AppColors.bgCard],
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: AppColors.accentPrimary.withOpacity(0.2),
                  child: const Text(
                    'RV',
                    style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.accentPrimary, fontSize: 18),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Good Morning, Rahul 👋',
                        style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: Colors.white),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Roll #2024-CSE-042 • CSE 2A',
                        style: TextStyle(fontSize: 12, color: AppColors.textMuted),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Overall Standing Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.bgSecondary,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Overall Standing',
                          style: TextStyle(fontSize: 12, color: AppColors.textMuted, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Spring Semester 2026',
                          style: TextStyle(fontSize: 11, color: AppColors.textDim),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: overallPct >= 75.0 ? AppColors.success.withOpacity(0.15) : AppColors.danger.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: overallPct >= 75.0 ? AppColors.success : AppColors.danger,
                        ),
                      ),
                      child: Text(
                        overallPct >= 75.0 ? 'SAFE' : 'AT RISK',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: overallPct >= 75.0 ? AppColors.success : AppColors.danger,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '$overallPct%',
                      style: const TextStyle(fontSize: 42, fontWeight: FontWeight.w900, color: AppColors.textMain),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '$totalAttended / $totalConducted Classes',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        Text(
                          'Missed: ${totalConducted - totalAttended} Sessions',
                          style: const TextStyle(fontSize: 12, color: AppColors.danger),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Linear Progress Indicator
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: LinearProgressIndicator(
                    value: overallPct / 100.0,
                    minHeight: 8,
                    backgroundColor: AppColors.border,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      overallPct >= 75.0 ? AppColors.success : AppColors.danger,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Low Attendance Banner
          if (neededClasses > 0 || _subjects.any((s) => (s['percentage'] as double) < 75.0))
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.danger.withOpacity(0.1),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.danger.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.warning_amber_rounded, color: AppColors.danger, size: 28),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Low Attendance Warning!',
                          style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.danger, fontSize: 13),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Technical Communication (HU401) is at 69.2%. Attend the next $neededClasses classes consecutively to reach 75%.',
                          style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          const SizedBox(height: 20),

          // Subject Attendance Breakdown Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                'Subject Attendance',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white),
              ),
              Text(
                '4 Subjects',
                style: TextStyle(fontSize: 12, color: AppColors.textMuted),
              ),
            ],
          ),
          const SizedBox(height: 12),

          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _subjects.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, idx) {
              final sub = _subjects[idx];
              final pct = sub['percentage'] as double;
              final isLow = pct < (sub['minReq'] as double);

              return Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isLow ? AppColors.danger.withOpacity(0.06) : AppColors.bgSecondary,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isLow ? AppColors.danger.withOpacity(0.3) : AppColors.border,
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          sub['code'] as String,
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.textMuted),
                        ),
                        Text(
                          '$pct%',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w900,
                            color: isLow ? AppColors.danger : AppColors.success,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            sub['name'] as String,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                        ),
                        Text(
                          '${sub['attended']}/${sub['total']} Attended',
                          style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: pct / 100.0,
                        minHeight: 6,
                        backgroundColor: AppColors.border,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          isLow ? AppColors.danger : AppColors.success,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
