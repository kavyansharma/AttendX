import React, { useState } from 'react';
import { Settings, ShieldCheck, Lock, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [minPercentage, setMinPercentage] = useState(75.0);
  const [warningPercentage, setWarningPercentage] = useState(80.0);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
        <h1 className="text-2xl font-black text-white">Institutional Settings & Attendance Governance</h1>
        <p className="text-xs text-slate-400">
          Configure default attendance requirements and multi-tenant security policies.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            ✓ Settings updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            Attendance Threshold Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Minimum Required Attendance (%) *
              </label>
              <input
                type="number"
                step="0.5"
                value={minPercentage}
                onChange={(e) => setMinPercentage(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
              />
              <p className="text-[11px] text-slate-500 mt-1">Students below this % will trigger exam debarment alerts.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Warning Threshold (%) *
              </label>
              <input
                type="number"
                step="0.5"
                value={warningPercentage}
                onChange={(e) => setWarningPercentage(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
              />
              <p className="text-[11px] text-slate-500 mt-1">Students below this % will receive amber warnings.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button type="submit" className="btn btn-primary text-xs py-2.5 px-6 font-bold flex items-center gap-1.5">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
