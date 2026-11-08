import React, { useState, useEffect } from 'react';
import { 
  ANIMALS, 
  ADJECTIVES, 
  OPPOSITES, 
  COLORS, 
  DESCRIBING_SENTENCES 
} from '../data/curriculum';
import { SpeechService, sfx, triggerCelebration } from '../utils/soundAndSpeech';
import { 
  Puzzle, 
  ArrowRightLeft, 
  HelpCircle, 
  Grid2X2, 
  Volume2, 
  RotateCcw, 
  Check, 
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface GamesSectionProps {
  isSlowAudio: boolean;
  showSpanish: boolean;
  onAddStar: (count: number) => void;
}

type GameMode = 'builder' | 'opposites' | 'quiz' | 'memory';

export const GamesSection: React.FC<GamesSectionProps> = ({
  isSlowAudio,
  showSpanish,
  onAddStar
}) => {
  const [activeGame, setActiveGame] = useState<GameMode>('builder');

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Game Mode Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { id: 'builder' as GameMode, title: 'Arma la Oración', icon: '🧩', sub: 'The... is... and...', color: 'emerald' },
          { id: 'opposites' as GameMode, title: 'Unir Opuestos', icon: '⚡', sub: 'Big - Small, Fast - Slow', color: 'blue' },
          { id: 'quiz' as GameMode, title: 'Adivina Quién Es', icon: '🎯', sub: 'Escucha y Elige', color: 'amber' },
          { id: 'memory' as GameMode, title: 'Memorice Safari', icon: '🃏', sub: 'Encuentra las Parejas', color: 'purple' },
        ].map(g => {
          const isActive = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => {
                sfx.playPop();
                setActiveGame(g.id);
              }}
              className={`p-3.5 rounded-2xl border-3 flex flex-col items-center text-center transition-all shadow-sm ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102 ring-2 ring-emerald-300'
                  : 'bg-white hover:bg-emerald-50 text-slate-800 border-emerald-200'
              }`}
            >
              <span className="text-3xl mb-1">{g.icon}</span>
              <span className="font-extrabold text-sm sm:text-base leading-tight">{g.title}</span>
              <span className={`text-[11px] font-semibold mt-0.5 ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                {g.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Game 1: Sentence Builder Puzzle */}
      {activeGame === 'builder' && (
        <SentenceBuilderGame 
          isSlowAudio={isSlowAudio} 
          showSpanish={showSpanish} 
          onAddStar={onAddStar} 
        />
      )}

      {/* Game 2: Opposites Match */}
      {activeGame === 'opposites' && (
        <OppositesMatchGame 
          isSlowAudio={isSlowAudio} 
          showSpanish={showSpanish} 
          onAddStar={onAddStar} 
        />
      )}

      {/* Game 3: Quiz */}
      {activeGame === 'quiz' && (
        <AnimalQuizGame 
          isSlowAudio={isSlowAudio} 
          showSpanish={showSpanish} 
          onAddStar={onAddStar} 
        />
      )}

      {/* Game 4: Memory */}
      {activeGame === 'memory' && (
        <MemoryCardsGame 
          isSlowAudio={isSlowAudio} 
          onAddStar={onAddStar} 
        />
      )}
    </div>
  );
};

// ==========================================
// GAME 1: SENTENCE BUILDER PUZZLE
// ==========================================
interface BuilderChallenge {
  targetSentence: string;
  targetSpanish: string;
  emoji: string;
  pieces: string[];
}

const BUILDER_CHALLENGES: BuilderChallenge[] = [
  {
    targetSentence: 'The rabbit is fast and small.',
    targetSpanish: 'El conejo es rápido y pequeño.',
    emoji: '🐰',
    pieces: ['The', 'rabbit', 'is', 'fast', 'and', 'small.']
  },
  {
    targetSentence: 'The snail is slow and small.',
    targetSpanish: 'El caracol es lento y pequeño.',
    emoji: '🐌',
    pieces: ['The', 'snail', 'is', 'slow', 'and', 'small.']
  },
  {
    targetSentence: 'The turtle is slow and small.',
    targetSpanish: 'La tortuga es lenta y pequeña.',
    emoji: '🐢',
    pieces: ['The', 'turtle', 'is', 'slow', 'and', 'small.']
  },
  {
    targetSentence: 'The hamster is fast and small.',
    targetSpanish: 'El hámster es rápido y pequeño.',
    emoji: '🐹',
    pieces: ['The', 'hamster', 'is', 'fast', 'and', 'small.']
  },
  {
    targetSentence: 'The dog is big and fast.',
    targetSpanish: 'El perro es grande y rápido.',
    emoji: '🐶',
    pieces: ['The', 'dog', 'is', 'big', 'and', 'fast.']
  },
  {
    targetSentence: 'The cat is small and slow.',
    targetSpanish: 'El gato es pequeño y lento.',
    emoji: '🐱',
    pieces: ['The', 'cat', 'is', 'small', 'and', 'slow.']
  },
  {
    targetSentence: 'This is a dog.',
    targetSpanish: 'Este es un perro.',
    emoji: '🐕',
    pieces: ['This', 'is', 'a', 'dog.']
  },
  {
    targetSentence: 'This is a cat.',
    targetSpanish: 'Este es un gato.',
    emoji: '🐈',
    pieces: ['This', 'is', 'a', 'cat.']
  }
];

const SentenceBuilderGame: React.FC<{
  isSlowAudio: boolean;
  showSpanish: boolean;
  onAddStar: (count: number) => void;
}> = ({ isSlowAudio, showSpanish, onAddStar }) => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const challenge = BUILDER_CHALLENGES[levelIndex % BUILDER_CHALLENGES.length];

  // Available scrambled pieces
  const [availablePieces, setAvailablePieces] = useState<string[]>([]);
  // Placed pieces in user's sentence
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Scramble pieces on challenge load
  useEffect(() => {
    resetLevel();
  }, [levelIndex]);

  const resetLevel = () => {
    const scrambled = [...challenge.pieces].sort(() => Math.random() - 0.5);
    setAvailablePieces(scrambled);
    setPlacedPieces([]);
    setIsCompleted(false);
  };

  const handleAddPiece = (piece: string, indexInAvailable: number) => {
    sfx.playPop();
    const nextPlaced = [...placedPieces, piece];
    const nextAvailable = availablePieces.filter((_, idx) => idx !== indexInAvailable);
    setPlacedPieces(nextPlaced);
    setAvailablePieces(nextAvailable);

    // Check if sentence complete
    if (nextPlaced.join(' ') === challenge.targetSentence) {
      setIsCompleted(true);
      triggerCelebration('large');
      onAddStar(3);
      SpeechService.speakEnglish(challenge.targetSentence, isSlowAudio);
    } else if (nextPlaced.length === challenge.pieces.length) {
      sfx.playGentleTryAgain();
    }
  };

  const handleRemovePiece = (piece: string, indexInPlaced: number) => {
    sfx.playPop();
    const nextPlaced = placedPieces.filter((_, idx) => idx !== indexInPlaced);
    const nextAvailable = [...availablePieces, piece];
    setPlacedPieces(nextPlaced);
    setAvailablePieces(nextAvailable);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-emerald-200 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-emerald-100">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            🧩 Nivel {levelIndex + 1} de {BUILDER_CHALLENGES.length}
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">
            Arma la oración con las piezas mágicas
          </h3>
          {showSpanish && (
            <p className="text-sm font-bold text-emerald-900 mt-0.5">
              🇨🇱 Meta: &ldquo;{challenge.targetSpanish}&rdquo;
            </p>
          )}
        </div>
        <div className="text-5xl p-2 bg-emerald-50 rounded-2xl border border-emerald-200">
          {challenge.emoji}
        </div>
      </div>

      {/* Target Preview / Sentence slot area */}
      <div className="bg-emerald-50/70 border-3 border-dashed border-emerald-300 rounded-2xl p-5 min-h-[90px] flex flex-wrap items-center justify-center gap-2 mb-6">
        {placedPieces.length === 0 ? (
          <p className="text-sm font-bold text-emerald-800/70 animate-pulse text-center">
            Toca las palabras de abajo para armar la oración aquí 👆
          </p>
        ) : (
          placedPieces.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleRemovePiece(word, idx)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-base sm:text-lg shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>{word}</span>
              <span className="text-xs text-emerald-200">✕</span>
            </button>
          ))
        )}
      </div>

      {/* Available Scrambled Pieces */}
      <div className="mb-8">
        <p className="text-xs font-extrabold uppercase text-slate-500 mb-3 text-center">
          Palabras disponibles:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {availablePieces.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleAddPiece(word, idx)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-2xl font-black text-base sm:text-lg shadow-md border-2 border-amber-500 transition-all hover:scale-105 active:scale-95"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Success Celebration or Reset */}
      {isCompleted ? (
        <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 text-center animate-bounce-gentle flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-base sm:text-lg">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <span>¡EXCELENTE! ¡Armaste la oración completa! (+3 ⭐)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => SpeechService.speakEnglish(challenge.targetSentence, isSlowAudio)}
              className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm"
              title="Escuchar oración completa"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLevelIndex((levelIndex + 1) % BUILDER_CHALLENGES.length)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-xl shadow-md"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={resetLevel}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar este nivel</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// GAME 2: OPPOSITES MATCH GAME
// ==========================================
const OppositesMatchGame: React.FC<{
  isSlowAudio: boolean;
  showSpanish: boolean;
  onAddStar: (count: number) => void;
}> = ({ isSlowAudio, showSpanish, onAddStar }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  const leftItems = [
    { word: 'Big', opp: 'Small', emoji: '🐘', spanish: 'Grande' },
    { word: 'Tall', opp: 'Short', emoji: '🦒', spanish: 'Alto' },
    { word: 'Fast', opp: 'Slow', emoji: '🐇', spanish: 'Rápido' },
  ];

  const rightItems = [
    { word: 'Short', opp: 'Tall', emoji: '🐁', spanish: 'Bajo' },
    { word: 'Slow', opp: 'Fast', emoji: '🐢', spanish: 'Lento' },
    { word: 'Small', opp: 'Big', emoji: '🐭', spanish: 'Pequeño' },
  ];

  const handleSelectLeft = (word: string) => {
    sfx.playPop();
    SpeechService.speakEnglish(word, isSlowAudio);
    setSelectedLeft(word);
  };

  const handleSelectRight = (item: { word: string; opp: string }) => {
    sfx.playPop();
    SpeechService.speakEnglish(item.word, isSlowAudio);

    if (!selectedLeft) return;

    if (item.opp === selectedLeft) {
      // Match found!
      const next = new Set(matchedPairs);
      next.add(`${selectedLeft}-${item.word}`);
      setMatchedPairs(next);
      setSelectedLeft(null);
      sfx.playSuccess();
      onAddStar(2);

      if (next.size === 3) {
        triggerCelebration('large');
        onAddStar(5);
      }
    } else {
      sfx.playGentleTryAgain();
    }
  };

  const isLeftMatched = (word: string) => {
    for (const key of matchedPairs) {
      if (key.startsWith(word + '-')) return true;
    }
    return false;
  };

  const isRightMatched = (word: string) => {
    for (const key of matchedPairs) {
      if (key.endsWith('-' + word)) return true;
    }
    return false;
  };

  const handleRestart = () => {
    sfx.playPop();
    setMatchedPairs(new Set());
    setSelectedLeft(null);
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-blue-200 p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-blue-100 mb-6">
        <div>
          <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            ⚡ Parejas de Opuestos
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">
            Une cada palabra con su opuesto
          </h3>
          <p className="text-xs font-bold text-slate-600">
            1. Toca una palabra de la izquierda • 2. Toca su opuesto a la derecha
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-xl mx-auto my-6">
        {/* Left Column */}
        <div className="space-y-3">
          <p className="text-xs font-black uppercase text-blue-800 text-center">Columna A</p>
          {leftItems.map(item => {
            const isMatched = isLeftMatched(item.word);
            const isSelected = selectedLeft === item.word;

            return (
              <button
                key={item.word}
                disabled={isMatched}
                onClick={() => handleSelectLeft(item.word)}
                className={`w-full p-4 rounded-2xl border-3 flex items-center justify-between text-left transition-all ${
                  isMatched
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-blue-600 border-blue-700 text-white scale-105 shadow-lg ring-4 ring-blue-200'
                    : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-950 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <span className="font-black text-lg block leading-tight">{item.word}</span>
                    {showSpanish && <span className="text-xs font-bold opacity-80">{item.spanish}</span>}
                  </div>
                </div>
                {isMatched && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <p className="text-xs font-black uppercase text-amber-800 text-center">Opuesto B</p>
          {rightItems.map(item => {
            const isMatched = isRightMatched(item.word);

            return (
              <button
                key={item.word}
                disabled={isMatched}
                onClick={() => handleSelectRight(item)}
                className={`w-full p-4 rounded-2xl border-3 flex items-center justify-between text-left transition-all ${
                  isMatched
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800 opacity-80 cursor-default'
                    : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-950 shadow-sm hover:scale-102 active:scale-95'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <span className="font-black text-lg block leading-tight">{item.word}</span>
                    {showSpanish && <span className="text-xs font-bold opacity-80">{item.spanish}</span>}
                  </div>
                </div>
                {isMatched && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {matchedPairs.size === 3 && (
        <div className="mt-6 p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-center animate-bounce-gentle">
          <h4 className="text-xl font-black text-emerald-950 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            ¡Felicidades! Uniste todos los opuestos correctamente (+5 ⭐)
          </h4>
          <button
            onClick={handleRestart}
            className="mt-3 px-6 py-2 bg-emerald-600 text-white rounded-xl font-extrabold text-sm hover:bg-emerald-700 shadow-md"
          >
            Jugar otra vez
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// GAME 3: ANIMAL & COLOR QUIZ
// ==========================================
interface QuizQuestion {
  promptText: string;
  speakText: string;
  spanish: string;
  correctId: string;
  options: { id: string; label: string; emoji: string; colorBg?: string }[];
}

const AnimalQuizGame: React.FC<{
  isSlowAudio: boolean;
  showSpanish: boolean;
  onAddStar: (count: number) => void;
}> = ({ isSlowAudio, showSpanish, onAddStar }) => {
  const quizList: QuizQuestion[] = [
    {
      promptText: 'Listen and find: The rabbit!',
      speakText: 'Where is the rabbit?',
      spanish: '¿Dónde está el conejo?',
      correctId: 'rabbit',
      options: [
        { id: 'turtle', label: 'Turtle', emoji: '🐢' },
        { id: 'rabbit', label: 'Rabbit', emoji: '🐰' },
        { id: 'dog', label: 'Dog', emoji: '🐶' },
        { id: 'spider', label: 'Spider', emoji: '🕷️' }
      ]
    },
    {
      promptText: 'Listen and find: The snail is slow and small!',
      speakText: 'The snail is slow and small.',
      spanish: 'El caracol es lento y pequeño.',
      correctId: 'snail',
      options: [
        { id: 'dog', label: 'Dog', emoji: '🐶' },
        { id: 'parrot', label: 'Parrot', emoji: '🦜' },
        { id: 'snail', label: 'Snail', emoji: '🐌' },
        { id: 'chicken', label: 'Chicken', emoji: '🐥' }
      ]
    },
    {
      promptText: 'Find the color: Yellow!',
      speakText: 'Find the yellow color!',
      spanish: 'Encuentra el color amarillo',
      correctId: 'yellow',
      options: [
        { id: 'blue', label: 'Blue', emoji: '🔵', colorBg: '#2563eb' },
        { id: 'yellow', label: 'Yellow', emoji: '🟡', colorBg: '#eab308' },
        { id: 'red', label: 'Red', emoji: '🔴', colorBg: '#ef4444' },
        { id: 'green', label: 'Green', emoji: '🟢', colorBg: '#22c55e' }
      ]
    },
    {
      promptText: 'Find the opposite of: Fast!',
      speakText: 'What is the opposite of fast?',
      spanish: '¿Cuál es el opuesto de rápido (Fast)?',
      correctId: 'slow',
      options: [
        { id: 'big', label: 'Big (Grande)', emoji: '🐘' },
        { id: 'slow', label: 'Slow (Lento)', emoji: '🐢' },
        { id: 'tall', label: 'Tall (Alto)', emoji: '🦒' },
        { id: 'small', label: 'Small (Pequeño)', emoji: '🐭' }
      ]
    },
    {
      promptText: 'Listen and find: This is a dog.',
      speakText: 'This is a dog.',
      spanish: 'Este es un perro.',
      correctId: 'dog',
      options: [
        { id: 'cat', label: 'Cat', emoji: '🐱' },
        { id: 'bird', label: 'Bird', emoji: '🐦' },
        { id: 'fish', label: 'Fish', emoji: '🐟' },
        { id: 'dog', label: 'Dog', emoji: '🐶' }
      ]
    }
  ];

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const currentQ = quizList[questionIndex % quizList.length];

  useEffect(() => {
    // Speak question prompt automatically when arriving at new question
    SpeechService.speakEnglish(currentQ.speakText, isSlowAudio);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
  }, [questionIndex]);

  const handlePick = (optionId: string) => {
    sfx.playPop();
    setSelectedOption(optionId);
    if (optionId === currentQ.correctId) {
      setIsAnswerCorrect(true);
      triggerCelebration('small');
      onAddStar(2);
    } else {
      setIsAnswerCorrect(false);
      sfx.playGentleTryAgain();
    }
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-amber-200 p-6 sm:p-8 shadow-xl text-center">
      <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-6">
        <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          🎯 Pregunta {((questionIndex % quizList.length) + 1)} de {quizList.length}
        </span>
        <button
          onClick={() => SpeechService.speakEnglish(currentQ.speakText, isSlowAudio)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs"
        >
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span>Repetir Pregunta</span>
        </button>
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        {currentQ.promptText}
      </h3>
      {showSpanish && (
        <p className="text-sm font-bold text-amber-800 mb-6">
          🇨🇱 {currentQ.spanish}
        </p>
      )}

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto my-6">
        {currentQ.options.map(opt => {
          const isSelected = selectedOption === opt.id;
          const isRight = opt.id === currentQ.correctId;

          let btnClass = 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-900';
          if (isSelected) {
            if (isAnswerCorrect) {
              btnClass = 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-105';
            } else {
              btnClass = 'bg-rose-500 border-rose-600 text-white shadow-md animate-wiggle';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handlePick(opt.id)}
              className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all shadow-sm ${btnClass}`}
            >
              <span className="text-5xl mb-2">{opt.emoji}</span>
              <span className="font-black text-base sm:text-lg">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {isAnswerCorrect !== null && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className={`font-black text-lg ${isAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isAnswerCorrect ? '🎉 ¡MUY BIEN! ¡Respuesta correcta!' : '🤔 ¡Casi! Inténtalo otra vez tocando la opción correcta.'}
          </p>

          {isAnswerCorrect && (
            <button
              onClick={() => setQuestionIndex(questionIndex + 1)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md"
            >
              Siguiente Pregunta ➡️
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// GAME 4: MEMORY SAFARI
// ==========================================
interface MemoryCard {
  uid: string;
  id: string;
  name: string;
  emoji: string;
}

const MemoryCardsGame: React.FC<{
  isSlowAudio: boolean;
  onAddStar: (count: number) => void;
}> = ({ isSlowAudio, onAddStar }) => {
  const baseCards = [
    { id: 'dog', name: 'Dog', emoji: '🐶' },
    { id: 'cat', name: 'Cat', emoji: '🐱' },
    { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
    { id: 'turtle', name: 'Turtle', emoji: '🐢' },
  ];

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    restartMemory();
  }, []);

  const restartMemory = () => {
    const pairList: MemoryCard[] = [];
    baseCards.forEach(c => {
      pairList.push({ uid: `${c.id}-1`, id: c.id, name: c.name, emoji: c.emoji });
      pairList.push({ uid: `${c.id}-2`, id: c.id, name: c.name, emoji: c.emoji });
    });
    setCards(pairList.sort(() => Math.random() - 0.5));
    setFlippedIndices([]);
    setMatchedIds(new Set());
  };

  const handleFlip = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index)) return;
    const card = cards[index];
    sfx.playPop();
    SpeechService.speakEnglish(card.name, isSlowAudio);

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      const card1 = cards[nextFlipped[0]];
      const card2 = cards[nextFlipped[1]];

      if (card1.id === card2.id) {
        // Match!
        const nextMatched = new Set(matchedIds);
        nextMatched.add(card1.id);
        setMatchedIds(nextMatched);
        setFlippedIndices([]);
        sfx.playSuccess();
        onAddStar(2);

        if (nextMatched.size === baseCards.length) {
          triggerCelebration('large');
          onAddStar(5);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-purple-200 p-6 sm:p-8 shadow-xl text-center">
      <div className="flex items-center justify-between pb-3 border-b border-purple-100 mb-6">
        <div>
          <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            🃏 Memorice de Animales
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">
            Encuentra las parejas de cartas iguales
          </h3>
        </div>
        <button
          onClick={restartMemory}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto my-6">
        {cards.map((c, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.has(c.id);

          return (
            <button
              key={c.uid}
              onClick={() => handleFlip(idx)}
              className={`h-24 sm:h-28 rounded-2xl border-3 flex flex-col items-center justify-center transition-all select-none ${
                isFlipped
                  ? 'bg-gradient-to-tr from-purple-100 to-pink-100 border-purple-400 scale-102 shadow-md'
                  : 'bg-gradient-to-tr from-purple-600 to-indigo-700 border-purple-800 text-white shadow hover:scale-105 active:scale-95'
              }`}
            >
              {isFlipped ? (
                <>
                  <span className="text-3xl sm:text-4xl">{c.emoji}</span>
                  <span className="text-xs font-black text-purple-950 mt-1">{c.name}</span>
                </>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </button>
          );
        })}
      </div>

      {matchedIds.size === baseCards.length && (
        <div className="p-4 bg-purple-100 border-2 border-purple-300 rounded-2xl animate-bounce-gentle">
          <h4 className="text-xl font-black text-purple-950">
            🎉 ¡Excelente memoria! Encontraste todas las parejas (+5 ⭐)
          </h4>
          <button
            onClick={restartMemory}
            className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-md"
          >
            Jugar otra vez
          </button>
        </div>
      )}
    </div>
  );
};
