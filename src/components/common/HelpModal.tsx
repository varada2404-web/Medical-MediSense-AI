import React from 'react';
import { X, HelpCircle, ShieldAlert, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEmergency: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onOpenEmergency,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="help-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Educational Guide &amp; Safety
              </h3>
              <p className="text-xs text-slate-500">
                AI Medical Assistant Operational Guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>Core Medical Principle</span>
            </div>
            <p className="leading-relaxed">
              &ldquo;This AI assistant provides general health information and is not a substitute for a qualified medical professional.&rdquo;
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              1. What this assistant does:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Translates complex laboratory biomarkers into easy-to-understand explanations.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Provides self-care hydration and resting guidance for uncomplicated mild symptoms.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Suggests productive questions for you to ask your primary care physician.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              2. What this assistant does NOT do:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
              <li className="flex items-start gap-1.5 text-slate-800">
                <span className="font-bold text-blue-600">✗</span>
                <span>Does NOT diagnose medical conditions or issue prescriptions.</span>
              </li>
              <li className="flex items-start gap-1.5 text-slate-800">
                <span className="font-bold text-blue-600">✗</span>
                <span>Does NOT replace hospital emergency departments or certified radiologists.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenEmergency();
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>View Emergency Warning Checklist</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
