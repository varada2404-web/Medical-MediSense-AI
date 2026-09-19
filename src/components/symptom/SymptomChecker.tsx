import React, { useState } from 'react';
import {
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ShieldAlert,
  Info,
  Thermometer,
  Clock,
  Sparkles,
  PhoneCall,
  UserCheck,
} from 'lucide-react';
import { DurationOption, SeverityOption, SymptomGuidanceResult } from '../../types';
import { SYMPTOM_OPTIONS } from '../../data/mockMedicalData';

interface SymptomCheckerProps {
  onOpenEmergencyModal: (reason?: string) => void;
  onGuidanceGenerated?: (guidance: SymptomGuidanceResult) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  onOpenEmergencyModal,
  onGuidanceGenerated,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('1–3 days');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityOption>('Mild');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomGuidanceResult | null>(null);

  const durationChoices: DurationOption[] = [
    'Less than 1 day',
    '1–3 days',
    'More than 3 days',
    'More than 1 week',
  ];

  const severityChoices: { level: SeverityOption; desc: string; color: string }[] = [
    {
      level: 'Mild',
      desc: 'Noticeable discomfort, but does not interfere with daily activities or sleep.',
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
    },
    {
      level: 'Moderate',
      desc: 'Noticeably impacts routine tasks or focus; requires periods of rest.',
      color: 'border-amber-200 bg-amber-50/50 text-amber-900',
    },
    {
      level: 'Severe',
      desc: 'Incapacitating, severe pain or distress, unable to perform basic functions.',
      color: 'border-blue-300 bg-blue-50 text-blue-950',
    },
  ];

