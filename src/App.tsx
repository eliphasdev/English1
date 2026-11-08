/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { VocabularySection } from './components/VocabularySection';
import { MagicMicSection } from './components/MagicMicSection';
import { GamesSection } from './components/GamesSection';
import { SongsSection } from './components/SongsSection';
import { RewardsSection } from './components/RewardsSection';
import { ParentGuideModal } from './components/ParentGuideModal';
import { SpeechService, sfx, triggerCelebration } from './utils/soundAndSpeech';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('vocabulary');
  const [stars, setStars] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safari_kids_stars');
      return saved ? parseInt(saved, 10) : 5; // Start with 5 starter stars!
    }
    return 5;
  });
  const [isSlowAudio, setIsSlowAudio] = useState<boolean>(false);
  const [showSpanish, setShowSpanish] = useState<boolean>(true);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Selected item passed directly to Mic practice
  const [micTargetPhrase, setMicTargetPhrase] = useState<{
    phrase: string;
    spanish: string;
    emoji: string;
  } | null>(null);

  // Initialize Speech synthesis voice cache on first user interaction
  useEffect(() => {
    SpeechService.init();
  }, []);

  // Save stars to local storage
  const handleAddStar = (count: number) => {
    setStars(prev => {
      const next = prev + count;
      if (typeof window !== 'undefined') {
        localStorage.setItem('safari_kids_stars', next.toString());
      }
      return next;
    });
  };

  const handleSelectForMicPractice = (phrase: string, spanish: string, emoji: string) => {
    setMicTargetPhrase({ phrase, spanish, emoji });
    setCurrentTab('mic');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] font-['Fredoka'] text-slate-800">
      {/* Top Header */}
      <Header
        stars={stars}
        isSlowAudio={isSlowAudio}
        setIsSlowAudio={setIsSlowAudio}
        showSpanish={showSpanish}
        setShowSpanish={setShowSpanish}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Tab Navigation */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'vocabulary' && (
          <VocabularySection
            isSlowAudio={isSlowAudio}
            showSpanish={showSpanish}
            onSelectForMicPractice={handleSelectForMicPractice}
            onAddStar={handleAddStar}
          />
        )}

        {currentTab === 'mic' && (
          <MagicMicSection
            initialPhrase={micTargetPhrase}
            isSlowAudio={isSlowAudio}
            showSpanish={showSpanish}
            onAddStar={handleAddStar}
          />
        )}

        {currentTab === 'games' && (
          <GamesSection
            isSlowAudio={isSlowAudio}
            showSpanish={showSpanish}
            onAddStar={handleAddStar}
          />
        )}

        {currentTab === 'songs' && (
          <SongsSection
            isSlowAudio={isSlowAudio}
            showSpanish={showSpanish}
            onAddStar={handleAddStar}
          />
        )}

        {currentTab === 'album' && (
          <RewardsSection
            stars={stars}
          />
        )}
      </main>

      {/* Pedagogical & Parents Guide Modal */}
      <ParentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Cheerful Footer */}
      <footer className="bg-amber-100/80 border-t-2 border-amber-200 py-4 px-4 text-center text-xs text-amber-900 font-bold">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 justify-center">
            <span>🐾</span>
            <span>Safari Kids English • Unidad &ldquo;Animals and Pets&rdquo; • 1° Básico</span>
          </p>
          <p className="flex items-center gap-1 justify-center text-amber-800">
            Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para aprender jugando
          </p>
        </div>
      </footer>
    </div>
  );
}
