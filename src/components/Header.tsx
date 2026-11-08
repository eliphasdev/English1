import React from 'react';
import { Sparkles, Volume2, Turtle, Rabbit, HelpCircle, Star, Music } from 'lucide-react';
import { SpeechService, sfx } from '../utils/soundAndSpeech';

interface HeaderProps {
  stars: number;
  isSlowAudio: boolean;
  setIsSlowAudio: (val: boolean) => void;
  showSpanish: boolean;
  setShowSpanish: (val: boolean) => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  isSlowAudio,
  setIsSlowAudio,
  showSpanish,
  setShowSpanish,
  onOpenGuide
}) => {
  const handleMascotGreet = () => {
    sfx.playPop();
    SpeechService.speakEnglish("Hello explorer! Let's learn English together!", isSlowAudio);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200 shadow-sm px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Mascot */}
        <div 
          onClick={handleMascotGreet}
          role="button"
          tabIndex={0}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="¡Haz clic en Buddy para saludar!"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform animate-float">
              🐶
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight flex items-center gap-1 font-['Fredoka']">
                Safari Kids <span className="text-amber-500">English</span>
              </h1>
            </div>
            <p className="text-xs font-bold text-amber-700/80 hidden sm:block">
              1° Básico • Animals, Adjectives & Colors 🐾
            </p>
          </div>
        </div>

        {/* Quick controls and Star counter */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 px-3 py-1.5 rounded-full shadow-inner">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse-gentle" />
            <span className="font-extrabold text-amber-900 text-base sm:text-lg min-w-[20px] text-center">
              {stars}
            </span>
            <span className="text-xs font-bold text-amber-700 hidden md:inline">estrellas</span>
          </div>

          {/* Audio Speed Toggle (Rabbit vs Turtle) */}
          <button
            onClick={() => {
              sfx.playPop();
              const next = !isSlowAudio;
              setIsSlowAudio(next);
              SpeechService.speakEnglish(next ? "Slow turtle mode!" : "Normal rabbit speed!", next);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border-2 transition-all ${
              isSlowAudio
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-sm'
                : 'bg-amber-100 border-amber-300 text-amber-900'
            }`}
            title={isSlowAudio ? "Modo Tortuga (Audio Lento activo)" : "Modo Liebre (Audio Normal)"}
          >
            {isSlowAudio ? (
              <>
                <Turtle className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Audio Lento 🐢</span>
              </>
            ) : (
              <>
                <Rabbit className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Normal 🐰</span>
              </>
            )}
          </button>

          {/* Spanish translation toggle */}
          <button
            onClick={() => {
              sfx.playPop();
              setShowSpanish(!showSpanish);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold border-2 transition-all ${
              showSpanish
                ? 'bg-blue-100 border-blue-400 text-blue-900'
                : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Activar/desactivar ayuda en español"
          >
            🇨🇱 {showSpanish ? 'Español: SÍ' : 'Solo Inglés'}
          </button>

          {/* Guide / Help modal */}
          <button
            onClick={() => {
              sfx.playPop();
              onOpenGuide();
            }}
            className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-800 transition-colors"
            title="Temario y Guía Pedagógica 1° Básico"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
