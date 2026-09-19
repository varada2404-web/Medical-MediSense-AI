import React from 'react';
import { AlertTriangle, PhoneCall, X, ShieldAlert, HeartCrack, Wind, AlertOctagon, HelpCircle } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerReason?: string;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  triggerReason,
}) => {
  if (!isOpen) return null;

  const redFlags = [
    {
      icon: HeartCrack,
      title: 'Severe Chest Pain or Pressure',
      desc: 'Radiating pain to the jaw, neck, back, or left arm, especially with nausea or cold sweat.',
    },
    {
      icon: Wind,
      title: 'Severe Difficulty Breathing',
      desc: 'Struggling for breath, gasping, inability to speak in full sentences, or blue-tinted lips/nails.',
    },
    {
      icon: AlertOctagon,
      title: 'Sudden Severe Weakness or Numbness',
      desc: 'Facial drooping, arm weakness, slurred speech (FAST stroke criteria), or sudden vision loss.',
    },
    {
      icon: AlertTriangle,
      title: 'Loss of Consciousness / Syncope',
      desc: 'Fainting, sudden unresponsiveness, confusion, seizures, or severe head trauma.',
    },
    {
      icon: ShieldAlert,
      title: 'Severe Uncontrolled Bleeding',
      desc: 'Heavy arterial bleeding that does not halt after continuous direct pressure.',
    },
    {
      icon: HelpCircle,
      title: 'Anaphylaxis / Severe Allergy',
      desc: 'Sudden swelling of lips, tongue, throat with hives and respiratory distress.',
    },
  ];

  return (
    <div
      id="emergency-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        id="emergency-modal-content"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-blue-600 overflow-hidden"
      >
        {/* Top Alert Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-[#080D1A] text-white px-6 py-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <AlertTriangle className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Urgent Clinical Triage
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Emergency Warning
              </h2>
            </div>
          </div>
          <button
            id="close-emergency-modal-btn"
            onClick={onClose}
            aria-label="Close emergency warning"
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {triggerReason && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Triggered by:</strong> {triggerReason}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-base sm:text-lg font-bold text-blue-950">
              &ldquo;If you or someone near you is experiencing a medical emergency,
              contact local emergency services or seek immediate hospital care.&rdquo;
            </p>
            <p className="text-xs text-blue-800 mt-1">
              Do not wait for AI responses or rely on internet advice during life-threatening acute episodes.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Recognized Red-Flag Symptoms &amp; Signs:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {redFlags.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-4 h-4 text-blue-600 shrink-0" />
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Dial Actions */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Instant Emergency Assistance Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href="tel:911"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 911 (US/CAN)</span>
              </a>
              <a
                href="tel:112"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 112 (EU/Global)</span>
              </a>
              <a
                href="tel:988"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-slate-600" />
                <span>988 Crisis Lifeline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>AI Medical Assistant Safety Protocol</span>
          <button
            id="acknowledge-emergency-btn"
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-xs cursor-pointer transition-colors"
          >
            I understand, return to assistant
          </button>
        </div>
      </div>
    </div>
  );
};
