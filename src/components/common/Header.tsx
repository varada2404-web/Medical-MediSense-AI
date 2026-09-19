import React, { useState } from 'react';
import {
  Bell,
  HelpCircle,
  Menu,
  ShieldCheck,
  CheckCircle2,
  X,
  FileCheck,
  AlertTriangle,
  HeartPulse,
  Sun,
  Moon,
  Globe,
  LogIn,
  LogOut,
  User as UserIcon,
  ShieldAlert,
  Home,
  LayoutDashboard,
  UserPlus,
} from 'lucide-react';
import { User, Theme, Language, ActiveTab } from '../../types';
import { LANGUAGES, getTranslation } from '../../utils/translations';

interface HeaderProps {
  currentUser: User | null;
  theme: Theme;
  language: Language;
  onToggleTheme: () => void;
  onSelectLanguage: (lang: Language) => void;
  onToggleSidebar: () => void;
  onOpenEmergencyModal: () => void;
  onOpenHelpModal: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  theme,
  language,
  onToggleTheme,
  onSelectLanguage,
  onToggleSidebar,
  onOpenEmergencyModal,
  onOpenHelpModal,
  onNavigate,
  onLogout,
}) => {
  const isDark = theme === 'dark';
  const t = (key: string) => getTranslation(language, key);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Lab Report Analysis Ready',
      desc: 'Comprehensive Metabolic Panel review is ready for viewing.',
      time: '12m ago',
      read: false,
    },
    {
      id: 'n2',
      title: 'Health Safety Protocol v4.2',
      desc: 'System guidelines refreshed with non-diagnostic boundaries.',
      time: '2h ago',
      read: false,
    },
    {
      id: 'n3',
      title: 'Symptom Log Updated',
      desc: 'New educational advice logged into your Health History.',
      time: 'Yesterday',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header
      id="main-app-header"
      className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 sm:px-6 py-3 transition-colors ${
        isDark
          ? 'bg-[#030712]/95 border-blue-950/80 text-slate-100 shadow-md shadow-black/40'
          : 'bg-[#060B18]/95 border-blue-900/50 text-slate-100 shadow-md shadow-black/40'
      }`}
    >
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Left: Branding & mobile hamburger */}
        <div className="flex items-center gap-3">
          {currentUser && (
            <button
              id="mobile-sidebar-toggle-btn"
              type="button"
              onClick={onToggleSidebar}
              aria-label="Toggle navigation sidebar"
              className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-300 hover:bg-blue-950/50 hover:text-blue-400'
                  : 'text-slate-300 hover:bg-blue-950/50 hover:text-blue-400'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate(currentUser ? 'dashboard' : 'landing')}
                className="text-base sm:text-lg font-bold tracking-tight text-left text-white hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span className="hidden xs:inline">{t('appTitle')}</span>
                <span className="xs:hidden">AI Med Assistant</span>
              </button>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-950/90 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-800/80">
                <HeartPulse className="w-3 h-3 text-blue-400" />
                <span>{t('clinicalGuide')}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Responsible AI Medical Assistant
            </p>
          </div>
        </div>

        {/* Right controls: Theme, Language, Notifications, Emergency, Auth Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* AI Online Indicator */}
          <div
            id="ai-online-indicator"
            className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/70 border border-emerald-800 rounded-full text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-[11px] sm:text-xs">{t('aiOnline')}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark and light mode"
            className="p-2 rounded-xl border border-blue-900/60 bg-[#080D1A] text-blue-300 hover:bg-blue-950/60 hover:text-blue-200 transition-colors cursor-pointer"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="language-menu-btn"
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 rounded-xl border border-blue-900/60 bg-[#080D1A] text-slate-200 hover:bg-blue-950/60 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">{currentLangObj.flag}</span>
            </button>

            {showLangMenu && (
              <div
                className="absolute right-0 mt-2 w-44 rounded-2xl shadow-2xl border border-blue-900/70 bg-[#080D1A] text-white p-2 z-50 animate-in fade-in duration-100"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-1">
                  Select Language
                </div>
                <div className="space-y-1 mt-1">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        onSelectLanguage(item.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                        language === item.code
                          ? 'bg-blue-600 text-white font-bold'
                          : 'hover:bg-blue-950/60 text-slate-200 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {language === item.code && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Urgent Emergency Button */}
          <button
            id="header-emergency-btn"
            type="button"
            onClick={onOpenEmergencyModal}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-900 rounded-xl transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{t('emergencyWarningBtn')}</span>
          </button>

          {/* Notifications button & popover (only when authenticated) */}
          {currentUser && (
            <div className="relative">
              <button
                id="notifications-toggle-btn"
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="View notifications"
                className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                  isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0284C7] rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                )}
              </button>

              {showNotifications && (
                <div
                  id="notifications-popover"
                  className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border border-blue-900/70 bg-[#080D1A] text-white p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-950">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white">{t('notifications')}</h4>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.2 rounded-full font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer font-medium"
                        >
                          {t('markAllRead')}
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded-xl text-xs transition-colors ${
                          item.read
                            ? 'bg-[#050811] text-slate-400 border border-slate-900'
                            : 'bg-blue-950/50 text-slate-200 border border-blue-900/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-semibold text-white">{item.title}</span>
                          <span className="text-[10px] text-blue-400">{item.time}</span>
                        </div>
                        <p className="text-[11px] leading-tight text-slate-300">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help icon */}
          <button
            id="help-guide-toggle-btn"
            type="button"
            onClick={onOpenHelpModal}
            aria-label="Help and safety information"
            className="p-2 rounded-xl border border-blue-900/60 bg-[#080D1A] text-blue-300 hover:bg-blue-950/60 transition-colors cursor-pointer"
            title="Educational Guide & Safety Rules"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-blue-950"></div>

          {/* User Auth Profile / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border border-blue-900/60 bg-[#080D1A] hover:bg-blue-950/60 transition-colors cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs ${
                    currentUser.role === 'admin'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-900'
                      : 'bg-gradient-to-br from-blue-500 to-blue-800'
                  }`}
                >
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold leading-tight truncate max-w-[110px] text-white">
                    {currentUser.name}
                  </p>
                  <span
                    className={`text-[10px] uppercase font-extrabold ${
                      currentUser.role === 'admin' ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  >
                    {currentUser.role}
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border border-blue-900/70 bg-[#080D1A] text-white p-2 z-50 animate-in fade-in duration-100"
                >
                  <div className="p-2 border-b border-blue-950">
                    <p className="text-xs font-bold truncate text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-900">
                      Role: {currentUser.role}
                    </span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-blue-950/60 hover:text-white flex items-center gap-2 cursor-pointer text-slate-300"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t('dashboard')}</span>
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-950/40 hover:bg-blue-950 text-blue-300 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
                        <span>{t('adminPortal')}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onNavigate('settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-blue-950/60 hover:text-white flex items-center gap-2 cursor-pointer text-slate-300"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t('settings')}</span>
                    </button>

                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-400 hover:bg-blue-950/60 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="px-3.5 py-1.5 text-xs font-bold text-blue-300 hover:text-white transition-colors cursor-pointer"
              >
                {t('login')}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-900/50 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-blue-200" />
                <span>{t('register')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
