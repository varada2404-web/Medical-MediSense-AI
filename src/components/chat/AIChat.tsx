import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  ShieldAlert,
  Bot,
  User,
  PlusCircle,
  MessageSquare,
  AlertTriangle,
  Clock,
  Sparkles,
  Info,
  Check,
  Copy,
  Trash2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { ChatMessage, ConversationThread, Theme, Language } from '../../types';
import { INITIAL_CONVERSATIONS } from '../../data/mockMedicalData';
import { VoiceService } from '../../utils/speech';
import { getTranslation } from '../../utils/translations';

interface AIChatProps {
  onOpenEmergencyModal: (reason?: string) => void;
  onIncrementQuestionCount?: () => void;
  theme?: Theme;
  language?: Language;
}

export const AIChat: React.FC<AIChatProps> = ({
  onOpenEmergencyModal,
  onIncrementQuestionCount,
  theme = 'light',
  language = 'en',
}) => {
  const isDark = theme === 'dark';
  const currentLang = (language as Language) || 'en';
  const t = (key: string) => getTranslation(currentLang, key);

  const [threads, setThreads] = useState<ConversationThread[]>(INITIAL_CONVERSATIONS);
  const [activeThreadId, setActiveThreadId] = useState<string>('conv-1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Voice Interaction State
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const stopListeningRef = useRef<(() => void) | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.messages, isTyping]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      VoiceService.stopSpeaking();
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
    };
  }, []);

  const quickPrompts = [
    'I have a headache and mild fever. What could be the reason?',
    'What does LDL cholesterol mean on a lipid panel?',
    'What are normal resting heart rate ranges for adults?',
    'How much water should I drink when recovering from a cold?',
  ];

  const handleStartNewConsultation = () => {
    const newId = `conv-${Date.now()}`;
    const newThread: ConversationThread = {
      id: newId,
      title: 'New Consultation',
      preview: 'Start asking a health inquiry...',
      timestamp: 'Just now',
      category: 'General',
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: 'ai',
          text: 'Hello, I am your **AI Health Assistant**. You can ask me general health questions, inquire about symptoms, or ask for clarifications on medical terminology.\n\n*Please note: I provide educational information only and cannot diagnose diseases or prescribe medication. In an emergency, please call 911 or local emergency services immediately.*',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metadata: {
            suggestedFollowUps: [
              'What symptoms warrant an urgent care visit?',
              'How to interpret basic blood test results?',
              'Ways to improve daily sleep hygiene',
            ],
          },
        },
      ],
    };

    setThreads([newThread, ...threads]);
    setActiveThreadId(newId);
  };

  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (stopListeningRef.current) {
        stopListeningRef.current();
        stopListeningRef.current = null;
      }
      VoiceService.stopListening();
      setIsListening(false);
      return;
    }

    const langCode =
      language === 'es'
        ? 'es-ES'
        : language === 'fr'
        ? 'fr-FR'
        : language === 'de'
        ? 'de-DE'
        : language === 'hi'
        ? 'hi-IN'
        : language === 'te'
        ? 'te-IN'
        : language === 'ar'
        ? 'ar-SA'
        : 'en-US';

    const stopFn = VoiceService.startListening(
      (transcript) => {
        setInputText((prev) => (prev ? prev + ' ' + transcript : transcript));
      },
      (error) => {
        console.warn('Voice input notice:', error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      },
      langCode
    );

    stopListeningRef.current = stopFn;
    setIsListening(true);
  };

  const handleToggleSpeechOutput = (messageId: string, text: string) => {
    if (speakingMessageId === messageId) {
      VoiceService.stopSpeaking();
      setSpeakingMessageId(null);
      return;
    }

    const langCode =
      language === 'es'
        ? 'es-ES'
        : language === 'fr'
        ? 'fr-FR'
        : language === 'de'
        ? 'de-DE'
        : language === 'hi'
        ? 'hi-IN'
        : language === 'te'
        ? 'te-IN'
        : language === 'ar'
        ? 'ar-SA'
        : 'en-US';

    VoiceService.speak(
      text,
      () => {
        setSpeakingMessageId(null);
      },
      langCode
    );
    setSpeakingMessageId(messageId);
  };

  const generateAIResponse = (userQuestion: string): ChatMessage => {
    const lower = userQuestion.toLowerCase();

    // Emergency red-flag check
    if (
      lower.includes('chest pain') ||
      lower.includes('heart attack') ||
      lower.includes('difficulty breathing') ||
      lower.includes('trouble breathing') ||
      lower.includes('shortness of breath') ||
      lower.includes('passed out') ||
      lower.includes('fainted') ||
      lower.includes('slurred speech') ||
      lower.includes('stroke') ||
      lower.includes('severe bleeding')
    ) {
      return {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        isEmergencyWarning: true,
        text: '🚨 **URGENT EMERGENCY WARNING**\n\nThe symptoms you described can indicate an acute, life-threatening medical emergency. \n\n**Immediate Action Required:**\n• **Call 911 (US/CAN) or 112 (Europe/Global)** or proceed to the nearest Emergency Department immediately.\n• Do not wait for symptoms to resolve on their own.\n• Do not drive yourself if experiencing dizziness, fainting, or chest discomfort.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (lower.includes('headache') && (lower.includes('fever') || lower.includes('temperature'))) {
      return {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: 'I can provide general health information, but I cannot diagnose your condition. Headache and fever can occur with several common conditions, such as viral infections (common cold or influenza), mild dehydration, or sinus congestion.\n\n### General Guidance:\n• **Hydration:** Replenish fluids with water, oral rehydration solutions, or clear broths.\n• **Rest:** Avoid screen time and rest in a well-ventilated, quiet environment.\n• **Temperature Monitoring:** Track whether the temperature exceeds 102°F (38.9°C).\n\n### When to Consult a Doctor:\nIf fever persists beyond 3 days, worsens, or is accompanied by a stiff neck, sensitivity to light, confusion, or persistent vomiting, contact a medical provider promptly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          category: 'Symptom Triage',
          suggestedFollowUps: [
            'What temperature is considered dangerous for an adult?',
            'What are common indicators of dehydration?',
          ],
        },
      };
    }

    if (lower.includes('cholesterol') || lower.includes('ldl') || lower.includes('lipid')) {
      return {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: '### Understanding Cholesterol & LDL:\nCholesterol is a waxy substance essential for cell membranes and hormone synthesis. A standard lipid panel assesses several fractions:\n\n• **LDL (Low-Density Lipoprotein):** Often termed "bad" cholesterol because elevated levels can build up in arterial walls. Optimal is generally under 100 mg/dL.\n• **HDL (High-Density Lipoprotein):** Known as "good" cholesterol because it transports excess cholesterol back to the liver for excretion. Desirable is >50 mg/dL.\n• **Triglycerides:** A form of stored energy; target is typically <150 mg/dL.\n\n*Consult your physician to review your 10-year cardiovascular risk calculation and personalized diet guidelines.*',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          category: 'Lab Terminology',
          suggestedFollowUps: [
            'What dietary changes help lower LDL?',
            'How often should adults get a lipid panel?',
          ],
        },
      };
    }

    // Default intelligent clinical educational response
    return {
      id: `m-ai-${Date.now()}`,
      sender: 'ai',
      text: `Thank you for sharing your inquiry. While I can provide evidence-based educational insights, I cannot provide a clinical diagnosis or medical treatment plan.\n\n### Key Educational Insights:\n• Your query regarding **"${userQuestion.slice(0, 50)}${userQuestion.length > 50 ? '...' : ''}"** is a common topic in preventive wellness.\n• Symptoms and health parameters are always interpreted in the context of an individual's personal medical history, current medications, and physical examination.\n• Keep a written log of when symptoms occur, their severity on a 1–10 scale, and any triggering factors.\n\n### Recommended Next Steps:\nDiscuss these questions with your primary healthcare provider or schedule a telemedicine consultation. If your symptoms worsen or new severe warning signs develop, seek timely medical evaluation.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: {
        category: 'General Health',
        suggestedFollowUps: [
          'What questions should I ask my doctor about this?',
          'What lifestyle factors could be relevant?',
        ],
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text && !attachedFile) return;

    const fullText = attachedFile ? `[Attached File: ${attachedFile}]\n${text}` : text;

    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: fullText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...activeThread.messages, userMessage];

    const lower = text.toLowerCase();
    const isEmergency =
      lower.includes('chest pain') ||
      lower.includes('difficulty breathing') ||
      lower.includes('stroke') ||
      lower.includes('passed out');

    if (isEmergency) {
      onOpenEmergencyModal('Mention of critical acute symptoms in chat inquiry');
    }

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              preview: text.slice(0, 45),
              timestamp: 'Just now',
              messages: updatedMessages,
            }
          : t
      )
    );

    setInputText('');
    setAttachedFile(null);
    setFileError(null);
    setIsTyping(true);
    onIncrementQuestionCount?.();

    setTimeout(() => {
      const aiReply = generateAIResponse(text);
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThread.id
            ? {
                ...t,
                messages: [...t.messages, aiReply],
              }
            : t
        )
      );
      setIsTyping(false);
    }, 850);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nameLower = file.name.toLowerCase();
    if (nameLower.endsWith('.ppt') || nameLower.endsWith('.pptx')) {
      setFileError('PPT/PPTX presentations are restricted. Only PDF documents and Medical Images are allowed.');
      setAttachedFile(null);
      return;
    }

    const isPdfOrImage =
      file.type.includes('pdf') ||
      file.type.startsWith('image/') ||
      nameLower.endsWith('.pdf') ||
      nameLower.endsWith('.png') ||
      nameLower.endsWith('.jpg') ||
      nameLower.endsWith('.jpeg');

    if (!isPdfOrImage) {
      setFileError('Invalid file type. Only PDF and Image files (PNG, JPG) are accepted.');
      setAttachedFile(null);
      return;
    }

    setFileError(null);
    setAttachedFile(file.name);
  };

  return (
    <div
      id="ai-health-chat-container"
      className="rounded-3xl border border-blue-950/80 bg-[#080D1A] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[78vh] min-h-[600px] text-white text-left"
    >
      {/* Left Column: Conversation Thread List */}
      <div
        id="chat-conversations-sidebar"
        className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-blue-950 bg-[#050811] flex flex-col shrink-0"
      >
        <div className="p-4 border-b border-blue-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Consultations
            </h3>
          </div>
          <button
            id="start-new-consultation-btn"
            type="button"
            onClick={handleStartNewConsultation}
            className="px-2.5 py-1 text-xs font-bold text-blue-300 hover:text-white bg-blue-950/80 hover:bg-blue-900 border border-blue-800/80 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title="Start new consultation"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>New</span>
          </button>
        </div>

        {/* List of active threads */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {threads.map((thread) => {
            const isActive = thread.id === activeThreadId;
            return (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all text-left border ${
                  isActive
                    ? 'bg-[#080D1A] border-blue-500/80 text-white shadow-md shadow-blue-950/50'
                    : 'bg-transparent border-transparent hover:bg-[#080D1A]/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-blue-300' : 'text-slate-200'
                    }`}
                  >
                    {thread.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 shrink-0">
                    {thread.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate leading-relaxed">
                  {thread.preview}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Card at bottom of sidebar */}
        <div className="p-3 border-t border-blue-950 text-[11px] text-slate-400 flex items-center gap-2 bg-[#050811]">
          <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Non-diagnostic educational AI model</span>
        </div>
      </div>

      {/* Right Column: Active Chat Session */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-[#080D1A]">
        {/* Chat Header */}
        <div className="p-3.5 sm:p-4 border-b border-blue-950 flex items-center justify-between px-5 bg-[#050811]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  AI Clinical Health Assistant
                </h4>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Triage
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Educational Triage &amp; Clinical Knowledge Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenEmergencyModal('Manual emergency hotline request from chat')}
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-xl border border-blue-500 shadow-md shadow-blue-600/20 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Emergency Help</span>
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#080D1A]">
          {activeThread.messages.map((message) => {
            const isUser = message.sender === 'user';
            const isSpeaking = speakingMessageId === message.id;

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4 stroke-[2.2]" />
                  </div>
                )}

                <div
                  className={`max-w-xl sm:max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs shadow-blue-600/20'
                      : message.isEmergencyWarning
                      ? 'bg-red-950/40 border-2 border-red-500/60 text-red-100 rounded-tl-xs'
                      : 'bg-[#050811] border border-blue-950 text-slate-100 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line break-words leading-relaxed">{message.text}</div>

                  {/* Follow-up suggestion pills */}
                  {message.metadata?.suggestedFollowUps && (
                    <div className="mt-3.5 pt-3.5 border-t border-blue-950/80 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 block">
                        Suggested Follow-ups:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {message.metadata.suggestedFollowUps.map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(prompt)}
                            className="text-[11px] px-3 py-1.5 rounded-xl border border-blue-950 bg-[#080D1A] hover:bg-blue-950 text-blue-300 hover:text-white transition-colors cursor-pointer text-left font-medium"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions & Timestamp */}
                  <div
                    className={`mt-2.5 flex items-center justify-between text-[10px] pt-1 ${
                      isUser ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    <span className="font-medium">{message.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-2">
                        {/* Voice Text-to-Speech Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleSpeechOutput(message.id, message.text)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                            isSpeaking
                              ? 'bg-blue-600 text-white border-blue-500 animate-pulse'
                              : 'bg-[#080D1A] border-blue-950 text-slate-300 hover:text-white hover:border-blue-700'
                          }`}
                          title={isSpeaking ? 'Stop speech' : 'Read aloud with voice'}
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-white" />
                              <span className="text-[9px] font-bold">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-[9px] font-bold">Listen</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(message.id, message.text)}
                          className="p-1.5 rounded-lg border bg-[#080D1A] border-blue-950 text-slate-300 hover:text-white hover:border-blue-700 transition-colors cursor-pointer flex items-center gap-1"
                          title="Copy text"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-[9px] font-bold text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-[9px] font-bold">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-800 text-blue-300 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-blue-400 italic">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span className="font-medium">AI Clinical Health Assistant is analyzing clinical guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2.5 border-t border-blue-950 overflow-x-auto flex items-center gap-2 text-xs bg-[#050811] no-scrollbar">
          <span className="text-blue-400 font-bold shrink-0 text-[10px] uppercase tracking-wider">
            Quick Topics:
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="px-3 py-1 rounded-xl shrink-0 transition-all text-xs font-semibold cursor-pointer border border-blue-950 bg-[#080D1A] hover:border-blue-700 text-slate-300 hover:text-white whitespace-nowrap"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-3.5 sm:p-4 border-t border-blue-950 space-y-2.5 bg-[#050811]">
          {/* File error notice */}
          {fileError && (
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Active Voice Listening Banner */}
          {isListening && (
            <div className="p-2.5 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-between shadow-lg animate-pulse">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 animate-bounce" />
                <span className="font-bold">{t('listening')} - Speak now...</span>
              </div>
              <button
                type="button"
                onClick={handleToggleVoiceInput}
                className="text-[11px] bg-white text-blue-700 font-extrabold px-3 py-1 rounded-lg cursor-pointer hover:bg-slate-100"
              >
                Stop Recording
              </button>
            </div>
          )}

          {/* Attached file chip */}
          {attachedFile && (
            <div className="flex items-center gap-2 bg-blue-950 text-blue-300 px-3 py-1.5 rounded-xl text-xs w-fit border border-blue-800">
              <Paperclip className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold truncate max-w-xs">{attachedFile}</span>
              <button
                onClick={() => setAttachedFile(null)}
                className="hover:text-white cursor-pointer ml-1 font-bold text-sm"
              >
                ×
              </button>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              className="hidden"
            />

            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl border border-blue-950 bg-[#080D1A] text-slate-300 hover:text-white hover:border-blue-700 transition-colors cursor-pointer"
              title="Attach PDF Lab Report or Medical Image (PPT strictly restricted)"
            >
              <Paperclip className="w-4 h-4 text-blue-400" />
            </button>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg animate-bounce'
                  : 'bg-[#080D1A] border-blue-950 text-slate-300 hover:text-white hover:border-blue-700'
              }`}
              title={isListening ? 'Stop voice listening' : 'Start voice input (Speech-to-Text)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a health inquiry, symptom question, or speak via microphone..."
              className="flex-1 py-2.5 px-4 rounded-xl border border-blue-950 bg-[#080D1A] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() && !attachedFile}
              className="p-2.5 sm:px-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          {/* Bottom Safety Disclaimer */}
          <p className="text-[10px] text-center text-slate-500">
            Educational clinical guidance only. In case of acute chest pressure, sudden numbness, or shortness of breath, call 911 immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
