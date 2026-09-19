import React, { useState, useMemo } from 'react';
import {
  Lightbulb,
  Search,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { HealthTip, Theme, Language } from '../../types';
import { HEALTH_TIPS_DATA } from '../../data/healthTipsData';
import { VoiceService } from '../../utils/speech';

interface HealthTipsViewProps {
  theme: Theme;
  language: Language;
}

export const HealthTipsView: React.FC<HealthTipsViewProps> = ({ theme, language }) => {
  const isDark = theme === 'dark';
  const [tips] = useState<HealthTip[]>(HEALTH_TIPS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingTipId, setSpeakingTipId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Dynamically extract all unique categories (20+ categories)
  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(HEALTH_TIPS_DATA.map((t) => t.category))).sort();
    return ['all', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return tips.filter((tip) => {
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tip.title.toLowerCase().includes(q) ||
        tip.summary.toLowerCase().includes(q) ||
        tip.category.toLowerCase().includes(q) ||
        tip.clinicalReference.toLowerCase().includes(q) ||
        tip.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [tips, selectedCategory, searchQuery]);

  const handleSpeakTip = (tip: HealthTip) => {
    if (speakingTipId === tip.id) {
      VoiceService.stopSpeaking();
      setSpeakingTipId(null);
      return;
    }

    const textToRead = `${tip.title}. Summary: ${tip.summary}. Key clinical takeaways: ${tip.keyTakeaways.join('. ')}. Clinical standard reference: ${tip.clinicalReference}.`;
    VoiceService.speak(
      textToRead,
      () => setSpeakingTipId(null),
      language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US'
    );
    setSpeakingTipId(tip.id);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div
      id="health-tips-view"
      className="rounded-3xl border border-blue-950/80 bg-[#080D1A] p-5 sm:p-8 shadow-2xl space-y-6 text-white text-left"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-950">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/10">
            <Lightbulb className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Clinical Health Tips &amp; Preventive Medicine
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                24 Specialized Categories
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Evidence-based preventive guidelines, physiological health literacy, and clinical benchmarks from leading medical authorities.
            </p>
          </div>
        </div>

        {/* Category Stats Indicator */}
        <div className="flex items-center gap-2 self-start md:self-center px-3.5 py-2 rounded-xl bg-[#050811] border border-blue-950 text-xs text-slate-300 shrink-0">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Showing <strong>{filtered.length}</strong> of <strong>{tips.length}</strong> guides</span>
        </div>
      </div>

      {/* Controls: Search and Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 24 categories (e.g., blood pressure, kidneys, sleep, cortisol)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-950 bg-[#050811] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Quick Dropdown for faster selection among 24 categories */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-blue-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-blue-950 bg-[#050811] text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All 24 Categories ({tips.length} tips)</option>
              {allCategories.filter((c) => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Horizontal Pill Bar of Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar text-xs">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-[#050811] text-slate-400 border-blue-950 hover:border-blue-800 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? `All Categories (${tips.length})` : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Health Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-16 rounded-2xl border border-dashed border-blue-950 bg-[#050811] text-slate-400 space-y-2">
            <Lightbulb className="w-10 h-10 mx-auto text-blue-500/50" />
            <p className="text-sm font-bold text-white">No health tips matched your search query</p>
            <p className="text-xs text-slate-500">Try searching for different terms or reset your category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((tip) => {
            const isSpeaking = speakingTipId === tip.id;
            const isBookmarked = bookmarkedIds.includes(tip.id);

            return (
              <div
                key={tip.id}
                className="p-5 sm:p-6 rounded-2xl border border-blue-950/80 bg-[#050811] hover:border-blue-500/60 transition-all duration-200 shadow-xl flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3.5">
                  {/* Category Pill & Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-950/90 text-blue-300 border border-blue-800/80">
                      {tip.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">{tip.readTime}</span>
                      <button
                        type="button"
                        onClick={() => handleSpeakTip(tip)}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isSpeaking
                            ? 'bg-blue-600 text-white border-blue-500 animate-pulse'
                            : 'bg-[#080D1A] text-slate-300 border-blue-950 hover:border-blue-700 hover:text-white'
                        }`}
                        title={isSpeaking ? 'Stop reading' : 'Listen aloud'}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-white" />
                            <span className="text-[10px]">Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[10px]">Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {tip.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {tip.summary}
                    </p>
                  </div>

                  {/* Key Takeaways Box */}
                  <div className="p-3.5 rounded-xl border border-blue-950 bg-[#080D1A] space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 block">
                      Evidence-Based Clinical Protocol:
                    </span>
                    <ul className="space-y-1.5">
                      {tip.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Clinical Reference & Tags */}
                <div className="pt-3 border-t border-blue-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate font-medium">{tip.clinicalReference}</span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap">
                    {tip.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-300 border border-blue-900/50 text-[10px] font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
