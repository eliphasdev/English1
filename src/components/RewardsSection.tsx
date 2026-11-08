import React, { useState } from 'react';
import { STICKERS, LEARNING_OBJECTIVES } from '../data/curriculum';
import { sfx, triggerCelebration } from '../utils/soundAndSpeech';
import { Award, Star, Lock, CheckCircle2, Sparkles, Printer, UserCheck } from 'lucide-react';

interface RewardsSectionProps {
  stars: number;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({ stars }) => {
  const [studentName, setStudentName] = useState<string>('Explorador/a Estrella');
  const [showDiploma, setShowDiploma] = useState<boolean>(false);

  const handlePrint = () => {
    sfx.playPop();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Banner with Total Stars */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-4 border-amber-300">
        <div className="text-center sm:text-left">
          <span className="px-3 py-1 bg-white/80 rounded-full text-xs font-black uppercase tracking-wider text-amber-900 border border-amber-200">
            🏆 Logros y Recompensas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">
            ¡Tu Álbum Safari de Inglés!
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-900 mt-1">
            Gana estrellas practicando vocabulario, jugando y hablando en el micrófono.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white/90 px-6 py-4 rounded-3xl border-3 border-amber-400 shadow-lg shrink-0">
          <Star className="w-12 h-12 text-amber-500 fill-amber-400 animate-pulse-gentle" />
          <span className="text-4xl font-black text-amber-950 mt-1">{stars}</span>
          <span className="text-xs font-black uppercase tracking-wider text-amber-800">
            Estrellas Ganadas
          </span>
        </div>
      </div>

      {/* 1. STICKER ALBUM */}
      <div className="bg-white rounded-3xl border-4 border-yellow-200 p-6 sm:p-8 shadow-xl mb-8">
        <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <span>⭐</span> Colección de Stickers Mágicos
        </h3>
        <p className="text-sm font-semibold text-slate-600 mb-6">
          Desbloquea cada sticker llegando al número de estrellas indicado:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STICKERS.map(stk => {
            const isUnlocked = stars >= stk.unlockedAtStars;

            return (
              <div
                key={stk.id}
                onClick={() => {
                  if (isUnlocked) {
                    sfx.playSuccess();
                    triggerCelebration('small');
                  } else {
                    sfx.playGentleTryAgain();
                  }
                }}
                className={`p-4 rounded-3xl border-3 flex flex-col items-center text-center transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-yellow-50 to-amber-100 border-amber-400 shadow-md hover:scale-105 active:scale-95'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-75'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-2 bg-white shadow-inner">
                  {isUnlocked ? (
                    <span>{stk.icon}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <p className="font-black text-xs sm:text-sm text-slate-900 line-clamp-1">
                  {stk.name}
                </p>

                <p className="text-[10px] font-bold text-slate-500 mt-1">
                  {isUnlocked ? (
                    <span className="text-emerald-700 flex items-center justify-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> ¡Desbloqueado!
                    </span>
                  ) : (
                    `Requiere ${stk.unlockedAtStars} ⭐`
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. THE 7 LEARNING OBJECTIVES CHECKLIST */}
      <div className="bg-white rounded-3xl border-4 border-emerald-200 p-6 sm:p-8 shadow-xl mb-8">
        <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <span>🎯</span> Objetivos de Aprendizaje (Temario Oficial 1° Básico)
        </h3>
        <p className="text-sm font-semibold text-slate-600 mb-6">
          Verificación de logros de la unidad Animals and Pets:
        </p>

        <div className="space-y-3">
          {LEARNING_OBJECTIVES.map((obj, idx) => {
            // Unlocked progressively with user activity
            const isCompleted = stars >= (idx + 1) * 3;

            return (
              <div
                key={obj.id}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 ${
                  isCompleted
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                    isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <p className="font-extrabold text-sm sm:text-base">
                    {obj.text}
                  </p>
                </div>

                {isCompleted ? (
                  <span className="flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-4 h-4" /> Logrado
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full shrink-0">
                    En progreso
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DIPLOMA / CERTIFICATE */}
      <div className="bg-white rounded-3xl border-4 border-indigo-200 p-6 sm:p-8 shadow-xl text-center">
        <div className="max-w-md mx-auto mb-6">
          <h3 className="text-2xl font-black text-slate-900 mb-1">
            📜 Diploma Oficial de Safari en Inglés
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-4">
            Escribe tu nombre para ver y descargar tu diploma de primer año básico:
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Escribe el nombre del niño/a"
              className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-indigo-300 font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => {
                sfx.playSuccess();
                setShowDiploma(!showDiploma);
                if (!showDiploma) triggerCelebration('large');
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-md"
            >
              {showDiploma ? 'Ocultar' : 'Ver Diploma'}
            </button>
          </div>
        </div>

        {showDiploma && (
          <div className="mt-6 border-8 border-double border-amber-500 bg-amber-50/50 p-8 rounded-3xl shadow-2xl relative max-w-2xl mx-auto text-center font-['Fredoka']">
            <div className="flex justify-between items-center text-4xl mb-2">
              <span>🦁</span>
              <span>⭐</span>
              <span>🏆</span>
              <span>⭐</span>
              <span>🐰</span>
            </div>

            <h4 className="text-xs uppercase tracking-widest font-black text-amber-800">
              Certificado de Aprendizaje
            </h4>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-950 my-3">
              DIPLOMA DE INGLÉS
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Otorgado con orgullo al estudiante de Primero Básico:
            </p>

            <h3 className="text-3xl font-black text-indigo-900 my-4 underline decoration-amber-400 underline-offset-8">
              {studentName || 'Estudiante Safari'}
            </h3>

            <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mx-auto leading-relaxed">
              Por haber completado con éxito la unidad <span className="font-black text-amber-900">&ldquo;Animals and Pets&rdquo;</span>, demostrando dominio de los 12 animales, 12 colores, 6 adjetivos y opuestos, y excelente pronunciación en inglés.
            </p>

            <div className="flex justify-between items-end mt-8 pt-6 border-t-2 border-amber-300 text-xs font-bold text-slate-700">
              <div>
                <p className="border-b border-slate-400 pb-1 px-4">Profesor/a o Apoderado/a</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Firma de Felicitaciones</p>
              </div>

              <div className="w-16 h-16 rounded-full bg-amber-400 border-4 border-amber-600 flex items-center justify-center text-2xl shadow-lg">
                🏅
              </div>

              <div>
                <p className="border-b border-slate-400 pb-1 px-4">1° Básico</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Inglés Primaria</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Guardar Diploma</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
