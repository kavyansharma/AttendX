import React, { useState } from 'react';
import { CheckCheck, AlertTriangle, X } from 'lucide-react';

interface BulkAttendanceActionProps {
  unmarkedCount: number;
  totalCount: number;
  onConfirmBulkMarkPresent: () => void;
  disabled?: boolean;
}

export const BulkAttendanceAction: React.FC<BulkAttendanceActionProps> = ({
  unmarkedCount,
  totalCount,
  onConfirmBulkMarkPresent,
  disabled = false,
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleApply = () => {
    onConfirmBulkMarkPresent();
    setConfirmModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled || unmarkedCount === 0}
        onClick={() => setConfirmModalOpen(true)}
        className={`btn py-2.5 px-4 text-xs font-extrabold flex items-center gap-2 rounded-xl transition-all ${
          unmarkedCount > 0 && !disabled
            ? 'bg-[#10B981] hover:bg-[#0E9F6E] text-white shadow-sm'
            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
        }`}
      >
        <CheckCheck className="w-4 h-4" />
        <span>MARK ALL PRESENT ({unmarkedCount})</span>
      </button>

      {/* CONFIRMATION DIALOG */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200 relative">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
              <CheckCheck className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F172A]">
                Confirm Bulk Action
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Mark all <strong className="text-[#0F172A]">{unmarkedCount} remaining unmarked students</strong> as <strong className="text-[#10B981]">PRESENT</strong>?
              </p>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Students already marked as ABSENT, LATE, or EXCUSED will NOT be overwritten.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModalOpen(false)}
                className="w-1/2 btn btn-secondary py-2.5 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="w-1/2 btn btn-primary py-2.5 text-xs font-bold bg-[#10B981] hover:bg-[#0E9F6E] text-white shadow-sm"
              >
                Confirm & Mark Present
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
