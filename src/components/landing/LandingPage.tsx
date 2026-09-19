import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  FileText,
  ScanLine,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  LogIn,
  UserPlus,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  Check,
  Stethoscope,
  BookOpen,
  HelpCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { ActiveTab, Theme, Language, User } from '../../types';
import { getTranslation } from '../../utils/translations';
import { VoiceService } from '../../utils/speech';

interface LandingPageProps {
  onNavigate: (tab: ActiveTab) => void;
  theme: Theme;
  language: Language;
  currentUser?: User | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  theme,
  language,
  currentUser,
}) => {
  const isDark = theme === 'dark';
  const t = (key: string) => getTranslation(language, key);

  // Interactive Live Simulation state
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);
  const [isSpeakingDemo, setIsSpeakingDemo] = useState(false);

  const demoItems = [
    {
      prompt: 'I feel sudden crushing chest tightness spreading to my left arm and jaw.',
      tag: 'Acute Cardiac Triage',
      severity: 'Emergency Escalation',
      severityColor: 'bg-red-500/20 text-red-400 border-red-500/40',
      output: 'CRITICAL ALERT: Potential Acute Coronary Syndrome (ACS). Call 911 or local emergency services immediately.',
      details:
        'Crushing chest pressure radiating to the left arm, jaw, or back, especially accompanied by diaphoresis (sweating) or shortness of breath, constitutes an acute medical emergency. Do not drive yourself. Await paramedic dispatch.',
      badgeColor: 'border-red-500/30 bg-red-950/60 text-red-300',
    },
    {
      prompt: 'My serum creatinine came back at 1.6 mg/dL. What does this indicate?',
      tag: 'Renal Biomarker Analysis',
      severity: 'Clinical Review Needed',
      severityColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      output: 'Serum creatinine of 1.6 mg/dL is moderately elevated above standard adult reference intervals (0.6–1.2 mg/dL).',
      details:
        'This may reflect reduced glomerular filtration rate (eGFR), temporary dehydration (pre-renal azotemia), intense recent resistance training, or medication effects. Discuss with your physician for a repeat creatinine and urine ACR check.',
      badgeColor: 'border-amber-500/30 bg-amber-950/60 text-amber-300',
    },
    {
      prompt: 'Do I need to fast before a comprehensive lipid panel and glucose test?',
      tag: 'Diagnostic Preparation',
      severity: 'Routine Protocol',
      severityColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      output: 'Standard clinical guidelines mandate a 10–12 hour overnight water-only fast.',
      details:
        'Recent dietary triglycerides directly inflate circulating chylomicron levels. Plain water is strictly encouraged to maintain hydration and ease venipuncture. Take prescribed morning medications unless specifically directed otherwise by your doctor.',
      badgeColor: 'border-emerald-500/30 bg-emerald-950/60 text-emerald-300',
    },
  ];

  const currentDemo = demoItems[selectedDemoIndex];

  const handleSpeakDemo = () => {
    if (isSpeakingDemo) {
      VoiceService.stopSpeaking();
      setIsSpeakingDemo(false);
      return;
    }

    const textToRead = `${currentDemo.output}. ${currentDemo.details}`;
    VoiceService.speak(textToRead, () => setIsSpeakingDemo(false));
    setIsSpeakingDemo(true);
  };

  const handleActionClick = (targetTab: ActiveTab) => {
    if (!currentUser) {
      onNavigate('login');
    } else {
      onNavigate(targetTab);
    }
  };

  return (
    <div id="medical-landing-page" className="space-y-12 sm:space-y-16 animate-in fade-in duration-200 text-left">
      {/* 1. HERO SECTION: Ultra-Modern Clinical Platform */}
      <section className="relative rounded-3xl overflow-hidden border border-blue-900/60 bg-[#080D1A] shadow-2xl">
        {/* Subtle Background Mesh & Light Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14 relative z-10">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Next-Gen Clinical AI Platform</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Intelligent Healthcare Guidance.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                  Real Medical Clarity.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl pt-1">
                MediSense AI provides responsible, evidence-based symptom evaluation, plain-language laboratory biomarker translation, medical vision assistance, and 24/7 emergency red-flag triage.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {!currentUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('register')}
                    className="px-5 py-3.5 bg-[#050811] hover:bg-blue-950/70 text-blue-300 font-bold text-sm rounded-xl border border-blue-900/80 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4 text-blue-400" />
                    <span>Register New Account</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>Enter Patient Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  const demo = document.getElementById('interactive-clinical-preview');
                  demo?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-3.5 text-slate-300 hover:text-white font-bold text-sm cursor-pointer flex items-center gap-2 transition-colors"
              >
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Try Live Interactive Demo</span>
              </button>
            </div>

            {/* Trust highlights checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-blue-950">
              {[
                'Strict Non-Diagnostic Clinical Safety',
                '24 Evidence-Based Health Tip Categories',
                'Lab PDF Blood Report OCR Extraction',
                'Instant Emergency Red-Flag Interception',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Interactive Clinical Triage Card Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-blue-800/60 bg-[#050811] p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-blue-950 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Live Clinical Triage Monitor</h3>
                    <span className="text-[10px] text-blue-400 font-semibold">Active AI Firewall</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Simulated Triage Stream */}
              <div className="space-y-3 text-xs">
                {/* Simulated User Question */}
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                    Patient Inquiry:
                  </span>
                  <p className="font-semibold text-white">
                    &ldquo;Experiencing mild left-sided chest twinges with deep inhalation after heavy lifting.&rdquo;
                  </p>
                </div>

                {/* AI Triage Response Preview */}
                <div className="p-3.5 rounded-xl bg-[#080D1A] border border-blue-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      AI Triage Evaluation:
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Musculoskeletal vs Costochondritis
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Pleuritic pain (worsening with inspiration) following strain often suggests musculoskeletal intercostal irritation. However, if accompanied by dyspnea, nausea, or radiating pressure, immediate emergency escalation applies.
                  </p>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-950 text-center">
                  <div className="p-2 rounded-lg bg-[#080D1A] border border-blue-950/60">
                    <div className="text-xs font-black text-blue-400">99.8%</div>
                    <div className="text-[9px] text-slate-400 uppercase font-semibold">Safety Boundary</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#080D1A] border border-blue-950/60">
                    <div className="text-xs font-black text-blue-400">&lt; 1.2s</div>
                    <div className="text-[9px] text-slate-400 uppercase font-semibold">Triage Speed</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#080D1A] border border-blue-950/60">
                    <div className="text-xs font-black text-emerald-400">0</div>
                    <div className="text-[9px] text-slate-400 uppercase font-semibold">Hallucinations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS TICKER BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { metric: '24 Categories', label: 'Preventive Health Tips', sub: 'Verified guidelines' },
          { metric: '100% Non-Diagnostic', label: 'Safety Firewalls', sub: 'AMA / HIPAA principles' },
          { metric: 'OCR Analysis', label: 'Lab Blood Reports', sub: 'PDF & image processing' },
          { metric: '24/7 Red-Flag', label: 'Emergency Safeguard', sub: 'Instant 911 hotline' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl border border-blue-950 bg-[#080D1A] shadow-md flex flex-col justify-center text-center sm:text-left"
          >
            <span className="text-xl sm:text-2xl font-black text-blue-400">{item.metric}</span>
            <span className="text-xs font-bold text-white mt-1">{item.label}</span>
            <span className="text-[11px] text-slate-400">{item.sub}</span>
          </div>
        ))}
      </section>

      {/* 3. CORE CLINICAL MODULES BENTO GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-400 block mb-1">
              Integrated Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Evidence-Based Health Modules
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Built from clinical informatics principles to facilitate health literacy without bypassing licensed physicians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: AI Health Chat */}
          <div
            onClick={() => handleActionClick('chat')}
            className="p-6 rounded-3xl border border-blue-950 bg-[#080D1A] hover:border-blue-500/60 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                AI Health Consultation Chat
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evidence-based conversational answers for patient wellness inquiries, medication concepts, and preparation guidelines with built-in audio voice readouts.
              </p>
            </div>
            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Start Health Chat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Symptom Checker */}
          <div
            onClick={() => handleActionClick('symptoms')}
            className="p-6 rounded-3xl border border-blue-950 bg-[#080D1A] hover:border-blue-500/60 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Intelligent Symptom Triage
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-system anatomical symptom evaluation with instant danger-sign triggers, recommended physician specialties, and targeted consultation questions.
              </p>
            </div>
            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Check Symptoms</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Lab Report Analyzer */}
          <div
            onClick={() => handleActionClick('reports')}
            className="p-6 rounded-3xl border border-blue-950 bg-[#080D1A] hover:border-blue-500/60 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Laboratory Report Clarity
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Translate dense lipid panels, comprehensive metabolic panels (CMP), and complete blood counts (CBC) into understandable explanations with clear reference ranges.
              </p>
            </div>
            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Analyze Lab Report</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Medical Image Vision */}
          <div
            onClick={() => handleActionClick('images')}
            className="p-6 rounded-3xl border border-blue-950 bg-[#080D1A] hover:border-blue-500/60 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ScanLine className="w-6 h-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Medical Vision Inspection
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Educational image review for skin lesions, x-rays, and anatomical diagrams with strict disclaimers that AI cannot replace board-certified radiologist reviews.
              </p>
            </div>
            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Explore Vision AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: 24 Health Tip Categories */}
          <div
            onClick={() => handleActionClick('healthtips')}
            className="p-6 rounded-3xl border border-blue-950 bg-[#080D1A] hover:border-blue-500/60 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                24 Clinical Health Tip Categories
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cardiovascular, diabetes, kidney function, respiratory health, sleep hygiene, ergonomics, gut microbiome, and pediatric care with verifiable references.
              </p>
            </div>
            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Browse 24 Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Safety & Privacy */}
          <div
            onClick={() => onNavigate(currentUser ? 'dashboard' : 'login')}
            className="p-6 rounded-3xl border border-blue-950 bg-[#080D1A] hover:border-blue-500/60 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Certified Patient Privacy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                256-bit encrypted local storage, role-based access control, automated session auditing, and direct SMTP notifications for verified patient accounts.
              </p>
            </div>
            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>View Privacy Architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CLINICAL DEMO WITH AUDIO */}
      <section
        id="interactive-clinical-preview"
        className="p-6 sm:p-10 rounded-3xl border border-blue-950 bg-[#080D1A] shadow-2xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-950 border border-blue-800 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Clinical Sandbox</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Experience the Clinical AI Assistant
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a sample medical scenario below to preview how our clinical triage and lab explanation algorithms respond.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeakDemo}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl border border-blue-800 bg-[#050811] text-blue-300 text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-blue-950 transition-colors shadow-md"
          >
            {isSpeakingDemo ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
            <span>{isSpeakingDemo ? 'Stop Audio Readout' : 'Listen to Audio Guidance'}</span>
          </button>
        </div>

        {/* Demo Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {demoItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedDemoIndex(idx);
                if (isSpeakingDemo) {
                  VoiceService.stopSpeaking();
                  setIsSpeakingDemo(false);
                }
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2.5 ${
                selectedDemoIndex === idx
                  ? 'border-blue-500 bg-blue-950/60 shadow-lg shadow-blue-950/60 ring-1 ring-blue-500'
                  : 'border-blue-950 bg-[#050811] hover:border-blue-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.tag}
                </span>
                <span className="text-[11px] font-semibold text-blue-400">Sample #{idx + 1}</span>
              </div>
              <p className="text-xs font-bold text-white line-clamp-2">
                &ldquo;{item.prompt}&rdquo;
              </p>
            </button>
          ))}
        </div>

        {/* Output Card */}
        <div className="p-5 sm:p-6 rounded-2xl border border-blue-950 bg-[#050811] space-y-3.5">
          <div className="flex items-center justify-between border-b pb-3 border-blue-950">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <h4 className="text-xs font-bold text-white">
                MediSense AI Clinical Response
              </h4>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentDemo.severityColor}`}>
              {currentDemo.severity}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-blue-300 leading-snug">
              {currentDemo.output}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentDemo.details}
            </p>
          </div>

          <div className="pt-3 border-t border-blue-950 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-[11px]">
              Prompt: &ldquo;{currentDemo.prompt}&rdquo;
            </span>
            <button
              onClick={() => onNavigate('login')}
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Sign in to access personalized clinical tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="rounded-3xl border border-blue-900/80 bg-gradient-to-br from-[#080D1A] via-blue-950 to-[#080D1A] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl space-y-5">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Responsible AI Medical Assistant
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Take Control of Your Health Literacy Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Join thousands of patients using MediSense AI for reliable symptom triage, laboratory literacy, and 24 clinical wellness categories.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {!currentUser ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/40 transition-all cursor-pointer flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Clinical Portal</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="px-5 py-3 bg-[#050811] hover:bg-blue-900/60 text-blue-300 font-bold text-xs sm:text-sm rounded-xl border border-blue-800 transition-all cursor-pointer flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-blue-400" />
                <span>Create Free Account</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/40 transition-all cursor-pointer flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4" />
              <span>Go to Patient Dashboard</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
