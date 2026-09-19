import { User } from '../types';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  status: 'emergency_flagged' | 'restricted' | 'verified' | string;
  ipAddress: string;
}

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Dr. Arthur Vance, MD',
    email: 'skillora215@gmail.com',
    role: 'admin',
    patientId: 'CLIN-001-ADM',
    joinedDate: 'Oct 04, 2025',
    bloodType: 'O+',
  },
  {
    id: 'usr-2',
    name: 'Eleanor Davis',
    email: 'eleanor.davis@example.com',
    role: 'patient',
    patientId: 'PAT-4102',
    joinedDate: 'Sep 15, 2025',
    bloodType: 'A+',
  },
  {
    id: 'usr-3',
    name: 'Marcus Brody',
    email: 'marcus.brody@example.com',
    role: 'patient',
    patientId: 'PAT-6721',
    joinedDate: 'Sep 18, 2025',
    bloodType: 'B-',
  },
  {
    id: 'usr-4',
    name: 'Dr. Claire Nguyen',
    email: 'c.nguyen@hospital.org',
    role: 'doctor',
    patientId: 'DOC-1092',
    joinedDate: 'Aug 22, 2025',
    bloodType: 'AB+',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 10:15:02',
    userEmail: 'eleanor.davis@example.com',
    action: 'Query: Severe left chest tightness with breathlessness',
    status: 'emergency_flagged',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'log-2',
    timestamp: 'Today, 09:32:10',
    userEmail: 'marcus.brody@example.com',
    action: 'Upload Attempt: presentation_slides.pptx (Blocked by policy)',
    status: 'restricted',
    ipAddress: '172.56.12.89',
  },
  {
    id: 'log-3',
    timestamp: 'Yesterday, 16:45:20',
    userEmail: 'skillora215@gmail.com',
    action: 'Admin credential verify & compliance audit review',
    status: 'verified',
    ipAddress: '198.51.100.14',
  },
  {
    id: 'log-4',
    timestamp: 'Yesterday, 14:12:55',
    userEmail: 'eleanor.davis@example.com',
    action: 'Processed Lab Report: Comprehensive Metabolic Panel (PDF)',
    status: 'verified',
    ipAddress: '192.168.1.45',
  },
];

export const ADMIN_SYSTEM_METRICS = {
  totalUsers: 1420,
  queriesToday: 384,
  flaggedEmergencyAlerts: 19,
  guardrailCompliance: '99.98%',
  modelEngine: 'Gemini 2.5 Flash Multi-Modal',
  safetyProtocol: 'HIPAA & AMA Responsible AI Guidelines (Level 4 Safety)',
};
