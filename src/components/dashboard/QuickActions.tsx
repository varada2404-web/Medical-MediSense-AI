import React from 'react';
import {
  MessageSquare,
  Activity,
  FileText,
  ScanLine,
  ArrowUpRight,
} from 'lucide-react';
import { ActiveTab, Theme, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface QuickActionsProps {
  onNavigate: (tab: ActiveTab) => void;
  theme?: Theme;
  language?: Language;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNavigate,
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  const cards = [
    {
      id: 'quick-chat',
      tab: 'chat' as ActiveTab,
      icon: MessageSquare,
      title: t('aiHealthChat'),
      description: 'Ask general health questions and get easy-to-understand explanations.',
      buttonText: t('startChat'),
      ariaLabel: 'Open AI Health Chat',
    },
    {
      id: 'quick-symptoms',
      tab: 'symptoms' as ActiveTab,
      icon: Activity,
      title: t('symptomChecker'),
      description: 'Describe your symptoms and receive educational guidance with safety warnings.',
      buttonText: t('checkSymptomsBtn'),
      ariaLabel: 'Open Symptom Checker',
    },
    {
      id: 'quick-reports',
      tab: 'reports' as ActiveTab,
      icon: FileText,
      title: t('reportAnalyzer'),
      description: 'Upload a medical report and get a simple explanation of the information.',
      buttonText: t('uploadReport'),
      ariaLabel: 'Open Medical Report Analyzer',
    },
    {
      id: 'quick-images',
      tab: 'images' as ActiveTab,
      icon: ScanLine,
      title: t('imageAnalysis'),
      description: 'Upload supported medical images for AI-assisted educational analysis.',
      buttonText: t('uploadImage'),
      ariaLabel: 'Open Image Analysis',
    },
  ];

  return (
    <section id="dashboard-quick-actions" className="space-y-3">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={card.id}
              className="group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer bg-[#080D1A] border-blue-950 hover:border-blue-500/60 hover:shadow-blue-950/30"
              onClick={() => onNavigate(card.tab)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-900/60 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-md">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-slate-500 group-hover:text-blue-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-blue-950">
                <button
                  type="button"
                  aria-label={card.ariaLabel}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(card.tab);
                  }}
                  className="w-full py-2 px-3 text-xs font-bold rounded-xl border text-center transition-colors cursor-pointer bg-[#050811] hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-300 border-blue-900/60"
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
