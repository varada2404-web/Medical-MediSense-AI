import React, { useState, useRef } from 'react';
import {
  ScanLine,
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ZoomIn,
  SunMedium,
  Info,
  XCircle,
} from 'lucide-react';
import { ImageAnalysisFinding, Theme, Language } from '../../types';
import { SAMPLE_IMAGE_ANALYSES } from '../../data/mockMedicalData';
import { getTranslation } from '../../utils/translations';

interface ImageAnalyzerProps {
  theme?: Theme;
  language?: Language;
}

export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const currentLang = (language as Language) || 'en';
  const t = (key: string) => getTranslation(currentLang, key);

  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    SAMPLE_IMAGE_ANALYSES[0].previewUrl
  );
  const [imageName, setImageName] = useState<string>(SAMPLE_IMAGE_ANALYSES[0].imageName);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisFinding | null>(
    SAMPLE_IMAGE_ANALYSES[0]
  );
  const [invertContrast, setInvertContrast] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [restrictionError, setRestrictionError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImageFile = (file: File): boolean => {
    const fileNameLower = file.name.toLowerCase();
    if (fileNameLower.endsWith('.ppt') || fileNameLower.endsWith('.pptx')) {
      setRestrictionError(
        'Format Restricted: Presentations (.ppt, .pptx) cannot be processed. Image vision inspection strictly accepts medical images (PNG, JPG, JPEG, WEBP).'
      );
      return false;
    }

    if (!file.type.startsWith('image/')) {
      setRestrictionError(
        'Format Restricted: Only medical images (.png, .jpg, .jpeg, .webp) are accepted in this vision inspection module.'
      );
      return false;
    }

    setRestrictionError(null);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!validateImageFile(file)) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setImageName(file.name);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateImageFile(file)) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setImageName(file.name);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: ImageAnalysisFinding) => {
    setRestrictionError(null);
    setSelectedImage(sample.previewUrl);
    setImageName(sample.imageName);
    setAnalysisResult(sample);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const isDerm =
        imageName.toLowerCase().includes('skin') ||
        imageName.toLowerCase().includes('mole') ||
        imageName.toLowerCase().includes('derm');

      const chosen = isDerm ? SAMPLE_IMAGE_ANALYSES[1] : SAMPLE_IMAGE_ANALYSES[0];
      setAnalysisResult({
        ...chosen,
        imageName: imageName,
        previewUrl: selectedImage || chosen.previewUrl,
        uploadDate: 'Just now',
      });
      setIsAnalyzing(false);
    }, 900);
  };

  return (
    <div
      id="image-analyzer-container"
      className={`rounded-2xl border p-5 sm:p-7 shadow-xs space-y-6 ${
        isDark ? 'bg-[#121a2d] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-[#0A369D] dark:text-cyan-300 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center shrink-0">
            <ScanLine className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              {t('imageAnalysis')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload a supported image (PNG, JPG, WEBP) for AI-assisted educational analysis
            </p>
          </div>
        </div>

        {/* Sample Selectors */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Samples:</span>
          <button
            onClick={() => handleSelectSample(SAMPLE_IMAGE_ANALYSES[0])}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              isDark ? 'bg-[#18233a] hover:bg-[#202e4d] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Chest X-Ray
          </button>
          <button
            onClick={() => handleSelectSample(SAMPLE_IMAGE_ANALYSES[1])}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              isDark ? 'bg-[#18233a] hover:bg-[#202e4d] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Skin Check
          </button>
        </div>
      </div>

      {/* Restriction Warning if file is invalid/ppt */}
      {restrictionError && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
          <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold uppercase tracking-wider text-xs text-amber-800 dark:text-amber-300">
              Format Restriction (Strict Policy)
            </div>
            <p className="leading-relaxed">{restrictionError}</p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div
        id="image-dropzone"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
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
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
        />

        <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-[#0A369D] dark:text-cyan-300 border border-blue-100 dark:border-blue-900 mx-auto flex items-center justify-center mb-2">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Drag &amp; Drop medical image (Radiographs, Skin photos, Scans)
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          or <span className="text-[#0A369D] dark:text-cyan-400 font-semibold underline">browse from your computer</span>
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Accepted: <strong>PNG, JPG, WEBP</strong>. (PPT and presentation files strictly restricted)
        </p>
      </div>

      {/* Image Preview & Controls */}
      {selectedImage && (
        <div
          className={`rounded-2xl p-4 sm:p-5 space-y-4 border ${
            isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{imageName}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Visual Inspection Viewport • High Resolution DICOM Emulation
              </p>
            </div>

            {/* Inspection Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInvertContrast(!invertContrast)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  invertContrast
                    ? 'bg-slate-900 text-white border-slate-900'
                    : isDark
                    ? 'bg-[#1f2c4a] text-slate-200 border-slate-600 hover:bg-[#28385d]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
                title="Invert Image Contrast"
              >
                <SunMedium className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Invert</span>
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel(zoomLevel === 1 ? 1.4 : 1)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                  isDark
                    ? 'bg-[#1f2c4a] text-slate-200 border-slate-600 hover:bg-[#28385d]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
                title="Toggle Magnification"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{zoomLevel === 1 ? '1x' : '1.4x'}</span>
              </button>

              <button
                id="analyze-medical-image-btn"
                type="button"
                disabled={isAnalyzing}
                onClick={handleAnalyze}
                className="px-4 py-2 bg-[#0A369D] hover:bg-[#082A7C] disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 ml-1"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Analyzing Vision Features...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze Image</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative rounded-xl overflow-hidden bg-black/95 flex items-center justify-center min-h-[260px] max-h-[420px]">
            <img
              src={selectedImage}
              alt="Medical preview"
              className={`max-h-[380px] w-auto object-contain transition-transform duration-200 ${
                invertContrast ? 'invert contrast-125' : ''
              }`}
              style={{ transform: `scale(${zoomLevel})` }}
            />

            <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
              R (Right)
            </div>
            <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
              L (Left)
            </div>
          </div>
        </div>
      )}

      {/* AI ANALYSIS RESULTS */}
      {analysisResult && (
        <div
          id="ai-image-analysis-results"
          className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-6 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A369D] dark:text-cyan-400">
                AI Vision Findings
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {analysisResult.title}
              </h4>
            </div>
            <span className="text-xs text-slate-400">
              Analyzed {analysisResult.uploadDate}
            </span>
          </div>

          {/* Section 1: Observations */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Visual Observations
            </h5>
            <div
              className={`rounded-xl p-4 space-y-2 border ${
                isDark ? 'bg-[#18233a] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {analysisResult.observations.map((obs, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <span className="text-[#0A369D] dark:text-cyan-400 font-bold">•</span>
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Possible Areas of Interest */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              2. Possible Areas of Interest
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysisResult.possibleAreasOfInterest.map((area, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                    isDark ? 'bg-[#18233a] border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-[#0A369D] dark:bg-cyan-400 shrink-0" />
                  <span className="font-semibold">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Explanation in Simple Language */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Explanation in Simple Language
            </h5>
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                isDark
                  ? 'bg-blue-950/20 border-blue-900/40 text-slate-200'
                  : 'bg-blue-50/40 border-blue-100 text-slate-800'
              }`}
            >
              {analysisResult.simpleExplanation}
            </div>
          </div>

          {/* Section 4: Recommended Next Step */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              4. Recommended Next Step
            </h5>
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 border ${
                isDark ? 'bg-[#18233a] border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{analysisResult.recommendedNextStep}</span>
            </div>
          </div>

          {/* Prominent Disclaimer */}
          <div
            id="image-analysis-disclaimer"
            className="p-4 bg-blue-50 dark:bg-blue-950/80 border-2 border-blue-300 dark:border-blue-800 rounded-xl flex items-start gap-3 text-blue-950 dark:text-blue-200"
          >
            <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                Critical Safety Disclaimer
              </h5>
              <p className="text-xs sm:text-sm font-semibold mt-0.5 leading-relaxed">
                &ldquo;{analysisResult.disclaimer}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
