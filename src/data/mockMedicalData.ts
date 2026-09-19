import {
  AnalyzedReport,
  ConversationThread,
  HistoryItem,
  ImageAnalysisFinding,
} from '../types';

export const INITIAL_STATS = {
  healthQuestions: 14,
  reportsAnalyzed: 5,
  savedReports: 3,
  aiSessions: 12,
};

export const AI_AGENTS_DATA = [
  {
    id: 'agent-1',
    name: 'Clinical Dialogue Agent',
    role: 'Natural Conversational Triage',
    model: 'Gemini 2.5 Flash',
    responseTime: '180ms',
    status: 'Online',
  },
  {
    id: 'agent-2',
    name: 'Symptom Guardrail Triage',
    role: 'Red-Flag Interception & Safety',
    model: 'Clinical Rule Matrix v3',
    responseTime: '45ms',
    status: 'Operational',
  },
  {
    id: 'agent-3',
    name: 'Biomarker Extraction Engine',
    role: 'Lab Report OCR & Metric Parser',
    model: 'Vision Multi-Modal Parser',
    responseTime: '320ms',
    status: 'Active',
  },
  {
    id: 'agent-4',
    name: 'Medical Vision Inspector',
    role: 'Educational Dermatology & Radiography',
    model: 'Medical Visual QA v2',
    responseTime: '410ms',
    status: 'Ready',
  },
];

export const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    type: 'chat',
    title: 'Post-viral recovery hydration guidelines',
    summary: 'Reviewed fluid recommendations (2.5L/day), electrolyte replacement, and fever tracking protocols.',
    date: 'Today, 10:14 AM',
  },
  {
    id: 'hist-2',
    type: 'report',
    title: 'Comprehensive Metabolic Panel (CMP)',
    summary: 'Analyzed serum creatinine (1.1 mg/dL) and fasting blood glucose (98 mg/dL). Both within standard intervals.',
    date: 'Yesterday, 02:40 PM',
  },
  {
    id: 'hist-3',
    type: 'symptom',
    title: 'Tension Headache with Eye Strain',
    summary: 'Assessed mild severity symptom profile over 2 days. Suggested screen breaks and posture adjustments.',
    date: 'Sep 11, 2025',
  },
  {
    id: 'hist-4',
    type: 'image',
    title: 'Skin Irritation / Contact Rash',
    summary: 'Observed localized macular redness on forearm without signs of systemic infection or spreading warmth.',
    date: 'Sep 09, 2025',
  },
];

export const SYMPTOM_OPTIONS = [
  { id: 'fever', label: 'Fever / Chills', isEmergency: false },
  { id: 'headache', label: 'Headache', isEmergency: false },
  { id: 'chest_pain', label: 'Crushing Chest Pain / Pressure', isEmergency: true },
  { id: 'breathing_difficulty', label: 'Severe Shortness of Breath', isEmergency: true },
  { id: 'sudden_weakness', label: 'Sudden Facial Droop / Weakness (FAST)', isEmergency: true },
  { id: 'cough', label: 'Persistent Cough', isEmergency: false },
  { id: 'throat_irritation', label: 'Sore / Scratchy Throat', isEmergency: false },
  { id: 'stomach_pain', label: 'Abdominal Pain / Nausea', isEmergency: false },
  { id: 'dizziness', label: 'Dizziness / Lightheadedness', isEmergency: false },
  { id: 'fatigue', label: 'Generalized Fatigue / Weakness', isEmergency: false },
  { id: 'joint_pain', label: 'Joint / Muscle Aches', isEmergency: false },
  { id: 'skin_rash', label: 'Skin Rash or Hives', isEmergency: false },
];

export interface SampleImageAnalysis extends ImageAnalysisFinding {
  previewUrl: string;
  imageName: string;
}

export const SAMPLE_IMAGE_ANALYSES: SampleImageAnalysis[] = [
  {
    id: 'img-derm-01',
    title: 'Dermatological Lesion Inspection',
    imageName: 'erythema_multiforme_sample.png',
    previewUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    uploadDate: 'Sep 12, 2025',
    imageType: 'Dermatology / Skin',
    observations: [
      'Uniform pinkish macular boundary with no central ulceration.',
      'Symmetric margins measuring approximately 1.2 cm.',
      'No evidence of purulent discharge or secondary bacterial crusted lesions.',
    ],
    possibleAreasOfInterest: [
      'Superficial epidermal erythema',
      'Mild contact dermatitis pattern',
      'Non-blanching check recommended',
    ],
    simpleExplanation:
      'The uploaded image demonstrates a superficial, mild skin flare typical of benign contact irritation or localized allergic response. It does not exhibit classic red-flag signs of aggressive dermatological infection.',
    recommendedNextStep:
      'Avoid scratching, keep the area clean with mild soap, and observe for 48 hours. Consult a dermatologist if the margin spreads rapidly or causes fever.',
    disclaimer:
      'AI image analysis is experimental and purely educational. It is not an official dermatological biopsy or medical diagnosis. Always consult a certified physician for skin checks.',
  },
  {
    id: 'img-rad-02',
    title: 'Chest Radiograph educational reference',
    imageName: 'chest_xray_reference.png',
    previewUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
    uploadDate: 'Sep 08, 2025',
    imageType: 'Radiology / X-Ray',
    observations: [
      'Clear bilateral lung fields without focal consolidation or pneumothorax.',
      'Normal cardiothoracic ratio (< 0.50).',
      'Costophrenic angles sharp and distinct.',
    ],
    possibleAreasOfInterest: [
      'Tracheal alignment along midline',
      'Bilateral diaphragm contours',
      'Pulmonary vascular markings normal',
    ],
    simpleExplanation:
      'Educational scan overview exhibits clear lung aeration without visible infiltrates or pleural effusions.',
    recommendedNextStep:
      'Review formal radiologist report with your ordering physician.',
    disclaimer:
      'Radiological images require expert review by board-certified radiologists. This AI representation is strictly instructional.',
  },
];

