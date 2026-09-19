import React from 'react';
import {
  MessageSquare,
  HeartPulse,
  FileText,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sparkles,
  Lock,
} from 'lucide-react';
import { ActiveTab, User, Theme, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface WelcomeHeroProps {
  onNavigate: (tab: ActiveTab) => void;
  currentUser?: User | null;
  theme?: Theme;
  language?: Language;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onNavigate,
  currentUser,
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  return (
    <div
      id="dashboard-welcome-hero"
      className="relative overflow-hidden rounded-2xl border border-blue-900/60 p-6 sm:p-8 lg:p-10 shadow-xl transition-colors bg-[#080D1A] text-white"
    >
      {/* Decorative subtle medical background watermark grid */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -mb-10 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, description, actions */}
        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-900/80 text-blue-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {currentUser
                ? `${t('welcomeBack')}, ${currentUser.name}`
                : t('landingHeroBadge')}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t('askAiHero')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* 3 Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-ask-ai-btn"
              type="button"
              onClick={() => onNavigate('chat')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-900/50 transition-all duration-150 cursor-pointer group"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{t('askAiBtn')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              id="hero-check-symptoms-btn"
              type="button"
              onClick={() => onNavigate('symptoms')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm rounded-xl border shadow-md transition-all duration-150 cursor-pointer bg-[#050811] hover:bg-blue-950/50 text-slate-200 border-blue-900/60 hover:border-blue-700"
            >
              <HeartPulse className="w-4 h-4 text-blue-400" />
              <span>{t('checkSymptomsBtn')}</span>
            </button>

            <button
              id="hero-analyze-report-btn"
              type="button"
              onClick={() => onNavigate('reports')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm rounded-xl border shadow-md transition-all duration-150 cursor-pointer bg-[#050811] hover:bg-blue-950/50 text-slate-200 border-blue-900/60 hover:border-blue-700"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>{t('analyzeReportBtn')}</span>
            </button>
          </div>

          {/* Micro badges below actions */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{t('nonDiagnosticStrict')}</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-slate-500" />
              <span>{t('encryptedLocalStorage')}</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>{t('redFlagTriage')}</span>
            </span>
          </div>
        </div>

        {/* Right Column: EKG Telemetry Graphic Card */}
        <div className="lg:col-span-4 flex justify-center">
          <div
            id="hero-ekg-telemetry-badge"
            className="w-full max-w-xs rounded-2xl border p-5 shadow-lg space-y-3.5 transition-colors bg-[#050811] border-blue-950 text-slate-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-white">{t('aiOnline')}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                v2.4 Ready
              </span>
            </div>

            {/* Pulsing EKG Path */}
            <div className="h-16 w-full rounded-xl bg-black text-blue-400 p-2 flex items-center justify-center relative overflow-hidden border border-blue-950">
              <svg className="w-full h-10 stroke-current" viewBox="0 0 200 40" fill="none">
                <path
                  d="M 0 20 L 40 20 L 50 10 L 60 30 L 70 5 L 80 35 L 90 20 L 130 20 L 140 12 L 150 28 L 160 20 L 200 20"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-blue-400"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" />
            </div>

            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Model Confidence</span>
                <span className="font-semibold text-white">99.4% (Triage)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Clinical Guardrails</span>
                <span className="font-semibold text-blue-400">Active</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Emergency Watch</span>
                <span className="font-semibold text-blue-400">911 / 112 Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
