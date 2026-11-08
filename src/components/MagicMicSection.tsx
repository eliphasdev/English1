import React, { useState, useEffect, useRef } from 'react';
import { 
  ANIMALS, 
  ADJECTIVES, 
  COLORS, 
  DESCRIBING_SENTENCES, 
  GRAMMAR_EXAMPLES 
} from '../data/curriculum';
import { 
  SpeechService, 
  evaluatePronunciation, 
  sfx, 
  triggerCelebration,
  isSpeechRecognitionSupported 
} from '../utils/soundAndSpeech';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Turtle, 
  Star, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MagicMicSectionProps {
  initialPhrase?: { phrase: string; spanish: string; emoji: string } | null;
  isSlowAudio: boolean;
  showSpanish: boolean;
  onAddStar: (count: number) => void;
}

interface PracticeItem {
  id: string;
  phrase: string;
  spanish: string;
  emoji: string;
  category: string;
  phonetic?: string;
}

export const MagicMicSection: React.FC<MagicMicSectionProps> = ({
  initialPhrase,
  isSlowAudio,
  showSpanish,
  onAddStar
}) => {
  // Built-in collection of all practice items
  const allItems: PracticeItem[] = [
    // Animals
    ...ANIMALS.map(a => ({
      id: `animal-${a.id}`,
      phrase: a.english,
      spanish: a.spanish,
      emoji: a.emoji,
      category: 'Animales 🐾',
      phonetic: a.phonetic
    })),
    // Adjectives
    ...ADJECTIVES.map(adj => ({
      id: `adj-${adj.id}`,
      phrase: adj.english,
      spanish: adj.spanish,
      emoji: adj.emoji,
      category: 'Adjetivos 📏',
      phonetic: adj.phonetic
    })),
    // Colors
    ...COLORS.map(c => ({
      id: `col-${c.id}`,
      phrase: c.english,
      spanish: c.spanish,
      emoji: '🎨',
      category: 'Colores 🎨',
      phonetic: c.phonetic
    })),
    // Describing sentences from notebook
    ...DESCRIBING_SENTENCES.map(s => ({
      id: `sent-${s.id}`,
      phrase: s.english,
      spanish: s.spanish,
      emoji: s.emoji,
      category: 'Oraciones 📝'
    })),
    // Grammar "This is a dog / The dog is big and fast"
    {
      id: 'this-dog',
      phrase: 'This is a dog.',
      spanish: 'Este es un perro.',
      emoji: '🐶',
      category: 'Gramática 📖'
    },
    {
      id: 'this-cat',
      phrase: 'This is a cat.',
      spanish: 'Este es un gato.',
      emoji: '🐱',
      category: 'Gramática 📖'
    },
    {
      id: 'dog-big-fast',
      phrase: 'The dog is big and fast.',
      spanish: 'El perro es grande y rápido.',
      emoji: '🐕',
      category: 'Gramática 📖'
    },
    {
      id: 'cat-small-slow',
      phrase: 'The cat is small and slow.',
      spanish: 'El gato es pequeño y lento.',
      emoji: '🐈',
      category: 'Gramática 📖'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [heardText, setHeardText] = useState<string>('');
  const [evaluation, setEvaluation] = useState<{
    score: number;
    stars: number;
    feedbackEs: string;
    feedbackEn: string;
  } | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  // If initial phrase passed from another tab
  useEffect(() => {
    if (initialPhrase) {
      const idx = allItems.findIndex(i => i.phrase.toLowerCase() === initialPhrase.phrase.toLowerCase());
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [initialPhrase]);

  const filteredItems = selectedCategory === 'Todos'
    ? allItems
    : allItems.filter(item => item.category.includes(selectedCategory));

  const currentItem = filteredItems[currentIndex % filteredItems.length] || allItems[0];

  // Reset evaluation when item changes
  const handleItemChange = (newIndex: number) => {
    stopListening();
    setHeardText('');
    setEvaluation(null);
    setMicError(null);
    setCurrentIndex(newIndex);
  };

  const handleListenExample = (isTurtle: boolean = false) => {
    sfx.playPop();
    SpeechService.speakEnglish(currentItem.phrase, isTurtle || isSlowAudio);
  };

  // Start speech recognition
  const startListening = () => {
    sfx.playPop();
    setHeardText('');
    setEvaluation(null);
    setMicError(null);

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setMicError('El reconocimiento de voz no está disponible en este navegador. Puedes usar la simulación mágica.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setHeardText(transcript);
        processSpokenResult(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setMicError('El permiso del micrófono fue bloqueado. Por favor dale permiso en el navegador o usa el botón de práctica.');
        } else if (event.error === 'no-speech') {
          setMicError('No escuchamos tu voz. ¡Habla fuerte y clarito cerca del micrófono!');
        } else {
          setMicError('Hubo un pequeño problema con el audio. ¡Inténtalo de nuevo!');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error(err);
      setIsListening(false);
      setMicError('No se pudo acceder al micrófono. Prueba el botón de prueba o dale permiso.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
      setIsListening(false);
    }
  };

  const processSpokenResult = (transcript: string) => {
    const result = evaluatePronunciation(currentItem.phrase, transcript);
    setEvaluation(result);

    if (result.stars === 3) {
      triggerCelebration('large');
      onAddStar(3);
    } else if (result.stars === 2) {
      triggerCelebration('small');
      onAddStar(2);
    } else {
      sfx.playGentleTryAgain();
      onAddStar(1);
    }
  };

  // Safe friendly simulation for kids if mic is restricted in iframe/device
  const handleSimulateSpeech = (accuracy: 'perfect' | 'good') => {
    sfx.playPop();
    const simulated = accuracy === 'perfect' 
      ? currentItem.phrase 
      : currentItem.phrase.split(' ')[0] || currentItem.phrase;
    
    setHeardText(simulated);
    processSpokenResult(simulated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Category selector */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-3 mb-4">
        {['Todos', 'Animales', 'Adjetivos', 'Colores', 'Oraciones', 'Gramática'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              sfx.playPop();
              setSelectedCategory(cat);
              handleItemChange(0);
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all border-2 ${
              selectedCategory === cat
                ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                : 'bg-white text-rose-900 border-rose-200 hover:bg-rose-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Mic Card */}
      <div className="bg-white rounded-3xl border-4 border-rose-200 shadow-xl overflow-hidden p-6 sm:p-8">
        {/* Top Info */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full font-black text-xs border border-rose-200">
            {currentItem.category} • Reto {((currentIndex % filteredItems.length) + 1)} de {filteredItems.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleItemChange((currentIndex - 1 + filteredItems.length) % filteredItems.length)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleItemChange((currentIndex + 1) % filteredItems.length)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Display Item */}
        <div className="my-6 text-center">
          <div className="inline-block p-4 rounded-3xl bg-gradient-to-tr from-amber-100 to-rose-100 border-2 border-rose-200 shadow-inner mb-4 animate-float text-7xl sm:text-8xl">
            {currentItem.emoji}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-['Fredoka']">
            {currentItem.phrase}
          </h2>

          {currentItem.phonetic && (
            <p className="text-sm font-extrabold text-slate-500 mt-1">
              Pronunciación: <span className="text-rose-600">/{currentItem.phonetic}/</span>
            </p>
          )}

          {showSpanish && (
            <p className="text-base sm:text-lg font-bold text-slate-700 mt-2 bg-rose-50 inline-block px-4 py-1.5 rounded-full border border-rose-200">
              🇨🇱 {currentItem.spanish}
            </p>
          )}
        </div>

        {/* Listen buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => handleListenExample(false)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-transform active:scale-95"
          >
            <Volume2 className="w-5 h-5" />
            <span>Escuchar Audio 🐰</span>
          </button>
          <button
            onClick={() => handleListenExample(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md transition-transform active:scale-95"
          >
            <Turtle className="w-5 h-5" />
            <span>Escuchar Lento 🐢</span>
          </button>
        </div>

        {/* BIG MIC BUTTON */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 -m-3 rounded-full bg-rose-400 opacity-75 animate-ping"></div>
            )}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all border-4 ${
                isListening
                  ? 'bg-rose-600 border-rose-300 text-white scale-110 animate-pulse'
                  : 'bg-gradient-to-tr from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 border-white text-white active:scale-95'
              }`}
            >
              <Mic className="w-12 h-12 sm:w-14 sm:h-14 mb-1" />
              <span className="text-xs font-black tracking-wide uppercase">
                {isListening ? 'Escuchando' : '¡Hablar!'}
              </span>
            </button>
          </div>

          <p className="mt-4 text-sm sm:text-base font-extrabold text-slate-800 text-center">
            {isListening ? (
              <span className="text-rose-600 animate-pulse">
                🎙️ ¡Te estoy escuchando! Di: &ldquo;{currentItem.phrase}&rdquo;
              </span>
            ) : (
              '1. Toca el micrófono • 2. Di la palabra en inglés fuerte y claro'
            )}
          </p>

          {micError && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-900 max-w-md">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{micError}</span>
            </div>
          )}
        </div>

        {/* Spoken result & Evaluation feedback */}
        {heardText && evaluation && (
          <div className="mt-6 p-5 bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl border-3 border-rose-300 shadow-md text-center animate-bounce-gentle">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Lo que escuchó el micrófono:
            </p>
            <p className="text-2xl font-black text-slate-900 my-1 font-mono">
              &ldquo;{heardText}&rdquo;
            </p>

            {/* Stars earned */}
            <div className="flex items-center justify-center gap-2 my-3">
              {[1, 2, 3].map(st => (
                <Star
                  key={st}
                  className={`w-8 h-8 transition-transform ${
                    st <= evaluation.stars
                      ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-lg font-black text-rose-950">
              {evaluation.feedbackEs}
            </p>
            <p className="text-xs font-bold text-slate-600 mt-1">
              {evaluation.feedbackEn} (Puntuación: {evaluation.score}%)
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => handleItemChange((currentIndex + 1) % filteredItems.length)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md"
              >
                <span>¡Siguiente reto!</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={startListening}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-sm border-2 border-slate-300 shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Intentar otra vez</span>
              </button>
            </div>
          </div>
        )}

        {/* Practice/Simulation buttons helper */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <span className="font-semibold">💡 ¿Tienes problemas con el micrófono?</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleSimulateSpeech('perfect')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold border border-slate-300"
              title="Simula que dijiste la palabra perfecta"
            >
              🌟 Simular pronunciación perfecta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