  const toggleSymptom = (id: string) => {
    const isEmergency = SYMPTOM_OPTIONS.find((s) => s.id === id)?.isEmergency;
    if (isEmergency && !selectedSymptoms.includes(id)) {
      onOpenEmergencyModal(`Selection of acute symptom: ${id.replace('_', ' ')}`);
    }

    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleRunGuidance = () => {
    setIsAnalyzing(true);

    const hasChestPain = selectedSymptoms.includes('chest_pain');
    const hasBreathing = selectedSymptoms.includes('breathing_difficulty');
    const hasSuddenWeakness = selectedSymptoms.includes('sudden_weakness');
    const isCritical = hasChestPain || hasBreathing || hasSuddenWeakness || selectedSeverity === 'Severe';

    setTimeout(() => {
      let guidance: SymptomGuidanceResult;

      if (isCritical) {
        guidance = {
          categoryName: 'Potential High-Acuity or Urgent Concern',
          isEmergencyTriggered: true,
          summary:
            'One or more of the selected parameters (such as chest symptoms, breathing distress, or severe intensity) warrant urgent, immediate medical evaluation by emergency professionals.',
          selfCare: [
            'Do not engage in strenuous physical movement.',
            'Sit in an upright, comfortable position to facilitate airflow.',
            'Have someone stay with you while contacting emergency medical assistance.',
          ],
          whenToConsultDoctor: [
            'Immediate emergency evaluation required — do not delay.',
            'Emergency Department or Urgent Care facility triage.',
          ],
          redFlagWarnings: [
            'Radiating chest discomfort to left arm, neck, or back.',
            'Inability to catch breath or blue discoloration of lips/fingertips.',
            'Sudden dizziness, confusion, or syncope (fainting).',
          ],
        };
      } else if (
        selectedSymptoms.includes('headache') &&
        (selectedSymptoms.includes('fever') || selectedSymptoms.includes('sore_throat'))
      ) {
        guidance = {
          categoryName: 'General Upper Respiratory or Viral-Type Pattern',
          isEmergencyTriggered: false,
          summary:
            'The symptom combination of headache with low-grade fever and throat irritation is commonly observed in uncomplicated upper respiratory viral processes or seasonal environmental exposures.',
          selfCare: [
            'Target 2 to 3 liters of fluids daily (water, warm herbal teas, broths).',
            'Prioritize 8–9 hours of restful sleep in a well-humidified room.',
            'Warm salt-water gargles for throat soothe (1/2 tsp salt in warm water).',
            'Over-the-counter pain relievers or fever reducers only under physician or pharmacist direction.',
          ],
          whenToConsultDoctor: [
            'Fever persistently higher than 102°F (38.9°C) or lasting longer than 72 hours.',
            'Symptoms continue to worsen after 3–5 days rather than improving.',
            'Difficulty swallowing liquids or keeping fluids down.',
          ],
          redFlagWarnings: [
            'Severe stiff neck with inability to touch chin to chest.',
            'Photophobia (extreme sensitivity to room light) accompanied by confusion.',
            'New unexplainable skin rash that does not blanch with pressure.',
          ],
        };
      } else if (selectedSymptoms.includes('stomach_pain') || selectedSymptoms.includes('nausea')) {
        guidance = {
          categoryName: 'Digestive / Gastrointestinal Discomfort Profile',
          isEmergencyTriggered: false,
          summary:
            'Gastrointestinal symptoms can stem from dietary sensitivities, mild gastroenteritis ("stomach bug"), or stress-related gut motility changes.',
          selfCare: [
            'Sip electrolyte drinks or diluted broths in small amounts.',
            'Follow a bland diet (toast, rice, bananas, applesauce) once appetite returns.',
            'Avoid greasy, spicy, acidic, or highly caffeinated foods.',
          ],
          whenToConsultDoctor: [
            'Persistent vomiting preventing hydration for over 24 hours.',
            'Localized, sharp pain in the lower right abdomen.',
            'Dark black or blood-streaked stools.',
          ],
          redFlagWarnings: [
            'Rigid, board-like abdomen tender to slight touch.',
            'High fever combined with severe focal abdominal pain.',
          ],
        };
      } else {
        guidance = {
          categoryName: 'General Mild Symptom Cluster',
          isEmergencyTriggered: false,
          summary:
            'Your reported symptoms reflect non-specific physical fatigue or mild physiological strain. A structured period of rest and tracking symptom progression is advised.',
          selfCare: [
            'Maintain regular sleep schedules and optimal hydration.',
            'Take breaks from prolonged visual screens and cognitive strain.',
            'Log the time of onset and any aggravating factors.',
          ],
          whenToConsultDoctor: [
            'Symptoms steadily escalate over 3 to 7 days.',
            'Discomfort begins interfering with your ability to eat or work.',
          ],
          redFlagWarnings: [
            'Sudden severe escalation or unmanageable pain.',
            'Neurological changes such as double vision or motor weakness.',
          ],
        };
      }

      setResult(guidance);
      setIsAnalyzing(false);
      setCurrentStep(4);
      onGuidanceGenerated?.(guidance);
    }, 850);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setCustomSymptom('');
    setSelectedDuration('1–3 days');
    setSelectedSeverity('Mild');
    setResult(null);
    setCurrentStep(1);
  };

  return (
    <div
      id="symptom-checker-module"
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden"
    >
      {/* Module Header */}
      <div className="p-5 sm:p-6 border-b border-[#E2E8F0] bg-gradient-to-r from-white to-blue-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A369D] border border-blue-200 flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Interactive Symptom Checker
            </h3>
            <p className="text-xs text-[#64748B]">
              Step-by-step educational guidance to understand physical symptoms
            </p>
          </div>
        </div>

        {/* Step progress pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                currentStep === stepNum
                  ? 'bg-[#0A369D] text-white shadow-2xs'
                  : currentStep > stepNum
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <span>{stepNum === 4 ? 'Guidance' : `Step ${stepNum}`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Body per Step */}
      <div className="p-5 sm:p-7">
        {/* STEP 1: Select Symptoms */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A369D]">
                Step 1 of 3
              </span>
              <h4 className="text-lg font-bold text-[#0F172A] mt-1">
                What symptoms are you experiencing?
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Select all that apply. Note: Critical symptoms trigger immediate safety warnings.
              </p>
            </div>

            {/* Grid of Symptoms */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {SYMPTOM_OPTIONS.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.id);
                return (
                  <button
                    key={sym.id}
                    id={`symptom-chip-${sym.id}`}
                    type="button"
                    onClick={() => toggleSymptom(sym.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? sym.isEmergency
                          ? 'bg-blue-100 border-blue-500 text-blue-950 ring-2 ring-blue-400'
                          : 'bg-blue-50 border-blue-300 text-[#0A369D] shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {sym.isEmergency && (
                        <AlertTriangle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                      {sym.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${sym.isEmergency ? 'text-blue-600' : 'text-[#0A369D]'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom symptom input */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Other symptom details (optional):
              </label>
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                placeholder="e.g. Mild lower back stiffness after exercise"
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0A369D] focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {selectedSymptoms.length} symptom{selectedSymptoms.length === 1 ? '' : 's'} selected
              </span>
              <button
                id="symptom-step1-next-btn"
                type="button"
                disabled={selectedSymptoms.length === 0 && !customSymptom.trim()}
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A369D] hover:bg-[#082A7C] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to Duration</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Duration */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A369D]">
                Step 2 of 3
              </span>
              <h4 className="text-lg font-bold text-[#0F172A] mt-1">
                How long have you had these symptoms?
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Duration assists in understanding whether the episode is acute or persistent.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {durationChoices.map((duration) => {
                const isSelected = selectedDuration === duration;
                return (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => setSelectedDuration(duration)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-300 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#0A369D]" />
                      <span className="text-sm font-bold">{duration}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-[#0A369D]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                id="symptom-step2-next-btn"
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A369D] hover:bg-[#082A7C] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to Severity</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Severity */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A369D]">
                Step 3 of 3
              </span>
              <h4 className="text-lg font-bold text-[#0F172A] mt-1">
                How severe is the discomfort?
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Rate the general severity level of your symptoms.
              </p>
            </div>

            <div className="space-y-3">
              {severityChoices.map((item) => {
                const isSelected = selectedSeverity === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => {
                      setSelectedSeverity(item.level);
                      if (item.level === 'Severe') {
                        onOpenEmergencyModal('Severe intensity symptom level chosen');
                      }
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? `${item.color} ring-2 ring-blue-400 shadow-xs font-medium`
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {item.level} Severity
                        </span>
                        {item.level === 'Severe' && (
                          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.2 rounded-full font-bold">
                            Safety Alert
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    {isSelected && <CheckCircle2 className={`w-5 h-5 shrink-0 ml-3 ${item.level === 'Severe' ? 'text-blue-600' : 'text-[#0A369D]'}`} />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1 px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                id="generate-symptom-guidance-btn"
                type="button"
                disabled={isAnalyzing}
                onClick={handleRunGuidance}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0A369D] hover:bg-[#082A7C] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Compiling Guidance...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Guidance</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Educational Guidance Result */}
        {currentStep === 4 && result && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Disclaimer pill */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between gap-3 text-xs text-[#0A369D]">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#0A369D] shrink-0" />
                <span className="font-semibold">
                  Educational guidance only. Never a definitive medical diagnosis.
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Check Again</span>
              </button>
            </div>

            {/* Emergency Notice if critical */}
            {result.isEmergencyTriggered && (
              <div className="p-4 bg-blue-700 text-white rounded-xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-300" />
                  <span>URGENT EVALUATION RECOMMENDED</span>
                </div>
                <p className="text-xs leading-relaxed text-blue-100">
                  Because critical symptoms were flagged, we strongly recommend contacting local
                  emergency care or going to an urgent triage center immediately.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenEmergencyModal('Critical red-flag symptom combinations')}
                  className="px-4 py-1.5 bg-white text-blue-800 font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  View Emergency Contacts
                </button>
              </div>
            )}

            {/* General category & summary */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#0A369D] px-2 py-0.5 rounded">
                  Clinical Assessment Category
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{result.categoryName}</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* 3 Result Sections: Self-care, When to consult doctor, Red-flag warnings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Self Care */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Self-Care Information</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {result.selfCare.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. When to consult doctor */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span>When to See a Doctor</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {result.whenToConsultDoctor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Red Flag Warnings */}
              <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-2xs space-y-2.5 bg-blue-50/20">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                  <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span>Emergency Warning Signs</span>
                </div>
                <ul className="space-y-1.5 text-xs text-blue-950">
                  {result.redFlagWarnings.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reset / Actions */}
            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start New Check</span>
              </button>

              <p className="text-[11px] text-slate-400">
                This log has been added to your Health History.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
