import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Tag,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { Theme, Language } from '../../types';

interface KnowledgeBaseViewProps {
  theme?: Theme;
  language?: Language;
}

interface TermItem {
  id: string;
  term: string;
  category: string;
  pronunciation: string;
  plainDefinition: string;
  clinicalContext: string;
  normalRangeOrNote?: string;
}

const MEDICAL_TERMS: TermItem[] = [
  {
    id: 'term-1',
    term: 'Serum Creatinine',
    category: 'Laboratory / Renal',
    pronunciation: 'kree-AT-ih-neen',
    plainDefinition:
      'A waste byproduct of normal muscle wear and tear that is eliminated from the bloodstream by the kidneys.',
    clinicalContext:
      'Elevated creatinine levels may point to diminished kidney function, severe dehydration, or high muscle breakdown. Low values are seen in reduced muscle mass.',
    normalRangeOrNote: 'Standard adult baseline: 0.6 to 1.2 mg/dL',
  },
  {
    id: 'term-2',
    term: 'Erythrocyte Sedimentation Rate (ESR)',
    category: 'Laboratory / Hematology',
    pronunciation: 'ih-RITH-roh-syte sed-ih-men-TAY-shun',
    plainDefinition:
      'A blood test measuring how quickly red blood cells settle to the bottom of a tube in one hour.',
    clinicalContext:
      'A general indicator of systemic inflammation, often elevated in infections, autoimmune conditions (like rheumatoid arthritis), or chronic inflammatory states.',
    normalRangeOrNote: 'Men: < 15–20 mm/hr; Women: < 20–30 mm/hr',
  },
  {
    id: 'term-3',
    term: 'Hypertension',
    category: 'Cardiovascular',
    pronunciation: 'hy-per-TEN-shun',
    plainDefinition:
      'Persistently high pressure of circulating blood against the arterial vessel walls.',
    clinicalContext:
      'Often called the "silent killer" because it rarely causes symptoms in early stages. Left unmanaged, it increases risks of stroke, heart attack, and kidney failure.',
    normalRangeOrNote: 'Normal: < 120/80 mmHg; Stage 1: 130–139 / 80–89 mmHg',
  },
  {
    id: 'term-4',
    term: 'Alanine Aminotransferase (ALT)',
    category: 'Laboratory / Hepatic',
    pronunciation: 'AL-uh-neen uh-mee-noh-TRANS-fer-ace',
    plainDefinition:
      'An enzyme predominantly found inside liver cells that helps convert proteins into energy.',
    clinicalContext:
      'When liver tissue experiences inflammation or injury, ALT spills into the bloodstream, serving as a sensitive hepatic biomarker.',
    normalRangeOrNote: 'Typical reference interval: 7 to 56 U/L',
  },
  {
    id: 'term-5',
    term: 'Tachycardia',
    category: 'Cardiovascular',
    pronunciation: 'tak-ih-KAR-dee-uh',
    plainDefinition:
      'A resting heart rate exceeding 100 beats per minute in an adult.',
    clinicalContext:
      'Can be physiological (response to exercise, fever, caffeine, anxiety) or pathological (arrhythmias, hyperthyroidism, blood loss).',
    normalRangeOrNote: 'Normal resting pulse: 60 to 100 beats/min',
  },
  {
    id: 'term-6',
    term: 'Hemoglobin A1c (HbA1c)',
    category: 'Endocrinology',
    pronunciation: 'HEE-muh-gloh-bin ay-wun-see',
    plainDefinition:
      'A test reflecting average blood sugar levels over the preceding 2 to 3 months.',
    clinicalContext:
      'Measures the percentage of hemoglobin proteins coated with glucose. Key diagnostic and monitoring marker for pre-diabetes and diabetes mellitus.',
    normalRangeOrNote: 'Normal: < 5.7%; Pre-diabetes: 5.7–6.4%; Diabetes: ≥ 6.5%',
  },
];

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(MEDICAL_TERMS[0].id);

  const categories = [
    'all',
    'Laboratory / Renal',
    'Laboratory / Hematology',
    'Cardiovascular',
    'Laboratory / Hepatic',
    'Endocrinology',
  ];

  const filtered = MEDICAL_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plainDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clinicalContext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      id="knowledge-base-page"
      className="border border-blue-950 rounded-2xl bg-[#080D1A] p-6 shadow-xl space-y-6 text-white"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950/70 text-blue-400 border border-blue-900/60 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Medical Terminology &amp; Clinical Glossary
            </h3>
            <p className="text-xs text-slate-400">
              Evidence-based plain-language explanations of complex medical terms and lab tests
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-950/60 border border-blue-900/60 rounded-full text-blue-300 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Physician Reviewed</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medical terms, lab tests, or definitions..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#050811] border border-blue-900/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[#050811] text-slate-400 border border-blue-950 hover:border-blue-800 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Domains' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Accordion List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedTermId === item.id;
          return (
            <div
              key={item.id}
              className="border border-blue-950 rounded-xl bg-[#050811] overflow-hidden transition-colors hover:border-blue-900"
            >
              <button
                type="button"
                onClick={() => setExpandedTermId(isExpanded ? null : item.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{item.term}</h4>
                    <span className="text-[10px] text-blue-400 font-mono italic">
                      [{item.pronunciation}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/60">
                      {item.category}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isExpanded ? 'rotate-90 text-blue-400' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 space-y-3 border-t border-blue-950/60 text-xs">
                  <div className="space-y-1">
                    <div className="font-bold text-blue-300">Plain-Language Definition:</div>
                    <p className="text-slate-300 leading-relaxed">{item.plainDefinition}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-blue-300">Clinical Significance:</div>
                    <p className="text-slate-300 leading-relaxed">{item.clinicalContext}</p>
                  </div>

                  {item.normalRangeOrNote && (
                    <div className="p-3 bg-[#080D1A] rounded-lg border border-blue-950 flex items-center gap-2 text-slate-400">
                      <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{item.normalRangeOrNote}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
