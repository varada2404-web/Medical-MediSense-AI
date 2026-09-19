/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, AnalyzedReport, SymptomGuidanceResult, User, Theme, Language } from './types';
import { INITIAL_STATS } from './data/mockMedicalData';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SafetyBanner } from './components/common/SafetyBanner';
import { EmergencyModal } from './components/common/EmergencyModal';
import { HelpModal } from './components/common/HelpModal';
import { WelcomeHero } from './components/dashboard/WelcomeHero';
import { QuickActions } from './components/dashboard/QuickActions';
import { StatsCards } from './components/dashboard/StatsCards';
import { AIAgentStatus } from './components/dashboard/AIAgentStatus';
import { PrivacyNotice } from './components/dashboard/PrivacyNotice';
import { AIChat } from './components/chat/AIChat';
import { SymptomChecker } from './components/symptom/SymptomChecker';
import { ReportAnalyzer } from './components/report/ReportAnalyzer';
import { ImageAnalyzer } from './components/image/ImageAnalyzer';
import { SettingsView } from './components/settings/SettingsView';
import { LandingPage } from './components/landing/LandingPage';
import { HomePage } from './components/home/HomePage';
import { AuthPage } from './components/auth/AuthPage';
import { AdminPortal } from './components/admin/AdminPortal';
import { HealthTipsView } from './components/healthtips/HealthTipsView';
import { KnowledgeBaseView } from './components/knowledge/KnowledgeBaseView';
import { getTranslation } from './utils/translations';
import { recordLoginSession } from './utils/loginTracker';
import { LogIn, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  // Theme state: dark / light (defaults to dark for full blue & black website)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('aimed_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  // Language state: en, es, fr, de, hi, te, ar
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('aimed_lang') as Language;
    return saved || 'en';
  });

  // User authentication state - Defaults to null (Guest) before login
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aimed_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return null;
  });

  // Navigation tab: if logged in, defaults to 'home'; if unauthenticated, defaults to 'landing'
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const savedUser = localStorage.getItem('aimed_user');
    if (savedUser) {
      return 'home';
    }
    return 'landing';
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState<string | undefined>();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [stats, setStats] = useState(INITIAL_STATS);

  const t = (key: string) => getTranslation(language, key);

  // Synchronize theme to document root
  useEffect(() => {
    localStorage.setItem('aimed_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Synchronize language and RTL / LTR layout
  useEffect(() => {
    localStorage.setItem('aimed_lang', language);
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  // Synchronize current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aimed_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aimed_user');
    }
  }, [currentUser]);

  // Guard: Before login or registration, the app stays strictly on landing or auth pages.
  // After login, landing page and home are completely removed and users are routed to dashboard or admin.
  useEffect(() => {
    if (!currentUser && activeTab !== 'landing' && activeTab !== 'login' && activeTab !== 'register') {
      setActiveTab('landing');
    } else if (currentUser && (activeTab === 'landing' || activeTab === 'home')) {
      setActiveTab(currentUser.role === 'admin' ? 'admin' : 'dashboard');
    }
  }, [currentUser, activeTab]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleLoginSuccess = (user: User) => {
    recordLoginSession(user);
    localStorage.setItem('aimed_user', JSON.stringify(user));
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aimed_user');
    setCurrentUser(null);
    setIsMobileSidebarOpen(false);
    setActiveTab('landing');
  };

  const handleOpenEmergency = (reason?: string) => {
    setEmergencyReason(reason);
    setIsEmergencyModalOpen(true);
  };

  const handleIncrementQuestionCount = () => {
    setStats((prev) => ({
      ...prev,
      healthQuestions: prev.healthQuestions + 1,
      aiSessions: prev.aiSessions + 1,
    }));
  };

  const handleReportSaved = (_report: AnalyzedReport) => {
    setStats((prev) => ({
      ...prev,
      reportsAnalyzed: prev.reportsAnalyzed + 1,
      savedReports: prev.savedReports + 1,
    }));
  };

  const handleGuidanceGenerated = (guidance: SymptomGuidanceResult) => {
    if (guidance.isEmergencyTriggered) {
      handleOpenEmergency('Severe or critical symptom combination detected during triage');
    }
  };

  const isAuth = activeTab === 'login' || activeTab === 'register';

  // Full-page immersive layout for login and register with NO footer or headers
  if (isAuth) {
    return (
      <div className="min-h-screen w-full bg-[#030712] font-['Plus_Jakarta_Sans',sans-serif] text-slate-100">
        <AuthPage
          initialMode={activeTab === 'register' ? 'register' : 'login'}
          onSuccess={handleLoginSuccess}
          theme={theme}
          language={language}
          onCancel={() => setActiveTab(currentUser ? 'dashboard' : 'landing')}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#030712] text-slate-100' : 'bg-[#050B17] text-slate-200'
      }`}
    >
      {/* Left Sidebar (Desktop Fixed + Mobile Drawer) - rendered ONLY when logged in */}
      {currentUser && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          currentUser={currentUser}
          theme={theme}
          language={language}
        />
      )}

      {/* Main Content wrapper (offset on desktop by sidebar width: 245px only when authenticated) */}
      <div className={`flex-1 ${currentUser ? 'md:pl-[245px]' : ''} flex flex-col min-w-0 transition-all duration-200`}>
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          theme={theme}
          language={language}
          onToggleTheme={handleToggleTheme}
          onSelectLanguage={handleSelectLanguage}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenEmergencyModal={() => handleOpenEmergency('Manual user safety emergency request')}
          onOpenHelpModal={() => setIsHelpModalOpen(true)}
          onNavigate={(tab) => setActiveTab(tab)}
          onLogout={handleLogout}
        />

        {/* Main Application Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Global Prominent Safety Notice Banner (always shown except on login/register) */}
          {!isAuth && (
            <SafetyBanner
              onOpenEmergencyModal={() => handleOpenEmergency('Safety guidelines review')}
              language={language}
              theme={theme}
            />
          )}

          {/* 1. Landing Page (The unique pre-login landing experience) */}
          {activeTab === 'landing' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <LandingPage
                onNavigate={(tab) => setActiveTab(tab)}
                theme={theme}
                language={language}
                currentUser={currentUser}
              />
            </div>
          )}

          {/* 1b. Home Portal (Personalized post-login landing experience) */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <HomePage
                currentUser={currentUser}
                theme={theme}
                language={language}
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenEmergencyModal={() => handleOpenEmergency('Emergency guidance requested from patient home')}
              />
            </div>
          )}

          {/* 2. Main Dashboard Screen (Authenticated patient hub) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Main Dashboard Hero */}
              <WelcomeHero
                onNavigate={(tab) => setActiveTab(tab)}
                currentUser={currentUser}
                theme={theme}
                language={language}
              />

              {/* Quick Diagnostic Actions (4 Cards) */}
              <QuickActions
                onNavigate={(tab) => setActiveTab(tab)}
                theme={theme}
                language={language}
              />

              {/* Dashboard Statistics */}
              <StatsCards
                stats={stats}
                theme={theme}
                language={language}
              />

              {/* AI Agent Status & System Workflow */}
              <AIAgentStatus
                theme={theme}
                language={language}
              />

              {/* Privacy Notice Card */}
              <PrivacyNotice
                theme={theme}
                language={language}
              />
            </div>
          )}

          {/* 3. AI Health Chat */}
          {activeTab === 'chat' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <AIChat
                onOpenEmergencyModal={handleOpenEmergency}
                onIncrementQuestionCount={handleIncrementQuestionCount}
                theme={theme}
                language={language}
              />
            </div>
          )}

          {/* 4. Symptom Checker */}
          {activeTab === 'symptoms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <SymptomChecker
                onOpenEmergencyModal={handleOpenEmergency}
                onGuidanceGenerated={handleGuidanceGenerated}
              />
            </div>
          )}

          {/* 5. Report Analyzer (PDF/Images only, PPT restricted) */}
          {activeTab === 'reports' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <ReportAnalyzer
                onReportSaved={handleReportSaved}
                theme={theme}
                language={language}
              />
            </div>
          )}

          {/* 6. Medical Image Analysis (Vision) */}
          {activeTab === 'images' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <ImageAnalyzer
                theme={theme}
                language={language}
              />
            </div>
          )}

          {/* 7. Clinical Health Tips & Wellness */}
          {activeTab === 'healthtips' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <HealthTipsView
                theme={theme}
                language={language}
              />
            </div>
          )}

          {/* 8. Medical Terminology & Knowledge Base */}
          {activeTab === 'knowledge' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <KnowledgeBaseView
                theme={theme}
                language={language}
              />
            </div>
          )}

          {/* 9. Admin Portal (Restricted view for non-admins) */}
          {activeTab === 'admin' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <AdminPortal
                currentUser={currentUser}
                theme={theme}
                language={language}
                onSwitchToAdminRole={() => {
                  const adminUser: User = {
                    id: 'usr-admin-skillora',
                    name: 'Dr. Arthur Vance, MD (System Admin)',
                    email: 'skillora215@gmail.com',
                    role: 'admin',
                    patientId: 'CLIN-001-ADM',
                    joinedDate: 'Oct 04, 2025',
                  };
                  recordLoginSession(adminUser);
                  localStorage.setItem('aimed_user', JSON.stringify(adminUser));
                  setCurrentUser(adminUser);
                }}
                onNavigateHome={() => setActiveTab('dashboard')}
              />
            </div>
          )}

          {/* 10. Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <SettingsView />
            </div>
          )}
        </main>

        {/* Global Footer with Tagline: Responsible AI Medical Assistant */}
        <Footer
          onNavigate={(tab) => setActiveTab(tab)}
          onOpenEmergency={handleOpenEmergency}
          onOpenHelp={() => setIsHelpModalOpen(true)}
          theme={theme}
          language={language}
          currentUser={currentUser}
        />
      </div>

      {/* Emergency Red-Flag Warning Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        triggerReason={emergencyReason}
      />

      {/* Help & Educational Safety Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onOpenEmergency={() => {
          setIsHelpModalOpen(false);
          handleOpenEmergency('Emergency warning selected from help guide');
        }}
      />
    </div>
  );
}
