import 'package:flutter_test/flutter_test.dart';
import 'package:attend_sync_student/main.dart';

void main() {
  testWidgets('AttendX Student App Smoke Test', (WidgetTester tester) async {
    await tester.pumpWidget(const AttendXStudentApp());
    expect(find.text('AttendX'), findsOneWidget);
  });
}
