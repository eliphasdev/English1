import React, { useState } from 'react';
import { 
  ANIMALS, 
  ADJECTIVES, 
  OPPOSITES, 
  COLORS, 
  DESCRIBING_SENTENCES, 
  GRAMMAR_EXAMPLES,
  Animal 
} from '../data/curriculum';
import { SpeechService, sfx, triggerCelebration } from '../utils/soundAndSpeech';
import { Volume2, Turtle, Mic, ArrowRightLeft, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

interface VocabularySectionProps {
  isSlowAudio: boolean;
  showSpanish: boolean;
  onSelectForMicPractice: (phrase: string, spanish: string, emoji: string) => void;
  onAddStar: (count: number) => void;
}

type VocabCategory = 'animals' | 'adjectives' | 'opposites' | 'colors' | 'sentences' | 'grammar';

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  isSlowAudio,
  showSpanish,
  onSelectForMicPractice,
  onAddStar
}) => {
  const [activeCategory, setActiveCategory] = useState<VocabCategory>('animals');
  const [activeAnimalSentenceMode, setActiveAnimalSentenceMode] = useState<Record<string, 'word' | 'this_is' | 'desc'>>({});
  const [listenedItems, setListenedItems] = useState<Set<string>>(new Set());

  const handlePlayWord = (text: string, id: string, forceSlow: boolean = false) => {
    sfx.playPop();
    SpeechService.speakEnglish(text, forceSlow || isSlowAudio);
    
    // Reward curiosity if first time listening
    if (!listenedItems.has(id)) {
      const next = new Set(listenedItems);
      next.add(id);
      setListenedItems(next);
      if (next.size % 4 === 0) {
        onAddStar(1);
        triggerCelebration('small');
      }
    }
  };

  const handlePlaySpanish = (spanishText: string) => {
    sfx.playPop();
    SpeechService.speakSpanish(spanishText);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {[
          { id: 'animals' as VocabCategory, label: '12 Animales', emoji: '🐾', count: '12' },
          { id: 'adjectives' as VocabCategory, label: '6 Adjetivos', emoji: '📏', count: '6' },
          { id: 'opposites' as VocabCategory, label: 'Opuestos', emoji: '⚡', count: '3' },
          { id: 'colors' as VocabCategory, label: '12 Colores', emoji: '🎨', count: '12' },
          { id: 'sentences' as VocabCategory, label: '4 Oraciones', emoji: '📝', count: '4' },
          { id: 'grammar' as VocabCategory, label: 'Gramática', emoji: '📖', count: '2' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sfx.playPop();
              setActiveCategory(cat.id);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm sm:text-base font-extrabold whitespace-nowrap transition-all shadow-sm border-2 ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                : 'bg-white hover:bg-amber-50 text-amber-950 border-amber-200'
            }`}
          >
            <span className="text-xl">{cat.emoji}</span>
            <span>{cat.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeCategory === cat.id ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* SECTION 1: ANIMALS */}
      {activeCategory === 'animals' && (
        <div>
          <div className="mb-4 bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2">
                <span>🐾</span> 1. Animals and Pets (Animales y Mascotas)
              </h2>
              <p className="text-sm font-semibold text-amber-800">
                Toca cada animal para escuchar su nombre en inglés. ¡Usa 🐢 para escuchar más lento o 🎙️ para practicar con tu voz!
              </p>
            </div>
            <div className="text-xs font-extrabold text-amber-900 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-300">
              {listenedItems.size} escuchados
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ANIMALS.map(animal => {
              const mode = activeAnimalSentenceMode[animal.id] || 'word';
              const isHeard = listenedItems.has(animal.id);

              return (
                <div
                  key={animal.id}
                  className={`bg-white rounded-3xl border-3 transition-all hover:shadow-xl overflow-hidden flex flex-col justify-between ${
                    animal.bgGradient
                  }`}
                >
                  <div className="p-4 flex-1">
                    {/* Top badge and emoji */}
                    <div className="flex items-start justify-between">
                      <span className="text-5xl sm:text-6xl p-2 bg-white/70 rounded-2xl shadow-inner animate-bounce-gentle">
                        {animal.emoji}
                      </span>
                      <div className="flex flex-col items-end gap-1">
                        {isHeard && (
                          <span className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3" /> ¡Escuchado!
                          </span>
                        )}
                        <span className="text-xs font-black text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                          {animal.soundName}
                        </span>
                      </div>
                    </div>

                    {/* Word display */}
                    <div className="mt-3">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                          {animal.english}
                        </h3>
                        <span className="text-xs font-bold text-slate-500 italic">
                          /{animal.phonetic}/
                        </span>
                      </div>

                      {showSpanish && (
                        <p className="text-sm font-bold text-amber-900 mt-0.5 flex items-center gap-1">
                          🇨🇱 {animal.spanish}
                          <button
                            onClick={() => handlePlaySpanish(animal.spanish)}
                            className="text-amber-700 hover:text-amber-900 ml-1 p-1"
                            title="Escuchar en español"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </p>
                      )}

                      <p className="text-xs font-medium text-slate-600 mt-2 bg-white/60 p-2 rounded-xl">
                        💡 {animal.funFact}
                      </p>
                    </div>

                    {/* Sentences with this animal */}
                    <div className="mt-3 pt-3 border-t border-black/10">
                      <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500 mb-1">
                        Oraciones de ejemplo:
                      </p>
                      <div className="space-y-1.5">
                        <div className="bg-white/90 p-2 rounded-xl border border-black/10 flex items-center justify-between gap-1 text-xs">
                          <div>
                            <p className="font-extrabold text-indigo-900">{animal.sampleSentence}</p>
                            {showSpanish && <p className="text-[11px] text-slate-600">{animal.sentenceSpanish}</p>}
                          </div>
                          <button
                            onClick={() => handlePlayWord(animal.sampleSentence, `${animal.id}-sentence`)}
                            className="p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg shrink-0"
                            title="Escuchar oración completa"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-3 bg-white/80 border-t border-black/10 grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => handlePlayWord(animal.english, animal.id, false)}
                      className="flex items-center justify-center gap-1 py-2 px-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition-transform active:scale-95"
                      title="Escuchar pronunciación"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Oír</span>
                    </button>

                    <button
                      onClick={() => handlePlayWord(animal.english, animal.id, true)}
                      className="flex items-center justify-center gap-1 py-2 px-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition-transform active:scale-95"
                      title="Escuchar despacio como tortuga"
                    >
                      <Turtle className="w-4 h-4" />
                      <span>Lento</span>
                    </button>

                    <button
                      onClick={() => {
                        sfx.playPop();
                        onSelectForMicPractice(animal.english, animal.spanish, animal.emoji);
                      }}
                      className="flex items-center justify-center gap-1 py-2 px-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition-transform active:scale-95"
                      title="Practicar con el micrófono"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Repetir</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: ADJECTIVES */}
      {activeCategory === 'adjectives' && (
        <div>
          <div className="mb-4 bg-emerald-100/80 border-2 border-emerald-300 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 flex items-center gap-2">
              <span>📏</span> 2. Adjectives (Adjetivos: Grande, Pequeño, Alto, Bajo, Rápido, Lento)
            </h2>
            <p className="text-sm font-semibold text-emerald-800">
              Los adjetivos nos dicen cómo son los animales. Escucha cada uno y mira los ejemplos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADJECTIVES.map(adj => (
              <div
                key={adj.id}
                className="bg-white rounded-3xl border-3 border-emerald-200 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-5xl p-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                      {adj.emoji}
                    </span>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Adjective
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-2">
                    {adj.english}
                    <span className="text-xs font-bold text-slate-500 italic">/{adj.phonetic}/</span>
                  </h3>

                  {showSpanish && (
                    <p className="text-base font-bold text-emerald-900 mt-1 flex items-center gap-1">
                      🇨🇱 {adj.spanish}
                      <button
                        onClick={() => handlePlaySpanish(adj.spanish)}
                        className="text-emerald-700 hover:text-emerald-900 p-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </p>
                  )}

                  <div className="mt-4 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
                    <p className="text-xs font-extrabold text-emerald-900 uppercase">Ejemplo del temario:</p>
                    <p className="text-sm font-black text-slate-800 mt-1">
                      {adj.exampleAnimal} <span className="font-medium text-slate-600">({adj.exampleSpanish})</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => handlePlayWord(adj.english, adj.id)}
                    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Escuchar</span>
                  </button>
                  <button
                    onClick={() => {
                      sfx.playPop();
                      onSelectForMicPractice(adj.english, adj.spanish, adj.emoji);
                    }}
                    className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Practicar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: OPPOSITES */}
      {activeCategory === 'opposites' && (
        <div>
          <div className="mb-4 bg-blue-100/80 border-2 border-blue-300 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-blue-950 flex items-center gap-2">
              <span>⚡</span> 3. Opposite Adjectives (Adjetivos Opuestos)
            </h2>
            <p className="text-sm font-semibold text-blue-800">
              ¡Los contrarios! Big es lo opuesto de Small, Tall es lo opuesto de Short, Fast es lo opuesto de Slow.
            </p>
          </div>

          <div className="space-y-4">
            {OPPOSITES.map(pair => (
              <div
                key={pair.id}
                className="bg-white rounded-3xl border-3 border-blue-200 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Left Adj */}
                  <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{pair.emoji1}</span>
                      <div>
                        <h4 className="text-2xl font-black text-blue-950">{pair.adj1}</h4>
                        <p className="text-sm font-bold text-blue-800">{pair.adj1Spanish}</p>
                        <p className="text-xs font-semibold text-slate-600 mt-1">Ej: {pair.example1}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => handlePlayWord(pair.adj1, `opp-${pair.adj1}`)}
                        className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-sm"
                        title="Escuchar"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onSelectForMicPractice(pair.adj1, pair.adj1Spanish, pair.emoji1)}
                        className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 shadow-sm"
                        title="Hablar"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Adj (Opposite) */}
                  <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{pair.emoji2}</span>
                      <div>
                        <h4 className="text-2xl font-black text-amber-950">{pair.adj2}</h4>
                        <p className="text-sm font-bold text-amber-800">{pair.adj2Spanish}</p>
                        <p className="text-xs font-semibold text-slate-600 mt-1">Ej: {pair.example2}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => handlePlayWord(pair.adj2, `opp-${pair.adj2}`)}
                        className="p-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 shadow-sm"
                        title="Escuchar"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onSelectForMicPractice(pair.adj2, pair.adj2Spanish, pair.emoji2)}
                        className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 shadow-sm"
                        title="Hablar"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    {pair.adj1} es lo opuesto de {pair.adj2}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: COLORS */}
      {activeCategory === 'colors' && (
        <div>
          <div className="mb-4 bg-purple-100/80 border-2 border-purple-300 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-purple-950 flex items-center gap-2">
              <span>🎨</span> 4. Colors (12 Colores en Inglés)
            </h2>
            <p className="text-sm font-semibold text-purple-800">
              Aprende a nombrar los 12 colores del temario escolar con divertidos animales.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {COLORS.map(col => (
              <div
                key={col.id}
                className="bg-white rounded-3xl border-3 border-purple-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center justify-between"
              >
                {/* Color preview circle */}
                <div
                  className={`w-16 h-16 rounded-full shadow-md border-3 flex items-center justify-center text-2xl transition-transform hover:scale-110 cursor-pointer ${col.borderClass}`}
                  style={{ backgroundColor: col.hex }}
                  onClick={() => handlePlayWord(col.english, col.id)}
                  title="Haz clic para escuchar el color"
                >
                  <Volume2 className={`w-6 h-6 ${col.textColor} opacity-90`} />
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {col.english}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500 italic">
                    /{col.phonetic}/
                  </span>
                  {showSpanish && (
                    <p className="text-xs font-bold text-purple-900 mt-0.5">
                      {col.spanish}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-600 font-medium mt-1">
                    {col.exampleItem}
                  </p>
                </div>

                <div className="w-full mt-3 pt-2 border-t border-slate-100 flex gap-1">
                  <button
                    onClick={() => handlePlayWord(col.english, col.id)}
                    className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm"
                    title="Escuchar"
                  >
                    🔊
                  </button>
                  <button
                    onClick={() => onSelectForMicPractice(col.english, col.spanish, '🎨')}
                    className="flex-1 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm"
                    title="Repetir"
                  >
                    🎙️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: DESCRIBING SENTENCES */}
      {activeCategory === 'sentences' && (
        <div>
          <div className="mb-4 bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2">
              <span>📝</span> 5. Describing Animals (4 Oraciones del Cuaderno)
            </h2>
            <p className="text-sm font-semibold text-amber-800">
              Estas son las oraciones exactas para aprender y practicar en primero básico:
            </p>
          </div>

          <div className="space-y-4">
            {DESCRIBING_SENTENCES.map((sent, index) => (
              <div
                key={sent.id}
                className="bg-white rounded-3xl border-3 border-amber-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-4xl shadow-inner shrink-0">
                    {sent.emoji}
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Oración {index + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {sent.english}
                    </h3>
                    <p className="text-sm font-bold text-amber-900 mt-0.5">
                      🇨🇱 {sent.spanish}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                        Animal: {sent.animal}
                      </span>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                        Adjetivo 1: {sent.adj1}
                      </span>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                        Adjetivo 2: {sent.adj2}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => handlePlayWord(sent.english, sent.id, false)}
                    className="flex items-center gap-1.5 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-extrabold text-sm shadow-md active:scale-95"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Escuchar</span>
                  </button>

                  <button
                    onClick={() => handlePlayWord(sent.english, sent.id, true)}
                    className="flex items-center gap-1.5 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-extrabold text-sm shadow-md active:scale-95"
                    title="Escuchar lento"
                  >
                    <Turtle className="w-5 h-5" />
                    <span>Lento</span>
                  </button>

                  <button
                    onClick={() => onSelectForMicPractice(sent.english, sent.spanish, sent.emoji)}
                    className="flex items-center gap-1.5 py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-extrabold text-sm shadow-md active:scale-95"
                  >
                    <Mic className="w-5 h-5" />
                    <span>Repetir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: GRAMMAR */}
      {activeCategory === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-indigo-100/80 border-2 border-indigo-300 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-indigo-950 flex items-center gap-2">
              <span>📖</span> 6. Grammar (Gramática Básica para 1° Básico)
            </h2>
            <p className="text-sm font-semibold text-indigo-800">
              Aprende las 2 fórmulas mágicas para hablar de tus mascotas y animales favoritos.
            </p>
          </div>

          {/* Grammar Rule 1: The + animal + is + adj + and + adj */}
          <div className="bg-white rounded-3xl border-3 border-indigo-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                Fórmula 1: Describir Animales
              </span>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-black text-indigo-950">
                <span className="px-3 py-1 bg-white rounded-xl shadow-sm border border-indigo-200 text-blue-700">The</span>
                <span>+</span>
                <span className="px-3 py-1 bg-white rounded-xl shadow-sm border border-indigo-200 text-amber-700">animal</span>
                <span>+</span>
                <span className="px-3 py-1 bg-white rounded-xl shadow-sm border border-indigo-200 text-emerald-700">is</span>
                <span>+</span>
                <span className="px-3 py-1 bg-white rounded-xl shadow-sm border border-indigo-200 text-rose-700">adjective</span>
                <span>+</span>
                <span className="px-3 py-1 bg-white rounded-xl shadow-sm border border-indigo-200 text-indigo-700">and</span>
                <span>+</span>
                <span className="px-3 py-1 bg-white rounded-xl shadow-sm border border-indigo-200 text-rose-700">adjective</span>
              </div>
            </div>

            <h4 className="font-extrabold text-sm text-slate-700 mt-4 mb-2">Ejemplos para escuchar y repetir:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { en: 'The dog is big and fast.', es: 'El perro es grande y rápido.', emoji: '🐶' },
                { en: 'The cat is small and slow.', es: 'El gato es pequeño y lento.', emoji: '🐱' },
                { en: 'The rabbit is fast and small.', es: 'El conejo es rápido y pequeño.', emoji: '🐰' },
                { en: 'The turtle is slow and small.', es: 'La tortuga es lenta y pequeña.', emoji: '🐢' },
              ].map((ex, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-2xl mr-2">{ex.emoji}</span>
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">{ex.en}</span>
                    <p className="text-xs font-semibold text-slate-600 ml-8">{ex.es}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handlePlayWord(ex.en, `gram-1-${i}`)}
                      className="p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 shadow-sm"
                      title="Escuchar"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectForMicPractice(ex.en, ex.es, ex.emoji)}
                      className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 shadow-sm"
                      title="Repetir con micrófono"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grammar Rule 2: This is */}
          <div className="bg-white rounded-3xl border-3 border-teal-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-teal-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                Fórmula 2: Presentar Animales
              </span>
            </div>

            <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border-2 border-teal-300 text-center">
              <p className="text-xl sm:text-2xl font-black text-teal-950">
                <span className="text-teal-600">This is</span> = &ldquo;Esto es / Este es / Esta es&rdquo;
              </p>
              <p className="text-sm font-bold text-teal-800 mt-1">
                Estructura: <span className="font-black">This is a + animal</span>
              </p>
            </div>

            <h4 className="font-extrabold text-sm text-slate-700 mt-4 mb-2">Ejemplos para escuchar y repetir:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { en: 'This is a dog.', es: 'Este es un perro.', emoji: '🐶' },
                { en: 'This is a cat.', es: 'Este es un gato.', emoji: '🐱' },
                { en: 'This is a rabbit.', es: 'Este es un conejo.', emoji: '🐰' },
                { en: 'This is a bird.', es: 'Este es un pájaro.', emoji: '🐦' },
              ].map((ex, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-2xl mr-2">{ex.emoji}</span>
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">{ex.en}</span>
                    <p className="text-xs font-semibold text-slate-600 ml-8">{ex.es}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handlePlayWord(ex.en, `gram-2-${i}`)}
                      className="p-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 shadow-sm"
                      title="Escuchar"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectForMicPractice(ex.en, ex.es, ex.emoji)}
                      className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 shadow-sm"
                      title="Repetir con micrófono"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
