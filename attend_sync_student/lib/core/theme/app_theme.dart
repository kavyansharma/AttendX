import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.bgPrimary,
      primaryColor: AppColors.accentPrimary,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.accentPrimary,
        secondary: AppColors.cyanAccent,
        surface: AppColors.bgSecondary,
        error: AppColors.danger,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.dark().textTheme.copyWith(
              bodyLarge: const TextStyle(color: AppColors.textMain),
              bodyMedium: const TextStyle(color: AppColors.textMuted),
            ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.bgSecondary,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: AppColors.textMain),
      ),
      cardTheme: CardThemeData(
        color: AppColors.bgSecondary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.border),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.accentPrimary,
          foregroundColor: Colors.white,
          elevation: 4,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.bgPrimary,
        hintStyle: const TextStyle(color: AppColors.textDim),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.accentPrimary, width: 2),
        ),
      ),
    );
  }
}
