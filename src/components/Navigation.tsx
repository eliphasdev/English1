import React from 'react';
import { BookOpen, Mic, Gamepad2, Music, Award } from 'lucide-react';
import { sfx } from '../utils/soundAndSpeech';

export type TabType = 'vocabulary' | 'mic' | 'games' | 'songs' | 'album';

interface NavigationProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    {
      id: 'vocabulary' as TabType,
      label: 'Vocabulario',
      sub: 'Aprende y Escucha',
      icon: BookOpen,
      emoji: '🦁',
      color: 'from-amber-400 to-orange-500',
      activeBg: 'bg-amber-500 text-white shadow-amber-300',
      inactiveBg: 'bg-white hover:bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      id: 'mic' as TabType,
      label: 'Micrófono Mágico',
      sub: '¡Habla y Repite!',
      icon: Mic,
      emoji: '🎙️',
      color: 'from-rose-400 to-red-500',
      activeBg: 'bg-rose-500 text-white shadow-rose-300',
      inactiveBg: 'bg-white hover:bg-rose-50 text-rose-900 border-rose-200'
    },
    {
      id: 'games' as TabType,
      label: 'Juegos',
      sub: 'Puzzles y Retos',
      icon: Gamepad2,
      emoji: '🎮',
      color: 'from-emerald-400 to-teal-500',
      activeBg: 'bg-emerald-500 text-white shadow-emerald-300',
      inactiveBg: 'bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      id: 'songs' as TabType,
      label: 'Canciones',
      sub: 'Karaoke y Ritmo',
      icon: Music,
      emoji: '🎵',
      color: 'from-purple-400 to-indigo-500',
      activeBg: 'bg-purple-600 text-white shadow-purple-300',
      inactiveBg: 'bg-white hover:bg-purple-50 text-purple-900 border-purple-200'
    },
    {
      id: 'album' as TabType,
      label: 'Mi Álbum',
      sub: 'Stickers y Logros',
      icon: Award,
      emoji: '🏆',
      color: 'from-yellow-400 to-amber-500',
      activeBg: 'bg-yellow-500 text-yellow-950 shadow-yellow-300',
      inactiveBg: 'bg-white hover:bg-yellow-50 text-yellow-950 border-yellow-200'
    }
  ];

  return (
    <nav className="max-w-6xl mx-auto px-4 pt-4 pb-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sfx.playPop();
                setCurrentTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 transition-all duration-200 select-none shadow-md ${
                isActive
                  ? `${tab.activeBg} scale-102 ring-2 ring-offset-2 ring-amber-400`
                  : `${tab.inactiveBg} hover:scale-101 hover:shadow-lg`
              }`}
            >
              <div className="flex items-center gap-1.5 text-2xl sm:text-3xl mb-1">
                <span>{tab.emoji}</span>
              </div>
              <span className="font-extrabold text-sm sm:text-base leading-tight">
                {tab.label}
              </span>
              <span className={`text-[10px] sm:text-xs font-semibold opacity-90 mt-0.5 ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
