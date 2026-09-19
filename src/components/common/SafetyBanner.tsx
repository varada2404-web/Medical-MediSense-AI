import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';
import { Language, Theme } from '../../types';
import { getTranslation } from '../../utils/translations';

interface SafetyBannerProps {
  onOpenEmergencyModal?: () => void;
  compact?: boolean;
  language?: Language;
  theme?: Theme;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({
  onOpenEmergencyModal,
  compact = false,
  language = 'en',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  return (
    <div
      id="safety-notice-banner"
      className={`border rounded-2xl shadow-xs transition-all ${
        compact ? 'p-3 text-xs' : 'p-4 sm:p-5'
      } ${
        isDark
          ? 'bg-[#080D1A] border-blue-900/60 text-slate-200'
          : 'bg-blue-50/70 border-blue-200/80 text-slate-800'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100/90 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl shrink-0 mt-0.5 sm:mt-0 border border-blue-200 dark:border-blue-900/60">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/40 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/60">
                {t('safetyFirstBadge')}
              </span>
              <h4 className="text-sm font-bold text-[#172033] dark:text-white">
                {t('safetyNoticeTitle')}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 mt-1 leading-relaxed max-w-3xl">
              {t('safetyNoticeDesc')}
            </p>
          </div>
        </div>

        {onOpenEmergencyModal && (
          <button
            id="emergency-alert-btn"
            type="button"
            onClick={onOpenEmergencyModal}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer self-stretch sm:self-auto text-center justify-center"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{t('emergencyGuidelines')}</span>
          </button>
        )}
      </div>
    </div>
  );
};
