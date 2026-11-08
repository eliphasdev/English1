import React, { useState, useEffect } from 'react';
import { SONGS, Song } from '../data/curriculum';
import { SpeechService, sfx, triggerCelebration } from '../utils/soundAndSpeech';
import { Play, Pause, RotateCcw, Music, Sparkles, Volume2, Turtle } from 'lucide-react';

interface SongsSectionProps {
  isSlowAudio: boolean;
  showSpanish: boolean;
  onAddStar: (count: number) => void;
}

export const SongsSection: React.FC<SongsSectionProps> = ({
  isSlowAudio,
  showSpanish,
  onAddStar
}) => {
  const [selectedSongIndex, setSelectedSongIndex] = useState<number>(0);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const song = SONGS[selectedSongIndex];

  // Stop music if unmounted or song switched
  useEffect(() => {
    stopSong();
  }, [selectedSongIndex]);

  const stopSong = () => {
    setIsPlaying(false);
    setActiveLineIndex(-1);
    SpeechService.stop();
  };

  const playLine = (index: number) => {
    if (index >= song.lyrics.length) {
      // Song finished!
      setIsPlaying(false);
      setActiveLineIndex(-1);
      triggerCelebration('large');
      onAddStar(5);
      return;
    }

    setActiveLineIndex(index);
    const lineItem = song.lyrics[index];
    SpeechService.speakEnglish(lineItem.line, isSlowAudio, () => {
      // Short musical pause before next line
      setTimeout(() => {
        playLine(index + 1);
      }, 700);
    });
  };

  const handleTogglePlay = () => {
    sfx.playPop();
    if (isPlaying) {
      stopSong();
    } else {
      setIsPlaying(true);
      playLine(activeLineIndex >= 0 ? activeLineIndex : 0);
    }
  };

  const handlePlaySingleLine = (index: number) => {
    sfx.playPop();
    stopSong();
    setActiveLineIndex(index);
    SpeechService.speakEnglish(song.lyrics[index].line, isSlowAudio, () => {
      setActiveLineIndex(-1);
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Song selector tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {SONGS.map((s, idx) => {
          const isSelected = selectedSongIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => {
                sfx.playPop();
                setSelectedSongIndex(idx);
              }}
              className={`p-3.5 rounded-2xl border-3 flex flex-col items-center text-center transition-all shadow-sm ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-700 shadow-lg scale-102 ring-2 ring-purple-300'
                  : 'bg-white hover:bg-purple-50 text-slate-900 border-purple-200'
              }`}
            >
              <span className="text-3xl mb-1">{s.icon}</span>
              <span className="font-black text-xs sm:text-sm leading-tight line-clamp-1">{s.title}</span>
              <span className={`text-[10px] font-bold mt-0.5 line-clamp-1 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                {s.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Song Stage Player */}
      <div className="bg-white rounded-3xl border-4 border-purple-300 shadow-xl overflow-hidden p-6 sm:p-8">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-100">
          <div className="text-center sm:text-left">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-black text-xs uppercase tracking-wider">
              🎤 Canción Infantil para Cantar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {song.title}
            </h2>
            <p className="text-sm font-bold text-purple-900">
              {song.subtitle}
            </p>
          </div>

          {/* Master Player Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-base shadow-lg transition-transform active:scale-95 ${
                isPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isPlaying ? 'Pausar' : 'Cantar Todo'}</span>
            </button>

            <button
              onClick={stopSong}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl"
              title="Detener"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Singing Mascot Animation Banner */}
        <div className="my-6 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 rounded-2xl border-2 border-purple-200 flex items-center justify-center gap-4 text-center">
          <span className={`text-4xl transition-transform ${isPlaying ? 'animate-bounce' : ''}`}>
            🎵
          </span>
          <span className={`text-5xl transition-transform ${isPlaying ? 'animate-wiggle' : ''}`}>
            {isPlaying && activeLineIndex >= 0 ? song.lyrics[activeLineIndex].action : '🐶'}
          </span>
          <span className={`text-4xl transition-transform ${isPlaying ? 'animate-bounce' : ''}`}>
            🎶
          </span>
          <p className="text-xs sm:text-sm font-extrabold text-purple-950">
            {isPlaying 
              ? '¡Sigue la letra iluminada y canta conmigo!' 
              : 'Presiona "Cantar Todo" o toca cada verso para escucharlo.'}
          </p>
        </div>

        {/* Synchronized Lyrics Container */}
        <div className="space-y-3 max-w-2xl mx-auto my-4">
          {song.lyrics.map((item, index) => {
            const isCurrent = activeLineIndex === index;

            return (
              <div
                key={index}
                onClick={() => handlePlaySingleLine(index)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-purple-600 border-purple-700 text-white scale-103 shadow-lg ring-4 ring-purple-200'
                    : 'bg-purple-50/60 hover:bg-purple-100/80 border-purple-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl shrink-0">{item.action || '⭐'}</span>
                  <div>
                    <p className={`font-black text-base sm:text-lg leading-snug ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                      {item.line}
                    </p>
                    {showSpanish && (
                      <p className={`text-xs font-semibold mt-0.5 ${isCurrent ? 'text-purple-200' : 'text-purple-800'}`}>
                        🇨🇱 {item.spanish}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className={`p-2 rounded-xl shrink-0 ${
                    isCurrent ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 hover:bg-purple-200 shadow-sm'
                  }`}
                  title="Escuchar este verso"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
