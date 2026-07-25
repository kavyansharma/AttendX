import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';

class TimetableScreen extends StatelessWidget {
  const TimetableScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, String>> todaySchedule = [
      {
        'time': '09:00 - 10:00 AM',
        'code': 'CS401',
        'name': 'Data Structures & Algorithms',
        'room': 'Lab Room 304',
        'faculty': 'Dr. Aris Thorne',
        'status': 'Conducted (Present)',
      },
      {
        'time': '10:00 - 11:00 AM',
        'code': 'CS402',
        'name': 'Database Management Systems',
        'room': 'Lab Room 304',
        'faculty': 'Dr. Kumar',
        'status': 'Conducted (Present)',
      },
      {
        'time': '11:15 - 12:15 PM',
        'code': 'HU401',
        'name': 'Technical Communication',
        'room': 'Block B - Room 102',
        'faculty': 'Prof. Sarah Jenkins',
        'status': 'Conducted (Absent)',
      },
      {
        'time': '02:00 - 04:00 PM',
        'code': 'CS403',
        'name': 'Operating Systems Lab',
        'room': 'Computing Lab 2',
        'faculty': 'Prof. Vikram Mehta',
        'status': 'Upcoming Session',
      },
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Today\'s Class Schedule',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Colors.white),
          ),
          const SizedBox(height: 4),
          const Text(
            'Saturday, 25 July 2026 • CSE 2A Section',
            style: TextStyle(fontSize: 12, color: AppColors.textMuted),
          ),
          const SizedBox(height: 16),

          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: todaySchedule.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, idx) {
              final slot = todaySchedule[idx];
              final isPresent = slot['status']!.contains('Present');
              final isAbsent = slot['status']!.contains('Absent');

              return Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.bgSecondary,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppColors.bgPrimary,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Text(
                        slot['time']!,
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.cyanAccent),
                      ),
                    ),
                    const SizedBox(width: 14),

                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            slot['code']!,
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.textMuted),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            slot['name']!,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${slot['room']!} • ${slot['faculty']!}',
                            style: const TextStyle(fontSize: 11, color: AppColors.textDim),
                          ),
                          const SizedBox(height: 8),

                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: isPresent
                                  ? AppColors.success.withOpacity(0.12)
                                  : isAbsent
                                      ? AppColors.danger.withOpacity(0.12)
                                      : AppColors.info.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              slot['status']!,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: isPresent
                                    ? AppColors.success
                                    : isAbsent
                                        ? AppColors.danger
                                        : AppColors.info,
                              ),
                            ),
                          ),
                        ],
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
