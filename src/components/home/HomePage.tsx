import React, { useState } from 'react';
import {
  User,
  Theme,
  Language,
  ActiveTab,
} from '../../types';
import { getTranslation } from '../../utils/translations';
import {
  LayoutDashboard,
  MessageSquareQuote,
  HeartPulse,
  FileText,
  ScanLine,
  Lightbulb,
  ShieldCheck,
  Activity,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Clock,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Heart,
  Droplets,
  Calendar,
} from 'lucide-react';

interface HomePageProps {
  currentUser: User | null;
  theme: Theme;
  language: Language;
  onNavigate: (tab: ActiveTab) => void;
  onOpenEmergencyModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentUser,
  theme,
  language,
  onNavigate,
  onOpenEmergencyModal,
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Daily tip for speech synthesis
  const dailyTipText =
    language === 'te'
      ? 'రోజువారీ క్లినికల్ చిట్కా: రోజుకు కనీసం 2-3 లీటర్ల నీరు త్రాగడం మూత్రపిండాల పనితీరును మెరుగుపరుస్తుంది మరియు శరీర ఉష్ణోగ్రతను సమతుల్యంగా ఉంచుతుంది.'
      : language === 'hi'
      ? 'दैनिक स्वास्थ्य सुझाव: प्रतिदिन 2-3 लीटर पानी पीने से गुर्दे स्वस्थ रहते हैं और शरीर का तापमान नियंत्रित रहता है।'
      : 'Daily Clinical Tip: Maintaining consistent hydration with 2 to 3 liters of water daily supports renal biomarker clearance and cellular equilibrium.';

