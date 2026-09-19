let activeRecognition: any = null;

export const VoiceService = {
  speak: (text: string, onEnd?: () => void, lang: string = 'en-US') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      onEnd?.();
    };
    utterance.onerror = () => {
      onEnd?.();
    };
    window.speechSynthesis.speak(utterance);
  },

  stopSpeaking: () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  startListening: (
    onResult: (transcript: string) => void,
    onError?: (error: any) => void,
    onEnd?: () => void,
    lang: string = 'en-US'
  ): (() => void) => {
    if (typeof window === 'undefined') {
      onEnd?.();
      return () => {};
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.');
      onError?.('Speech recognition not supported');
      onEnd?.();
      return () => {};
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        onError?.(event?.error || 'Speech recognition error');
        onEnd?.();
      };

      recognition.onend = () => {
        onEnd?.();
      };

      activeRecognition = recognition;
      recognition.start();

      return () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      };
    } catch (err) {
      onError?.(err);
      onEnd?.();
      return () => {};
    }
  },

  stopListening: () => {
    if (activeRecognition) {
      try {
        activeRecognition.stop();
      } catch {
        // ignore
      }
      activeRecognition = null;
    }
  },
};
