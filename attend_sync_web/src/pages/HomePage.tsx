import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ProblemSection } from '../components/sections/ProblemSection';
import { SolutionSection } from '../components/sections/SolutionSection';
import { RealtimeDemo } from '../components/sections/RealtimeDemo';
import { FeaturesGrid } from '../components/sections/FeaturesGrid';
import { HowItWorks } from '../components/sections/HowItWorks';
import { RoleSection } from '../components/sections/RoleSection';
import { SecuritySection } from '../components/sections/SecuritySection';
import { AnalyticsPreview } from '../components/sections/AnalyticsPreview';
import { CtaSection } from '../components/sections/CtaSection';
import { UserRole } from '../types';

interface HomePageProps {
  onOpenDemo: () => void;
  onOpenLogin: (role?: UserRole) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <main>
      <Hero onOpenDemo={onOpenDemo} onOpenLogin={() => onOpenLogin('student')} />
      <ProblemSection />
      <SolutionSection />
      <RealtimeDemo />
      <FeaturesGrid />
      <HowItWorks />
      <RoleSection onOpenLogin={onOpenLogin} />
      <SecuritySection />
      <AnalyticsPreview />
      <CtaSection onOpenDemo={onOpenDemo} onOpenLogin={() => onOpenLogin('admin')} />
    </main>
  );
};
