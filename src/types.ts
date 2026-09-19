export type ActiveTab =
  | 'landing'
  | 'home'
  | 'dashboard'
  | 'chat'
  | 'symptoms'
  | 'reports'
  | 'images'
  | 'healthtips'
  | 'knowledge'
  | 'admin'
  | 'settings'
  | 'login'
  | 'register';

export type UserRole = 'admin' | 'patient' | 'doctor';

export type Theme = 'dark' | 'light';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'te' | 'ar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  patientId?: string;
  joinedDate?: string;
  bloodType?: string;
  avatar?: string;
}

export interface LoginSessionRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  patientId?: string;
  loginTimestamp: string;
  device: string;
  ipAddress: string;
  status: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  isEmergencyAlert?: boolean;
  isEmergencyWarning?: boolean;
  metadata?: {
    isEmergency?: boolean;
    category?: string;
    suggestedFollowUps?: string[];
    sources?: string[];
  };
}

export interface ConversationThread {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  category: string;
  messages: ChatMessage[];
}

export type DurationOption = 'Less than 1 day' | '1–3 days' | 'More than 3 days' | 'More than 1 week' | string;
export type SeverityOption = 'Mild' | 'Moderate' | 'Severe' | string;

export interface SymptomGuidanceResult {
  categoryName: string;
  isEmergencyTriggered: boolean;
  summary: string;
  selfCare: string[];
  whenToConsultDoctor: string[];
  redFlagWarnings: string[];
}

export interface AnalyzedReportValue {
  name: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical' | string;
  interpretation?: string;
}

export interface AnalyzedReportTerm {
  term: string;
  definition: string;
}

export interface AnalyzedReport {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  reportType: string;
  keyFindings: string[];
  values: AnalyzedReportValue[];
  importantTerms: AnalyzedReportTerm[];
  questionsForDoctor: string[];
}

export interface HealthTip {
  id: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  keyTakeaways: string[];
  clinicalReference: string;
  tags: string[];
}

export interface HistoryItem {
  id: string;
  type: 'chat' | 'symptom' | 'report' | 'image';
  title: string;
  summary: string;
  date: string;
}

export interface ImageAnalysisFinding {
  id: string;
  title: string;
  uploadDate: string;
  imageType?: string;
  sampleImageUrl?: string;
  previewUrl?: string;
  imageName?: string;
  observations: string[];
  possibleAreasOfInterest: string[];
  simpleExplanation: string;
  recommendedNextStep: string;
  disclaimer: string;
}
