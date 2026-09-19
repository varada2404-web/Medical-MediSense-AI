import React from 'react';
import {
  MessageSquareQuote,
  HeartPulse,
  FileSearch,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { AI_AGENTS_DATA } from '../../data/mockMedicalData';
import { Theme, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface AIAgentStatusProps {
  theme?: Theme;
  language?: Language;
}

export const AIAgentStatus: React.FC<AIAgentStatusProps> = ({
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  const iconMap: Record<string, React.ElementType> = {
    'agent-1': MessageSquareQuote,
    'agent-2': HeartPulse,
    'agent-3': FileSearch,
    'agent-4': ShieldCheck,
  };

  const workflowSteps = [
    { step: 1, label: 'User Input', sub: 'Natural query or file' },
    { step: 2, label: 'AI Processing', sub: 'Clinical extraction & OCR' },
    { step: 3, label: 'Safety Check', sub: 'Red-flag & guideline triage' },
    { step: 4, label: 'AI Response', sub: 'Educational summary' },
  ];

  return (
    <section
      id="ai-agents-system-section"
      className="border border-blue-950 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6 transition-colors bg-[#080D1A] text-white"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-blue-950">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-950/70 text-blue-400 rounded-lg border border-blue-900/60">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {t('systemArchitectureTitle')}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t('systemArchitectureSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800 w-fit">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{t('agentsOperational')}</span>
        </div>
      </div>

      {/* Workflow Step Sequence: User Input -> AI Processing -> Safety Check -> AI Response */}
      <div className="border border-blue-950 rounded-xl p-4 bg-[#050811]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-3">
          Orchestrated Pipeline Sequence
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {workflowSteps.map((ws, index) => (
            <div key={ws.step} className="relative flex items-center">
              <div className="w-full border border-blue-900/60 rounded-xl p-3 shadow-md transition-colors bg-[#080D1A] hover:border-blue-600">
                <div className="flex items-center justify-between mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 text-[11px] font-bold flex items-center justify-center border border-blue-800">
                    {ws.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Stage {ws.step}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">{ws.label}</div>
                <div className="text-[11px] text-slate-400">{ws.sub}</div>
              </div>

              {/* Blue connection arrow between stages */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 z-10 w-6 h-6 rounded-full bg-[#050811] border border-blue-800 text-blue-400 items-center justify-center shadow-xs">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4 Agent Cards with clinical top accent & status */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-3">
          Supervised Agent Nodes
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {AI_AGENTS_DATA.map((agent) => {
            const Icon = iconMap[agent.id] || ShieldCheck;
            return (
              <div
                key={agent.id}
                id={agent.id}
                className="border border-blue-950 rounded-xl p-3.5 space-y-2.5 transition-colors relative overflow-hidden bg-[#050811] hover:border-blue-900"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />

                <div className="flex items-center justify-between pt-1">
                  <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/60">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-300">
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    <span>{agent.status}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {agent.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-blue-400 mt-0.5">
                    {agent.role}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {agent.model} • {agent.responseTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
