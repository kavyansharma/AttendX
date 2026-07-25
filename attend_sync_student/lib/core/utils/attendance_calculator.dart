import 'dart:math';

enum AttendanceRisk { safe, warning, critical }

class AttendanceCalculator {
  /// Calculate attendance percentage rounded to 1 decimal place
  static double calculatePercentage(int attended, int total) {
    if (total == 0) return 100.0;
    final pct = (attended / total) * 100.0;
    return double.parse(pct.toStringAsFixed(1));
  }

  /// Calculate consecutive classes needed to reach [targetMinPercentage] (e.g. 75.0)
  /// Formula: ceil( (Target * Total - 100 * Attended) / (100 - Target) )
  static int classesNeededToReachTarget({
    required int attended,
    required int total,
    double targetMinPercentage = 75.0,
  }) {
    final currentPct = calculatePercentage(attended, total);
    if (currentPct >= targetMinPercentage) return 0;

    final double num = (targetMinPercentage * total) - (100 * attended);
    final double den = 100 - targetMinPercentage;
    if (den <= 0) return 0;

    return (num / den).ceil();
  }

  /// Calculate maximum classes a student can miss before falling below [targetMinPercentage]
  /// Formula: floor( (100 * Attended - Target * Total) / Target )
  static int skippableClassesBeforeTarget({
    required int attended,
    required int total,
    double targetMinPercentage = 75.0,
  }) {
    final currentPct = calculatePercentage(attended, total);
    if (currentPct < targetMinPercentage) return 0;

    final double num = (100 * attended) - (targetMinPercentage * total);
    final double den = targetMinPercentage;
    if (den <= 0) return 0;

    return max(0, (num / den).floor());
  }

  /// Determine risk status
  static AttendanceRisk getRiskStatus(double percentage, {double minRequired = 75.0, double warningThreshold = 80.0}) {
    if (percentage < minRequired) {
      return AttendanceRisk.critical;
    } else if (percentage < warningThreshold) {
      return AttendanceRisk.warning;
    }
    return AttendanceRisk.safe;
  }
}
