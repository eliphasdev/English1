import confetti from 'canvas-confetti';

// Web Audio synthesizer for joyful kid sound effects
class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play bright pop sound when clicking cards
  playPop() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio fallback silent
    }
  }

  // Success chime
  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.09;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // Audio fallback
    }
  }

  // Star celebration fanfare
  playFanfare() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const chords = [
        [523.25, 659.25, 783.99], // C
        [587.33, 739.99, 880.00], // D
        [659.25, 830.61, 987.77], // E
        [1046.50, 1318.51, 1567.98] // High C chord
      ];

      chords.forEach((chord, step) => {
        const startTime = ctx.currentTime + step * 0.14;
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;

          gain.gain.setValueAtTime(0.18, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.36);
        });
      });
    } catch {
      // Audio fallback
    }
  }

  // Gentle boing when answer needs another try
  playGentleTryAgain() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.23);
    } catch {
      // Audio fallback
    }
  }
}

export const sfx = new SoundEffects();

// Confetti burst for kid achievements
export function triggerCelebration(mode: 'small' | 'large' = 'small') {
  if (typeof window === 'undefined') return;
  sfx.playSuccess();
  if (mode === 'small') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6']
    });
  } else {
    sfx.playFanfare();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b6b', '#48dbfb', '#1dd1a1', '#f368e0']
    });
  }
}

// Text-to-Speech Engine
export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static voices: SpeechSynthesisVoice[] = [];
  private static isInitialized = false;

  public static init() {
    if (!this.synth || this.isInitialized) return;
    this.voices = this.synth.getVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        if (this.synth) {
          this.voices = this.synth.getVoices();
        }
      };
    }
    this.isInitialized = true;
  }

  // Speak in English (ideal for 1st grade learners: clear, pleasant, child-friendly rate)
  public static speakEnglish(text: string, isSlow: boolean = false, onEnd?: () => void) {
    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    // Rate: 0.82 normal (clear for 7yo), 0.60 slow (tortuga mode)
    utterance.rate = isSlow ? 0.6 : 0.82;
    utterance.pitch = 1.05;

    // Pick a friendly English voice if available
    const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const preferredVoice = enVoices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Victoria') || 
      v.name.includes('Google US English') || 
      v.name.includes('Natural') ||
      v.name.includes('Female')
    ) || enVoices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    this.synth.speak(utterance);
  }

  // Speak Spanish translation to help child/parents understand
  public static speakSpanish(text: string, onEnd?: () => void) {
    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const esVoices = this.voices.filter(v => v.lang.startsWith('es'));
    if (esVoices.length > 0) {
      utterance.voice = esVoices[0];
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    this.synth.speak(utterance);
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

// Pronunciation evaluation helper
export function evaluatePronunciation(target: string, spoken: string): {
  score: number;
  stars: number;
  feedbackEs: string;
  feedbackEn: string;
} {
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  if (!cleanSpoken) {
    return {
      score: 0,
      stars: 1,
      feedbackEs: 'No escuchamos nada. ¡Inténtalo de nuevo presionando el micrófono!',
      feedbackEn: 'Nothing heard. Press the mic and speak clearly!'
    };
  }

  if (cleanTarget === cleanSpoken) {
    return {
      score: 100,
      stars: 3,
      feedbackEs: '¡INCREÍBLE! ¡Pronunciaste perfecto!',
      feedbackEn: 'FANTASTIC! Perfect pronunciation!'
    };
  }

  // Substring or keyword inclusion
  const targetWords = cleanTarget.split(/\s+/);
  const spokenWords = cleanSpoken.split(/\s+/);
  let matchedCount = 0;

  targetWords.forEach(w => {
    if (spokenWords.includes(w) || cleanSpoken.includes(w)) {
      matchedCount++;
    }
  });

  const wordRatio = matchedCount / targetWords.length;

  // Approximate similarity (Levenshtein based)
  const dist = levenshtein(cleanTarget, cleanSpoken);
  const maxLen = Math.max(cleanTarget.length, cleanSpoken.length);
  const charSimilarity = Math.max(0, 1 - dist / maxLen);

  const combinedScore = Math.round(Math.max(wordRatio, charSimilarity) * 100);

  if (combinedScore >= 70) {
    return {
      score: Math.min(100, combinedScore + 15),
      stars: 3,
      feedbackEs: '¡Excelente trabajo! ¡Casi perfecto!',
      feedbackEn: 'Great job! Super clear!'
    };
  } else if (combinedScore >= 40) {
    return {
      score: combinedScore,
      stars: 2,
      feedbackEs: '¡Muy bien! Vamos a practicarlo una vez más.',
      feedbackEn: 'Good effort! Let us practice one more time.'
    };
  } else {
    return {
      score: Math.max(25, combinedScore),
      stars: 1,
      feedbackEs: '¡Buen intento! Escucha el audio 🐰 y repítelo despacio.',
      feedbackEn: 'Nice try! Listen again and repeat slowly.'
    };
  }
}

// Levenshtein distance
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Web Speech Recognition wrapper
export interface SpeechRecognitionResultState {
  transcript: string;
  isListening: boolean;
  error: string | null;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition ||
    (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition
  );
}