  const handleSpeakDailyTip = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dailyTipText);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const patientName = currentUser?.name || 'Valued Patient';
  const patientId = currentUser?.patientId || 'PT-4092-MD';
  const bloodType = currentUser?.bloodType || 'O-Positive';

  return (
    <div id="patient-home-portal" className="space-y-6 animate-in fade-in duration-150 text-white">
      {/* 1. Patient Welcome Banner */}
      <div
        id="home-patient-banner"
        className="relative overflow-hidden rounded-2xl border border-blue-900/60 p-6 sm:p-8 shadow-xl transition-colors bg-[#080D1A] text-white"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('registrationSuccessTitle')}</span>
              <span className="text-slate-700">•</span>
              <span>{currentUser?.role === 'admin' ? 'Medical Director' : 'Active Patient'}</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {t('welcomeBack')}, {patientName} 👋
              </h2>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Patient Meta Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#050811] font-mono font-semibold text-slate-300 border border-blue-950">
                <span>ID:</span>
                <span className="text-blue-400">{patientId}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#050811] font-semibold text-slate-300 border border-blue-950">
                <Heart className="w-3.5 h-3.5 text-blue-400" />
                <span>Blood: {bloodType}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#050811] font-semibold text-slate-300 border border-blue-950">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Joined: {currentUser?.joinedDate || 'Recent'}</span>
              </span>
            </div>
          </div>

          {/* Direct CTA to Dashboard */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              id="home-open-dashboard-btn"
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-900/40 transition-all cursor-pointer group"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('dashboard')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              id="home-emergency-warning-btn"
              type="button"
              onClick={onOpenEmergencyModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-xs rounded-xl border transition-all cursor-pointer bg-[#050811] hover:bg-blue-950/60 text-blue-300 border-blue-900/60"
            >
              <AlertCircle className="w-4 h-4 text-blue-400" />
              <span>{t('emergencyGuidelines')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary Service Launchpad (6 Core Interactive Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {t('quickActionsTitle')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('quickActionsSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: AI Health Chat */}
          <div
            id="home-launch-chat"
            onClick={() => onNavigate('chat')}
            className="group rounded-2xl border border-blue-950 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl cursor-pointer flex flex-col justify-between bg-[#080D1A]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MessageSquareQuote className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                  Voice Enabled
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t('aiHealthChat')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Ask health questions in plain English or Telugu, and listen to spoken answers with voice playback.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>{t('startChat')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Symptom Checker */}
          <div
            id="home-launch-symptoms"
            onClick={() => onNavigate('symptoms')}
            className="group rounded-2xl border border-blue-950 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl cursor-pointer flex flex-col justify-between bg-[#080D1A]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <HeartPulse className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                  Safe Triage
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t('symptomChecker')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Identify symptom duration, severity, and receive immediate red-flag warnings for emergencies.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>{t('checkSymptomsBtn')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Report Analyzer (PDF / Images) */}
          <div
            id="home-launch-reports"
            onClick={() => onNavigate('reports')}
            className="group rounded-2xl border border-blue-950 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl cursor-pointer flex flex-col justify-between bg-[#080D1A]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                  PDF &amp; Images Only
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t('reportAnalyzer')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Upload PDF lab results or image files for crystal-clear breakdown of biomarkers with plain-language explanations.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>{t('uploadReport')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Medical Image Vision */}
          <div
            id="home-launch-images"
            onClick={() => onNavigate('images')}
            className="group rounded-2xl border border-blue-950 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl cursor-pointer flex flex-col justify-between bg-[#080D1A]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ScanLine className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                  Contrast Inversion
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t('imageAnalysis')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Analyze clinical imaging (X-rays, dermatology) with anatomical orientation and zoom inspection tools.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>{t('uploadImage')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 5: Health Tips */}
          <div
            id="home-launch-healthtips"
            onClick={() => onNavigate('healthtips')}
            className="group rounded-2xl border border-blue-950 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl cursor-pointer flex flex-col justify-between bg-[#080D1A]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Lightbulb className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                  Evidence Based
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t('healthTips')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Explore clinical wellness guidelines for nutrition, cardiac health, metabolic balance, and sleep hygiene.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>{t('exploreAllTips')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 6: Dashboard Telemetry & System */}
          <div
            id="home-launch-dashboard"
            onClick={() => onNavigate('dashboard')}
            className="group rounded-2xl border border-blue-950 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl cursor-pointer flex flex-col justify-between bg-[#080D1A]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <LayoutDashboard className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                  Full Telemetry
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t('dashboard')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  View patient activity metrics, multi-agent AI architecture status, and HIPAA-aligned privacy protections.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Open Clinical Dashboard</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Clinical Health Tip with Speech Readout */}
      <div
        id="home-daily-clinical-digest"
        className="rounded-2xl border border-blue-950 p-5 sm:p-6 shadow-xl transition-colors bg-[#080D1A] text-white"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-950/70 text-blue-400 border border-blue-900">
              <Lightbulb className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {t('clinicalTipsTitle')}
              </h4>
              <p className="text-[11px] text-slate-400">
                Verified physiological wellness guidance for active patients
              </p>
            </div>
          </div>

          {/* Audio speech button */}
          <button
            type="button"
            onClick={handleSpeakDailyTip}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              isSpeaking
                ? 'bg-blue-600 text-white border-blue-500 animate-pulse'
                : 'bg-[#050811] hover:bg-blue-950/60 text-blue-300 border-blue-900/60'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
            <span>{isSpeaking ? t('stopSpeech') : t('speakResponse')}</span>
          </button>
        </div>

        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {dailyTipText}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-400" />
                <span>Hydration Optimization</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span>Clinical Reference: Mayo Clinic Renal Guidelines</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={() => onNavigate('healthtips')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('exploreAllTips')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quick Recent Patient Activity & Safe Triage Archive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Quick Health Status */}
        <div
          className="rounded-2xl border border-blue-950 p-5 shadow-xl space-y-3 bg-[#080D1A] text-white"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>Patient Clinical Status</span>
            </h4>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
              Optimal
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] border border-blue-950">
              <span className="text-slate-400 font-medium">Last Symptom Check</span>
              <span className="font-semibold text-white">Normal (Non-urgent)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] border border-blue-950">
              <span className="text-slate-400 font-medium">Latest Lab Report</span>
              <span className="font-semibold text-white">Metabolic Panel (CMP)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] border border-blue-950">
              <span className="text-slate-400 font-medium">Security &amp; Encryption</span>
              <span className="font-semibold text-blue-400">HIPAA Compliant Session</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Health Tips & Lab Analysis shortcuts */}
        <div
          className="rounded-2xl border border-blue-950 p-5 shadow-xl space-y-3 bg-[#080D1A] text-white"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <BookmarkCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Evidence-Based Health Guides</span>
            </h4>
            <button
              onClick={() => onNavigate('healthtips')}
              className="text-[11px] font-bold text-blue-400 hover:underline cursor-pointer"
            >
              Explore 24 Categories
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div
              onClick={() => onNavigate('reports')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] hover:border-blue-700 border border-blue-950 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-slate-200">Comprehensive Metabolic Panel</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">PDF • OCR Ready</span>
            </div>

            <div
              onClick={() => onNavigate('healthtips')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] hover:border-blue-700 border border-blue-950 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-slate-200">Cardiovascular &amp; Blood Pressure Guide</span>
              </div>
              <span className="text-[10px] font-semibold text-blue-400">Read</span>
            </div>

            <div
              onClick={() => onNavigate('healthtips')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] hover:border-blue-700 border border-blue-950 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-slate-200">Circadian Hygiene &amp; Sleep Protocols</span>
              </div>
              <span className="text-[10px] font-semibold text-blue-400">Explore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
