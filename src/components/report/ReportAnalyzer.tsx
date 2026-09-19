import React, { useState, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Download,
  Printer,
  ChevronRight,
  AlertTriangle,
  XCircle,
  Volume2,
  VolumeX,
  Layers,
  Activity,
} from 'lucide-react';
import { AnalyzedReport, Theme, Language } from '../../types';
import { SAMPLE_REPORTS } from '../../data/mockMedicalData';
import { getTranslation } from '../../utils/translations';

interface ReportAnalyzerProps {
  onReportSaved?: (report: AnalyzedReport) => void;
  theme?: Theme;
  language?: Language;
}

export const ReportAnalyzer: React.FC<ReportAnalyzerProps> = ({
  onReportSaved,
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const currentLang = (language as Language) || 'en';
  const t = (key: string) => getTranslation(currentLang, key);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedReport, setAnalyzedReport] = useState<AnalyzedReport | null>(SAMPLE_REPORTS[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [fileRestrictionError, setFileRestrictionError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];

  // Audio speech synthesis for the clear explanation
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || !analyzedReport) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Construct clear spoken text
    const textToSpeak =
      currentLang === 'te'
        ? `ల్యాబ్ రిపోర్ట్ స్పష్టమైన వివరణ: ${analyzedReport.reportType}. ముఖ్యమైన ఫలితాలు: ${analyzedReport.keyFindings.join(
            '. '
          )}. దయచేసి అసాధారణ విలువల గురించి మీ వైద్యుడిని సంప్రదించండి.`
        : currentLang === 'hi'
        ? `लैब रिपोर्ट का स्पष्ट सारांश: ${analyzedReport.reportType}. मुख्य निष्कर्ष: ${analyzedReport.keyFindings.join(
            '. '
          )}. कृपया अपने डॉक्टर से परामर्श अवश्य लें।`
        : `Clear report analysis for ${analyzedReport.reportType}. Key findings: ${analyzedReport.keyFindings.join(
            '. '
          )}. Out of range values have been highlighted for your review with your physician.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const validateFile = (file: File): boolean => {
    const fileNameLower = file.name.toLowerCase();
    const isPPT =
      fileNameLower.endsWith('.ppt') ||
      fileNameLower.endsWith('.pptx') ||
      file.type.includes('presentation') ||
      file.type.includes('powerpoint');

    if (isPPT) {
      setFileRestrictionError(t('pptRestrictionError'));
      setSelectedFile(null);
      return false;
    }

    const isAccepted = allowedExtensions.some(
      (ext) => fileNameLower.endsWith(ext) || file.type.includes('pdf') || file.type.includes('image')
    );

    if (!isAccepted) {
      setFileRestrictionError(t('pptRestrictionError'));
      setSelectedFile(null);
      return false;
    }

    setFileRestrictionError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    setSelectedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type || 'Document/PDF',
    });

    setUploadProgress(15);
    setTimeout(() => setUploadProgress(65), 250);
    setTimeout(() => setUploadProgress(100), 500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const isLipid = selectedFile?.name.toLowerCase().includes('lipid');
      const chosen = isLipid ? SAMPLE_REPORTS[1] : SAMPLE_REPORTS[0];

      setAnalyzedReport({
        ...chosen,
        fileName: selectedFile?.name || chosen.fileName,
        fileType: selectedFile?.type || chosen.fileType,
        uploadDate: 'Just now',
      });
      setIsAnalyzing(false);
    }, 850);
  };

  const handleLoadSample = (index: number) => {
    setFileRestrictionError(null);
    const sample = SAMPLE_REPORTS[index];
    setSelectedFile({
      name: sample.fileName,
      size: '184.2 KB',
      type: sample.fileType,
    });
    setUploadProgress(100);
    setAnalyzedReport(sample);
  };

  const handleSaveReport = () => {
    if (analyzedReport) {
      onReportSaved?.(analyzedReport);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div
      id="medical-report-analyzer"
      className={`rounded-2xl border p-5 sm:p-7 shadow-xs space-y-6 ${
        isDark ? 'bg-[#121a2d] border-slate-800 text-slate-100' : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#172033]'
      }`}
    >
      {/* Header */}
      <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-[#0A369D] dark:text-cyan-300 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
              {t('reportAnalyzer')}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400">
              Upload a supported medical report (PDF or Image) to receive a simplified educational explanation
            </p>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Instant Samples:</span>
          <button
            onClick={() => handleLoadSample(0)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              isDark ? 'bg-[#18233a] hover:bg-[#202e4d] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Metabolic Panel (CMP)
          </button>
          <button
            onClick={() => handleLoadSample(1)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              isDark ? 'bg-[#18233a] hover:bg-[#202e4d] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Lipid Profile
          </button>
        </div>
      </div>

      {/* File Restriction Alert if user uploaded PPT or unallowed file */}
      {fileRestrictionError && (
        <div
          id="file-restriction-error-alert"
          className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/70 border-2 border-blue-300 dark:border-blue-800 text-blue-950 dark:text-blue-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in"
        >
          <XCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold uppercase tracking-wider text-xs text-blue-800 dark:text-blue-300">
              Format Restriction Active (Strict Policy)
            </div>
            <p className="leading-relaxed">{fileRestrictionError}</p>
            <p className="text-[11px] text-blue-700 dark:text-blue-400">
              Accepted formats: <strong>.PDF, .PNG, .JPG, .JPEG, .WEBP</strong>. Presentations (.ppt, .pptx) are restricted.
            </p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div className="space-y-4">
        <div
          id="report-dropzone"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-150 ${
            dragActive
              ? 'border-[#0A369D] bg-blue-50/50 dark:bg-blue-950/30'
              : isDark
              ? 'border-slate-700 hover:border-blue-500 hover:bg-[#18233a]/60'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#0A369D] dark:text-cyan-300 border border-blue-100 dark:border-blue-900 mx-auto flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Drag &amp; Drop your medical report here
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            or click to <span className="text-[#0A369D] dark:text-cyan-400 font-semibold underline">Choose File</span> from your device
          </p>
          <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-slate-400 flex-wrap">
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-700 dark:text-slate-300">
              PDF
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-700 dark:text-slate-300">
              PNG
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-700 dark:text-slate-300">
              JPG / JPEG
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              (PPT / PPTX restricted)
            </span>
          </div>
        </div>

        {/* Uploaded File Status & Progress */}
        {selectedFile && (
          <div
            id="report-file-status-card"
            className={`p-4 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-sm">
                    {selectedFile.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedFile.type} • {selectedFile.size}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="trigger-report-analysis-btn"
                  type="button"
                  disabled={isAnalyzing}
                  onClick={handleAnalyze}
                  className="px-4 py-2 bg-[#0A369D] hover:bg-[#082A7C] disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing Biomarkers...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analyze Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Upload &amp; OCR Parsing Progress</span>
                <span className="font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0A369D] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* REPORT SUMMARY SECTION */}
      {analyzedReport && (
        <div
          id="analyzed-report-summary-view"
          className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-6 animate-in fade-in duration-200"
        >
          {/* Header of Summary & File Verification */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border ${
              isDark
                ? 'bg-gradient-to-br from-blue-950/40 via-[#18233a] to-[#121a2d] border-blue-900/60'
                : 'bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border-blue-100'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>File Verified (PDF / Medical Image)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">OCR Confirmed</span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {analyzedReport.reportType}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Source Document: <span className="font-semibold text-slate-700 dark:text-slate-300">{analyzedReport.fileName}</span> • Processed {analyzedReport.uploadDate}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Audio Readout of Explanation */}
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                  isSpeaking
                    ? 'bg-[#0A369D] text-white border-[#0A369D] animate-pulse'
                    : isDark
                    ? 'bg-[#1e2a47] hover:bg-[#27385f] text-slate-100 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#0A369D]" />}
                <span>{isSpeaking ? t('stopSpeech') : t('speakExplanation')}</span>
              </button>

              {/* Save Report to Archive */}
              <button
                type="button"
                onClick={handleSaveReport}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs cursor-pointer border transition-colors ${
                  isDark
                    ? 'bg-[#18233a] hover:bg-[#202e4d] text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 ${savedSuccess ? 'text-emerald-600' : 'text-slate-400'}`}
                />
                <span>{savedSuccess ? 'Saved to Archive!' : 'Save Report'}</span>
              </button>
            </div>
          </div>

          {/* Section 1: What This Medical Test Examines */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0A369D]" />
              <span>1. {t('whatThisTestMeans')}</span>
            </h5>
            <div
              className={`rounded-xl p-4 text-xs sm:text-sm leading-relaxed border ${
                isDark ? 'bg-[#18233a] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {analyzedReport.reportType.includes('Metabolic') ? (
                <p>
                  A <strong>Comprehensive Metabolic Panel (CMP)</strong> is an essential blood assessment evaluating 14 key biomarkers. It gives your physician a clear physiological snapshot of kidney function (BUN &amp; Creatinine), liver enzyme status (ALT, AST, ALP), blood sugar regulation (Glucose), and fluid/electrolyte balance (Sodium, Potassium, Chloride).
                </p>
              ) : (
                <p>
                  A <strong>Fasting Lipid Panel</strong> measures circulating fatty substances in your bloodstream. It evaluates total cholesterol, high-density lipoproteins (HDL or "protective cholesterol"), low-density lipoproteins (LDL or "atherogenic cholesterol"), and triglycerides to quantify cardiovascular efficiency and vascular arterial health.
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Key Findings in Plain Language */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0A369D]" />
              <span>2. {t('keyFindingsPlain')}</span>
            </h5>
            <div
              className={`rounded-xl p-4 space-y-2.5 border ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50/70 border-slate-200/90'
              }`}
            >
              {analyzedReport.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <div className="w-2 h-2 rounded-full bg-[#0A369D] mt-1.5 shrink-0"></div>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Values Outside Reference Ranges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#0A369D]" />
                <span>3. {t('normalVsAbnormal')}</span>
              </h5>
              <span className="text-[11px] text-slate-400">
                Out-of-range flags marked clearly
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-[#18233a] text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Test Name</th>
                    <th className="p-3">Your Value</th>
                    <th className="p-3">Standard Reference</th>
                    <th className="p-3">Flag Status</th>
                    <th className="p-3">Educational Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {analyzedReport.values.map((val, idx) => {
                    const isAbnormal = val.status !== 'normal';
                    return (
                      <tr
                        key={idx}
                        className={
                          isAbnormal
                            ? 'bg-blue-50/40 dark:bg-blue-950/20'
                            : 'hover:bg-slate-50/40 dark:hover:bg-slate-800/40'
                        }
                      >
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{val.name}</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">
                          {val.value} {val.unit}
                        </td>
                        <td className="p-3 text-slate-500 dark:text-slate-400 font-mono">
                          {val.referenceRange} {val.unit}
                        </td>
                        <td className="p-3">
                          {val.status === 'normal' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                              Normal
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                              <AlertCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                              {val.status.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed">
                          {val.clinicalContext}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Why This Matters For Your Health */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>4. {t('clinicalSignificance')}</span>
            </h5>
            <div
              className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'bg-[#18233a] border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <p>
                Lab results are not isolated numbers; they serve as dynamic indicators of metabolic, renal, and vascular homeostasis. A single elevated biomarker (such as slightly elevated fasting glucose or serum creatinine) does not automatically confirm chronic disease; it often reflects temporary factors such as hydration status, recent intense exercise, or nutritional intake prior to phlebotomy.
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">
                Always review abnormal findings with your licensed healthcare provider to formulate a personalized lifestyle or treatment regimen.
              </p>
            </div>
          </div>

          {/* Section 5: Important Medical Terms */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              5. Important Medical Terms Explained
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {analyzedReport.importantTerms.map((tItem, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h6 className="text-xs font-bold text-slate-900 dark:text-white">{tItem.term}</h6>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tItem.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Questions for your Doctor */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#0A369D]" />
              <span>6. {t('questionsForDoctor')}</span>
            </h5>
            <div
              className={`p-4 rounded-xl border space-y-2.5 ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              {analyzedReport.questionsForDoctor.map((q, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-[#0A369D] dark:text-cyan-400 font-bold font-mono">Q{idx + 1}:</span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