export const SAMPLE_REPORTS: AnalyzedReport[] = [
  {
    id: 'rep-cmp-01',
    fileName: 'Comprehensive_Metabolic_Panel_CMP.pdf',
    fileType: 'application/pdf',
    uploadDate: 'Sep 10, 2025',
    reportType: 'Comprehensive Metabolic Panel (CMP)',
    keyFindings: [
      'Electrolyte levels (Sodium, Potassium, Chloride) are balanced within healthy ranges.',
      'Serum Creatinine (1.1 mg/dL) indicates normal kidney filtration capacity.',
      'Fasting Blood Glucose is optimal at 92 mg/dL.',
    ],
    values: [
      {
        name: 'Glucose (Fasting)',
        value: 92,
        unit: 'mg/dL',
        referenceRange: '70–99',
        status: 'normal',
        interpretation: 'Optimal fasting blood sugar level.',
      },
      {
        name: 'Serum Creatinine',
        value: 1.1,
        unit: 'mg/dL',
        referenceRange: '0.6–1.2',
        status: 'normal',
        interpretation: 'Normal renal excretion marker.',
      },
      {
        name: 'Potassium (K+)',
        value: 4.3,
        unit: 'mEq/L',
        referenceRange: '3.5–5.0',
        status: 'normal',
        interpretation: 'Cardiac rhythm stability within baseline.',
      },
      {
        name: 'ALT (Alanine Aminotransferase)',
        value: 24,
        unit: 'U/L',
        referenceRange: '7–56',
        status: 'normal',
        interpretation: 'Healthy liver enzyme activity.',
      },
    ],
    importantTerms: [
      {
        term: 'Glomerular Filtration',
        definition: 'The rate at which the kidneys filter blood to eliminate waste products into urine.',
      },
      {
        term: 'Serum Electrolytes',
        definition: 'Essential minerals that carry an electric charge, regulating fluid balance and heart beats.',
      },
    ],
    questionsForDoctor: [
      'Are my electrolyte and hydration levels sufficient for regular cardiovascular exercise?',
      'When should my next routine metabolic panel be scheduled?',
    ],
  },
  {
    id: 'rep-lipid-02',
    fileName: 'Lipid_Panel_Cardiovascular.pdf',
    fileType: 'application/pdf',
    uploadDate: 'Sep 05, 2025',
    reportType: 'Lipid Profile & Cholesterol Assessment',
    keyFindings: [
      'Total Cholesterol is mildly elevated at 208 mg/dL (target < 200 mg/dL).',
      'HDL ("Good") Cholesterol is favorable at 58 mg/dL.',
      'Triglycerides are well managed at 135 mg/dL.',
    ],
    values: [
      {
        name: 'Total Cholesterol',
        value: 208,
        unit: 'mg/dL',
        referenceRange: '< 200',
        status: 'high',
        interpretation: 'Borderline elevated; discuss dietary fiber and physical activity.',
      },
      {
        name: 'HDL Cholesterol',
        value: 58,
        unit: 'mg/dL',
        referenceRange: '> 40',
        status: 'normal',
        interpretation: 'Protective lipid level.',
      },
      {
        name: 'LDL Cholesterol',
        value: 122,
        unit: 'mg/dL',
        referenceRange: '< 100',
        status: 'high',
        interpretation: 'Borderline high; lifestyle interventions often recommended.',
      },
      {
        name: 'Triglycerides',
        value: 135,
        unit: 'mg/dL',
        referenceRange: '< 150',
        status: 'normal',
        interpretation: 'Within normal limits.',
      },
    ],
    importantTerms: [
      {
        term: 'HDL vs LDL',
        definition: 'HDL removes excess cholesterol to the liver, while high LDL can lead to arterial plaque buildup.',
      },
      {
        term: 'Triglycerides',
        definition: 'A type of fat stored in fat cells used for energy between meals.',
      },
    ],
    questionsForDoctor: [
      'Do my borderline cholesterol numbers require medication or just dietary adjustments?',
      'Would scheduling an exercise stress test or coronary calcium scan be beneficial?',
    ],
  },
];

export const INITIAL_CONVERSATIONS: ConversationThread[] = [
  {
    id: 'conv-01',
    title: 'Routine Health Inquiries',
    preview: 'Guidance on hydration, physical rest, and recovery...',
    timestamp: 'Today',
    category: 'General',
    messages: [
      {
        id: 'msg-01',
        sender: 'ai',
        text: 'Hello, I am your **AI Health Assistant**. You can ask me general health questions, inquire about symptoms, or ask for clarifications on medical terminology.\n\n*Please note: I provide educational information only and cannot diagnose diseases or prescribe medication. In an emergency, please call 911 or local emergency services immediately.*',
        timestamp: '10:00 AM',
        metadata: {
          suggestedFollowUps: [
            'What symptoms warrant an urgent care visit?',
            'How to interpret basic blood test results?',
            'Ways to improve daily sleep hygiene',
          ],
        },
      },
    ],
  },
];
