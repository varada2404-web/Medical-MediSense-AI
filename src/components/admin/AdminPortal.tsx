import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  AlertTriangle,
  Server,
  Lock,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Sliders,
  RefreshCw,
  LogOut,
  UserCheck,
  Zap,
  Mail,
  KeyRound,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Clock,
  Laptop,
  Globe,
  Check,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { User, Theme, Language, LoginSessionRecord } from '../../types';
import { INITIAL_USERS, INITIAL_AUDIT_LOGS, ADMIN_SYSTEM_METRICS } from '../../data/adminData';
import { getLoginSessions, recordLoginSession, clearLoginSessions } from '../../utils/loginTracker';

interface AdminPortalProps {
  currentUser: User | null;
  onSwitchToAdmin?: () => void;
  onSwitchToAdminRole?: () => void;
  onNavigateHome?: () => void;
  theme: Theme;
  language: Language;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  onSwitchToAdmin,
  onSwitchToAdminRole,
  onNavigateHome,
  theme,
  language,
}) => {
  const isDark = theme === 'dark';
  const isAdmin = currentUser?.role === 'admin';

  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [activeTab, setActiveTab] = useState<'logins' | 'metrics' | 'logs' | 'users' | 'guardrails'>('logins');
  const [searchQuery, setSearchQuery] = useState('');

  // Login sessions state (who logged in)
  const [loginSessions, setLoginSessions] = useState<LoginSessionRecord[]>(() => getLoginSessions());
  const [loginRoleFilter, setLoginRoleFilter] = useState<'all' | 'admin' | 'patient'>('all');
  const [loginSearchQuery, setLoginSearchQuery] = useState('');

  // Admin verification credentials state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sync login sessions on mount and when admin views it
  useEffect(() => {
    setLoginSessions(getLoginSessions());
  }, [isAdmin]);

  // Guardrail states
  const [strictRedFlagTriage, setStrictRedFlagTriage] = useState(true);
  const [blockPptUploads, setBlockPptUploads] = useState(true);
  const [hipaaMasking, setHipaaMasking] = useState(true);

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const emailInput = adminEmail.trim().toLowerCase();
    if (emailInput === 'skillora215@gmail.com' && adminPassword === 'skillora@2006') {
      const adminUser: User = {
        id: 'usr-admin-skillora',
        name: 'Dr. Arthur Vance, MD (System Admin)',
        email: 'skillora215@gmail.com',
        role: 'admin',
        patientId: 'CLIN-001-ADM',
        joinedDate: 'Oct 04, 2025',
      };
      recordLoginSession(adminUser);
      setLoginSessions(getLoginSessions());

      if (onSwitchToAdminRole) {
        onSwitchToAdminRole();
      } else if (onSwitchToAdmin) {
        onSwitchToAdmin();
      }
    } else {
      setAuthError(
        language === 'te'
          ? 'చెల్లని అడ్మిన్ ఆధారాలు (Invalid Credentials). అడ్మిన్ పోర్టల్ కోసం సరైన ఈమెయిల్ మరియు పాస్‌వర్డ్ నమోదు చేయండి.'
          : 'Invalid Admin credentials. Access denied. Only authorized administrator email and password are accepted.'
      );
    }
  };

  const handleFillAuthorized = () => {
    setAdminEmail('skillora215@gmail.com');
    setAdminPassword('skillora@2006');
    setAuthError(null);
  };

  // If user is not admin, show Restricted Access screen with strict verification form (ONLY email and password):
  if (!isAdmin) {
    return (
      <div
        id="admin-access-denied-view"
        className="relative min-h-[80vh] flex items-center justify-center p-4 sm:p-6 overflow-hidden rounded-3xl"
      >
        {/* Background Medical Doctor Visual Backdrop */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1800&q=80"
            alt="Clinical Hospital Care"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Clean Admin Verification Card */}
        <div
          className={`relative z-10 w-full max-w-lg rounded-3xl border p-6 sm:p-8 space-y-6 text-left shadow-2xl backdrop-blur-md ${
            isDark
              ? 'bg-[#0f172a]/95 border-slate-700 text-slate-100 shadow-slate-950/60'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50'
          }`}
        >
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#0A369D] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0A369D] dark:text-cyan-400 block">
                Security Clearance Required
              </span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Clinical Administrator Portal
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {language === 'te'
              ? 'ఈ పోర్టల్ సిస్టమ్ టెలిమెట్రీ, ఎమర్జెన్సీ లాగ్‌లు మరియు భద్రతా నియంత్రణలను కలిగి ఉంటుంది. అడ్మిన్ ఈమెయిల్ మరియు పాస్‌వర్డ్ మాత్రమే నమోదు చేసి లాగిన్ అవ్వండి.'
              : 'The Admin Portal contains sensitive system telemetry, emergency triage audit logs, and clinical guardrail controls. Provide authorized administrator email and password.'}
          </p>

          {authError && (
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminVerify} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="skillora215@gmail.com"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-[#0A369D] transition-colors ${
                    isDark
                      ? 'bg-[#18233a] border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-[#0A369D] transition-colors ${
                    isDark
                      ? 'bg-[#18233a] border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  aria-label={showAdminPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5 transition-colors"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-4 bg-[#0A369D] hover:bg-[#082b7c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify &amp; Access Admin Portal</span>
              </button>

              {onNavigateHome && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto py-3 px-4 bg-slate-100 dark:bg-[#1a253f] hover:bg-slate-200 dark:hover:bg-[#233153] text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Return
                </button>
              )}
            </div>
          </form>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Authorized: skillora215@gmail.com</span>
            <button
              type="button"
              onClick={handleFillAuthorized}
              className="text-[#0284C7] dark:text-cyan-400 hover:underline font-bold cursor-pointer"
            >
              1-Click Fill Authorized
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="admin-portal-dashboard"
      className={`rounded-2xl border p-5 sm:p-7 shadow-xs space-y-6 ${
        isDark ? 'bg-[#121a2d] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A369D] text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold">Clinical Administration Portal</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#0A369D] dark:text-cyan-300 border border-blue-200 dark:border-blue-900/60">
                Verified Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              System Telemetry, Login Activity, Red-Flag Triage Audit Trails &amp; Safety Guardrails
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Active Administrator: <strong className="text-slate-800 dark:text-slate-200">{currentUser.name}</strong>
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'logins', label: 'Who Logged In (Live)', icon: Clock },
          { id: 'metrics', label: 'System Telemetry', icon: Activity },
          { id: 'logs', label: 'Safety & Audit Logs', icon: FileText },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'guardrails', label: 'Guardrail Policies', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0A369D] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1a253f]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 0: WHO LOGGED IN (LIVE SESSIONS) */}
      {activeTab === 'logins' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                User Authentication &amp; Access Sessions
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time tracking of patients and administrators who signed in.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Role filter */}
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#18233a] p-0.5 text-xs">
                {(['all', 'admin', 'patient'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setLoginRoleFilter(r)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                      loginRoleFilter === r
                        ? 'bg-white dark:bg-[#0A369D] text-[#0A369D] dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-48 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={loginSearchQuery}
                  onChange={(e) => setLoginSearchQuery(e.target.value)}
                  placeholder="Filter sessions..."
                  className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none ${
                    isDark ? 'bg-[#18233a] border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#18233a] text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Login Time</th>
                  <th className="p-3">Device / Browser</th>
                  <th className="p-3">IP / Gateway</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {loginSessions
                  .filter((s) => {
                    const matchesRole = loginRoleFilter === 'all' || s.role === loginRoleFilter;
                    const matchesSearch =
                      !loginSearchQuery ||
                      s.name.toLowerCase().includes(loginSearchQuery.toLowerCase()) ||
                      s.email.toLowerCase().includes(loginSearchQuery.toLowerCase()) ||
                      (s.patientId && s.patientId.toLowerCase().includes(loginSearchQuery.toLowerCase()));
                    return matchesRole && matchesSearch;
                  })
                  .map((session) => (
                    <tr key={session.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3">
                        <div className="font-bold text-slate-900 dark:text-white">{session.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{session.email}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            session.role === 'admin'
                              ? 'bg-blue-100 dark:bg-blue-950 text-[#0A369D] dark:text-cyan-300 border border-blue-200 dark:border-blue-900'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {session.role}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-500">{session.loginTimestamp}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{session.device}</td>
                      <td className="p-3 font-mono text-slate-400">{session.ipAddress}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 1: SYSTEM METRICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Patients
                </span>
                <Users className="w-4 h-4 text-[#0A369D] dark:text-cyan-400" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-1">
                {ADMIN_SYSTEM_METRICS.totalUsers.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">+18 new today</span>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Clinical Inquiries Today
                </span>
                <Activity className="w-4 h-4 text-[#0A369D] dark:text-cyan-400" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-1">
                {ADMIN_SYSTEM_METRICS.queriesToday}
              </div>
              <span className="text-[11px] text-slate-500">Avg 240ms response</span>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-blue-50/50 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Emergency Red-Flags
                </span>
                <AlertTriangle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-1 text-blue-600">
                {ADMIN_SYSTEM_METRICS.flaggedEmergencyAlerts}
              </div>
              <span className="text-[11px] text-blue-700 font-semibold">Triage popups triggered</span>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Guardrail Health
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold mt-1 text-emerald-600">
                {ADMIN_SYSTEM_METRICS.guardrailCompliance}
              </div>
              <span className="text-[11px] text-slate-500">Zero non-diagnostic leaks</span>
            </div>
          </div>

          {/* Engine Status Details */}
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Runtime Infrastructure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Model Engine:</span>
                <span className="font-bold">{ADMIN_SYSTEM_METRICS.modelEngine}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Compliance Framework:</span>
                <span className="font-bold">{ADMIN_SYSTEM_METRICS.safetyProtocol}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">File Ingestion Policy:</span>
                <span className="font-bold text-[#0A369D] dark:text-cyan-400">Strict PDF &amp; Images only (PPT Restricted)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Speech Integration:</span>
                <span className="font-bold text-emerald-600">Web Speech STT / TTS Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Clinical Action &amp; Safety Audit Trails
            </h4>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail..."
                className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none ${
                  isDark ? 'bg-[#18233a] border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#18233a] text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User / Session</th>
                  <th className="p-3">Clinical Action</th>
                  <th className="p-3">Security Triage Status</th>
                  <th className="p-3">Client IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="p-3 font-semibold">{log.userEmail}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">{log.action}</td>
                    <td className="p-3">
                      {log.status === 'emergency_flagged' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          Emergency Flagged
                        </span>
                      )}
                      {log.status === 'restricted' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          File Restricted
                        </span>
                      )}
                      {log.status === 'allowed' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Allowed
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: USER DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Registered Patient &amp; Clinician Profiles
            </h4>
            <span className="text-xs text-slate-400">{usersList.length} Active Records</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usersList.map((usr) => (
              <div
                key={usr.id}
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-[#0A369D] dark:text-cyan-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                  {usr.name.charAt(0)}
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold truncate">{usr.name}</h5>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        usr.role === 'admin'
                          ? 'bg-[#0A369D] text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {usr.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{usr.email}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                    <span>ID: {usr.patientId}</span>
                    {usr.bloodType && <span>Blood: {usr.bloodType}</span>}
                    <span>Joined: {usr.joinedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: GUARDRAILS & RESTRICTIONS CONFIG */}
      {activeTab === 'guardrails' && (
        <div className="space-y-4 max-w-3xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Clinical Safety &amp; Policy Controls
          </h4>

          <div className="space-y-3 text-xs">
            <label
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span className="font-bold block text-sm">
                  Strict File Upload Enforcement (PDF &amp; Images Only)
                </span>
                <span className="text-slate-500">
                  Strictly rejects presentation files (.ppt, .pptx), spreadsheets, and unapproved documents at ingestion.
                </span>
              </div>
              <input
                type="checkbox"
                checked={blockPptUploads}
                onChange={(e) => setBlockPptUploads(e.target.checked)}
                className="w-4 h-4 accent-[#0A369D] rounded"
              />
            </label>

            <label
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span className="font-bold block text-sm">
                  Automatic Red-Flag Emergency Triage Trigger
                </span>
                <span className="text-slate-500">
                  Interrupts consultation with emergency 911 / 112 overlay when critical symptoms appear.
                </span>
              </div>
              <input
                type="checkbox"
                checked={strictRedFlagTriage}
                onChange={(e) => setStrictRedFlagTriage(e.target.checked)}
                className="w-4 h-4 accent-[#0A369D] rounded"
              />
            </label>

            <label
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span className="font-bold block text-sm">
                  Non-Diagnostic Educational Policy Lock
                </span>
                <span className="text-slate-500">
                  Immutable core system instruction forbidding AI from issuing definitive disease diagnosis.
                </span>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 accent-[#0A369D] rounded opacity-70 cursor-not-allowed"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
