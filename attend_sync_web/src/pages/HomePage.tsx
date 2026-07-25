import React from 'react';
import { Hero } from '../components/public/Hero';
import { ProblemSection } from '../components/public/ProblemSection';
import { SolutionSection } from '../components/public/SolutionSection';
import { HowItWorks } from '../components/public/HowItWorks';
import { Features } from '../components/public/Features';
import { RoleExperience } from '../components/public/RoleExperience';
import { SecuritySection } from '../components/public/SecuritySection';
import { AnalyticsSection } from '../components/public/AnalyticsSection';
import { CTASection } from '../components/public/CTASection';
import { UserRole } from '../types';

interface HomePageProps {
  onOpenDemo: () => void;
  onOpenLogin: (role?: UserRole) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <main className="w-full min-w-0">
      <Hero onOpenDemo={onOpenDemo} onOpenLogin={() => onOpenLogin('student')} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <Features />
      <RoleExperience onOpenLogin={onOpenLogin} />
      <SecuritySection />
      <AnalyticsSection />
      <CTASection onOpenDemo={onOpenDemo} onOpenLogin={() => onOpenLogin('admin')} />
    </main>
  );
};
