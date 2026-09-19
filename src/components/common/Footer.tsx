import React from 'react';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  LifeBuoy,
  HeartPulse,
} from 'lucide-react';
import { ActiveTab, Theme, Language, User } from '../../types';
import { getTranslation } from '../../utils/translations';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenEmergency: (reason?: string) => void;
  onOpenHelp?: () => void;
  theme: Theme;
  language: Language;
  currentUser: User | null;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEmergency,
  onOpenHelp,
  theme,
  language,
  currentUser,
}) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <footer
      id="main-app-footer"
      className="border-t border-blue-950/80 bg-[#050811] text-slate-400 mt-auto transition-colors"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Brand & Responsible Tagline */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <HeartPulse className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight">MediSense AI</span>
          </div>

          <span className="hidden sm:inline text-slate-600">•</span>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400">
            <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
            Responsible AI Medical Assistant
          </span>

          <span className="hidden md:inline text-slate-600">•</span>
          <span className="text-[11px] text-slate-500">
            © 2026. For educational guidance only. Non-diagnostic.
          </span>
        </div>

        {/* Quick Nav Links & Emergency Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px]">
          <button
            onClick={() => onNavigate('chat')}
            className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer px-1.5 py-0.5"
          >
            AI Chat
          </button>
          <span className="text-slate-700">/</span>
          <button
            onClick={() => onNavigate('symptoms')}
            className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer px-1.5 py-0.5"
          >
            Symptom Checker
          </button>
          <span className="text-slate-700">/</span>
          <button
            onClick={() => onNavigate('reports')}
            className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer px-1.5 py-0.5"
          >
            Lab Reports
          </button>
          <span className="text-slate-700">/</span>
          <button
            onClick={() => onNavigate('healthtips')}
            className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer px-1.5 py-0.5"
          >
            Health Tips
          </button>

          {/* Emergency Safety Action Button */}
          <button
            id="footer-emergency-btn"
            type="button"
            onClick={() => onOpenEmergency('Emergency warning selected from footer')}
            className="ml-1 sm:ml-2 px-3 py-1 rounded-lg font-bold text-[11px] text-white bg-blue-600 hover:bg-blue-500 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3 h-3 text-white" />
            <span>Emergency 911</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
