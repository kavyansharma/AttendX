import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';

class CorrectionRequestScreen extends StatefulWidget {
  const CorrectionRequestScreen({super.key});

  @override
  State<CorrectionRequestScreen> createState() => _CorrectionRequestScreenState();
}

class _CorrectionRequestScreenState extends State<CorrectionRequestScreen> {
  final _reasonController = TextEditingController();

  final List<Map<String, String>> _pastRequests = [
    {
      'subject': 'Technical Communication (HU401)',
      'date': '25 July 2026',
      'reason': 'Attended class; marked absent inadvertently.',
      'status': 'PENDING REVIEW',
    },
    {
      'subject': 'Data Structures & Algorithms (CS401)',
      'date': '18 July 2026',
      'reason': 'Attended authorized medical checkup with approval slip.',
      'status': 'APPROVED',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Attendance Correction Workflow',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Colors.white),
          ),
          const SizedBox(height: 4),
          const Text(
            'Submit correction requests for review by subject faculty',
            style: TextStyle(fontSize: 12, color: AppColors.textMuted),
          ),
          const SizedBox(height: 16),

          // Request Form Card
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: AppColors.bgSecondary,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'New Correction Request',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 12),

                DropdownButtonFormField<String>(
                  initialValue: 'CS401 Data Structures (24 July)',
                  dropdownColor: AppColors.bgPrimary,
                  style: const TextStyle(color: Colors.white, fontSize: 12),
                  decoration: const InputDecoration(labelText: 'Select Session'),
                  items: const [
                    DropdownMenuItem(
                      value: 'CS401 Data Structures (24 July)',
                      child: Text('CS401 Data Structures (24 July) - Marked Absent'),
                    ),
                    DropdownMenuItem(
                      value: 'HU401 Communication (25 July)',
                      child: Text('HU401 Communication (25 July) - Marked Absent'),
                    ),
                  ],
                  onChanged: (_) {},
                ),
                const SizedBox(height: 12),

                TextField(
                  controller: _reasonController,
                  maxLines: 2,
                  style: const TextStyle(color: Colors.white, fontSize: 12),
                  decoration: const InputDecoration(
                    labelText: 'Reason / Explanation',
                    hintText: 'State why you were present or attach medical note...',
                  ),
                ),
                const SizedBox(height: 16),

                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Correction request submitted!')),
                      );
                    },
                    child: const Text('Submit Request to Faculty'),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Past Requests List
          const Text(
            'Correction Request History',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white),
          ),
          const SizedBox(height: 12),

          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _pastRequests.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, idx) {
              final req = _pastRequests[idx];
              final isPending = req['status'] == 'PENDING REVIEW';

              return Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.bgSecondary,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            req['subject']!,
                            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: isPending
                                ? AppColors.warning.withOpacity(0.15)
                                : AppColors.success.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            req['status']!,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: isPending ? AppColors.warning : AppColors.success,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Session Date: ${req['date']!}',
                      style: const TextStyle(fontSize: 11, color: AppColors.textDim),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Note: ${req['reason']!}',
                      style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
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
