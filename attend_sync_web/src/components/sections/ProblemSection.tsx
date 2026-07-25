import React from 'react';
import { problemList } from '../../data/mockData';
import { FileText, Clock, AlertTriangle, UserX, BarChart2, HelpCircle } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Clock,
  AlertTriangle,
  UserX,
  BarChart2,
  HelpCircle,
};

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
            The Legacy Friction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Traditional Attendance Has a Severe Problem.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Paper registers, delayed entry, and hidden spreadsheets lead to student exam debarment surprises, administrative overload, and proxy risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemList.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || FileText;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
