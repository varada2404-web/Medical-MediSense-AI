import React from 'react';
import {
  LayoutDashboard,
  MessageSquareQuote,
  HeartPulse,
  FileText,
  ScanLine,
  Clock,
  BookmarkCheck,
  Settings,
  Shield,
  Activity,
  X,
  AlertCircle,
  Lightbulb,
  ShieldAlert,
  BookOpen,
  Lock,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { ActiveTab, User, Theme, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  currentUser: User | null;
  theme: Theme;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  onCloseMobile,
  currentUser,
  theme,
  language,
}) => {
  // If user is not logged in, sidebar should not be rendered
  if (!currentUser) {
    return null;
  }

  const isDark = theme === 'dark';
  const t = (key: string) => getTranslation(language, key);

  // List of protected tabs that require authentication
  const protectedTabs: ActiveTab[] = [
    'home',
    'dashboard',
    'chat',
    'symptoms',
    'reports',
    'images',
    'admin',
  ];

  // Primary post-login navigation items (Landing page and Home removed after login)
  const mainNavItems: { id: ActiveTab; label: string; icon: React.ElementType; isPublic?: boolean }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'chat', label: t('aiChat'), icon: MessageSquareQuote },
    { id: 'symptoms', label: t('symptomChecker'), icon: HeartPulse },
    { id: 'reports', label: t('reportAnalyzer'), icon: FileText },
    { id: 'images', label: t('imageAnalysis'), icon: ScanLine },
    { id: 'healthtips', label: t('healthTips'), icon: Lightbulb, isPublic: true },
    { id: 'knowledge', label: t('knowledge'), icon: BookOpen, isPublic: true },
    { id: 'settings', label: t('settings'), icon: Settings, isPublic: true },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    if (!currentUser && protectedTabs.includes(tab)) {
      setActiveTab('login');
    } else {
      setActiveTab(tab);
    }
    onCloseMobile();
  };

  const sidebarContent = (
    <div
      className="flex flex-col h-full border-r border-blue-950/80 w-[245px] select-none transition-colors bg-[#050811] text-slate-200 shadow-xl"
    >
      {/* Top Branding Section */}
      <div className="p-4 sm:p-5 border-b border-blue-950/80 flex items-start justify-between">
        <div
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Medical AI Icon */}
          <div className="relative w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 stroke-[2.5]" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#050811]"></div>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white leading-snug">
              {t('appTitle')}
            </h2>
            <p className="text-[10px] font-bold text-blue-400 tracking-wide uppercase mt-0.5">
              Responsible AI Medical Assistant
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
          aria-label="Close navigation sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* If Not Logged In: Fast Sign In callout banner */}
      {!currentUser && (
        <div className="p-3 mx-3 mt-3 rounded-2xl bg-blue-950/40 border border-blue-900/60 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
            <LogIn className="w-3.5 h-3.5" />
            <span>{t('signInToAccessDashboard')}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Sign in to unlock your patient dashboard, chat, and lab reports.
          </p>
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => handleNavClick('login')}
              className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-lg text-center cursor-pointer transition-colors shadow-md shadow-blue-900/40"
            >
              {t('signIn')}
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className="flex-1 py-1.5 bg-[#080D1A] hover:bg-blue-950/60 text-blue-200 font-bold text-[11px] rounded-lg border border-blue-900/60 text-center cursor-pointer transition-colors"
            >
              {t('register')}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Section */}
      <div className="flex-1 py-3 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            {t('clinicalNav')}
          </span>
        </div>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isLocked = !currentUser && !item.isPublic;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${
                isActive
                  ? 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/40 shadow-sm shadow-blue-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-blue-950/30 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-blue-400' : 'text-slate-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {isLocked && (
                <span
                  title={t('lockedFeature')}
                  className="text-[10px] text-slate-500 flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                </span>
              )}
            </button>
          );
        })}

        {/* Admin Portal Special Item */}
        <div className="pt-3 px-3 pb-1 border-t border-blue-950/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            {t('systemAdmin')}
          </span>
        </div>

        <button
          id="nav-item-admin"
          type="button"
          onClick={() => handleNavClick('admin')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${
            activeTab === 'admin'
              ? 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-blue-950/30 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-3 truncate">
            <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">{t('adminPortal')}</span>
          </div>

          {currentUser?.role === 'admin' ? (
            <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Admin
            </span>
          ) : (
            <Lock className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>
      </div>

      {/* Bottom Safety & Disclaimer Callout */}
      <div className="p-3 border-t border-blue-950/80 bg-[#050811]">
        <div
          id="sidebar-safety-badge"
          className="p-3 rounded-xl border border-blue-950 bg-[#080D1A] space-y-1"
        >
          <div className="flex items-center gap-1.5 font-bold text-xs text-white">
            <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{t('aiSafetyProtocol')}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            {t('educationalOnly')}
            <br />
            {t('notDiagnosis')}
          </p>
          <div className="pt-1 flex items-center gap-1 text-[10px] text-amber-400 font-medium">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{t('alwaysConsultDoctor')}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        id="desktop-sidebar"
        className="hidden md:block fixed top-0 left-0 bottom-0 z-40"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Backdrop */}
      {isOpenMobile && (
        <div
          id="mobile-sidebar-drawer"
          className="md:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
