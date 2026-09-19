import React from 'react';
import { Shield, Lock, EyeOff, Trash2 } from 'lucide-react';
import { Theme, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface PrivacyNoticeProps {
  theme?: Theme;
  language?: Language;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const langKey = (language || 'en') as Language;
  const t = (key: string) => getTranslation(langKey, key);

  const privacyPoints = [
    {
      icon: Lock,
      title: 'Secure Client-Side Processing',
      desc: 'Uploaded medical documents and imaging files are parsed securely without commercial data selling.',
    },
    {
      icon: EyeOff,
      title: 'Minimize Personal Data',
      desc: 'Please redact or avoid uploading unnecessary identifiers like SSN, full home address, or billing records.',
    },
    {
      icon: Trash2,
      title: 'Zero Permanent Storage',
      desc: 'Session data and files are ephemeral and not retained on remote servers longer than necessary.',
    },
    {
      icon: Shield,
      title: 'Isolated Inference Engine',
      desc: 'AI processing runs in dedicated sandboxed enclaves compliant with healthcare data protection principles.',
    },
  ];

  return (
    <div
      id="privacy-matters-card"
      className="border border-blue-950 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 transition-colors bg-[#080D1A] text-white"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900/60 text-blue-400 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>{t('privacyMattersTitle')}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
              {t('hipaaAligned')}
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            How your health queries, laboratory reports, and medical images are guarded
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {privacyPoints.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl border border-blue-950 bg-[#050811] transition-colors"
            >
              <div className="p-2 bg-blue-950/60 rounded-lg border border-blue-900/60 text-blue-400 shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
