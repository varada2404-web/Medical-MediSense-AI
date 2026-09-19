import React from 'react';
import {
  HelpCircle,
  FileCheck,
  BookmarkCheck,
  Activity,
} from 'lucide-react';
import { INITIAL_STATS } from '../../data/mockMedicalData';
import { Theme, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface StatsCardsProps {
  stats?: typeof INITIAL_STATS;
  theme?: Theme;
  language?: Language;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats = INITIAL_STATS,
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  const statItems = [
    {
      id: 'stat-health-questions',
      label: t('healthQuestionsLabel'),
      count: stats.healthQuestions,
      delta: '+3 this week',
      icon: HelpCircle,
      accent: 'text-blue-400 bg-blue-950/60 border-blue-900/60',
    },
    {
      id: 'stat-reports-analyzed',
      label: t('reportsAnalyzedLabel'),
      count: stats.reportsAnalyzed,
      delta: '+1 new',
      icon: FileCheck,
      accent: 'text-blue-300 bg-[#050811] border-blue-900/60',
    },
    {
      id: 'stat-saved-reports',
      label: t('savedReportsLabel'),
      count: stats.savedReports,
      delta: 'Active archive',
      icon: BookmarkCheck,
      accent: 'text-blue-300 bg-[#050811] border-blue-900/60',
    },
    {
      id: 'stat-ai-sessions',
      label: t('aiSessionsLabel'),
      count: stats.aiSessions,
      delta: '100% safeguarded',
      icon: Activity,
      accent: 'text-blue-400 bg-blue-950/60 border-blue-800',
    },
  ];

  return (
    <section id="dashboard-statistics" className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
          {t('patientMetricsTitle')}
        </h3>
        <span className="text-[11px] text-slate-400">{t('syncedLocalState')}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className="border border-blue-950 rounded-2xl p-4 shadow-lg transition-colors flex flex-col justify-between bg-[#080D1A] hover:border-blue-800 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 truncate">
                  {item.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${item.accent}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {item.count}
                </span>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                  {item.delta}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
