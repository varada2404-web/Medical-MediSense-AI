import { User, LoginSessionRecord } from '../types';

const STORAGE_KEY = 'aimed_login_sessions';

const INITIAL_SESSIONS: LoginSessionRecord[] = [
  {
    id: 'sess-001',
    name: 'Dr. Arthur Vance, MD',
    email: 'skillora215@gmail.com',
    role: 'admin',
    patientId: 'CLIN-001-ADM',
    loginTimestamp: 'Today, 09:42 AM',
    device: 'Desktop Chrome / macOS',
    ipAddress: '192.168.1.45',
    status: 'Active Session',
  },
  {
    id: 'sess-002',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'patient',
    patientId: 'PAT-8821',
    loginTimestamp: 'Yesterday, 04:15 PM',
    device: 'Mobile Safari / iOS 17',
    ipAddress: '172.56.21.80',
    status: 'Completed',
  },
  {
    id: 'sess-003',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    role: 'patient',
    patientId: 'PAT-9034',
    loginTimestamp: 'Sep 11, 11:30 AM',
    device: 'Desktop Firefox / Windows 11',
    ipAddress: '198.51.100.24',
    status: 'Completed',
  },
];

export function getLoginSessions(): LoginSessionRecord[] {
  if (typeof window === 'undefined') return INITIAL_SESSIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SESSIONS));
      return INITIAL_SESSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SESSIONS;
  }
}

export function recordLoginSession(user: User): LoginSessionRecord {
  const newRecord: LoginSessionRecord = {
    id: `sess-${Date.now()}`,
    name: user.name,
    email: user.email,
    role: user.role,
    patientId: user.patientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
    loginTimestamp: 'Just now',
    device: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 32) : 'Web Client',
    ipAddress: '192.168.1.102',
    status: 'Active Session',
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getLoginSessions();
      const updated = [newRecord, ...current].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  return newRecord;
}

export function clearLoginSessions(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
