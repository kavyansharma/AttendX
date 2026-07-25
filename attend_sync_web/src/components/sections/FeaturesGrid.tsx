import React from 'react';
import { featureList } from '../../data/mockData';
import { Zap, ShieldCheck, Bell, Calendar, RefreshCw, PieChart, Lock, Smartphone } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  ShieldCheck,
  Bell,
  Calendar,
  RefreshCw,
  PieChart,
  Lock,
  Smartphone,
};

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Feature Capability Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered for Modern Higher Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every feature is built specifically for academic structures, strict attendance compliance, and multi-tenant security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Zap;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
