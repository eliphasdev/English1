import React from 'react';
import { X, BookOpen, Mic, CheckCircle2, HeartHandshake, Github, Sparkles } from 'lucide-react';
import { sfx } from '../utils/soundAndSpeech';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border-4 border-amber-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            sfx.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-3xl shadow-md">
            🐾
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-950">
              Guía del Temario • 1° Básico
            </h3>
            <p className="text-xs font-bold text-amber-700">
              Animals and Pets (Animales y Mascotas) • 7 años
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm text-slate-700">
          {/* Pedagogical tip for 7-year-olds */}
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
            <h4 className="font-black text-amber-950 flex items-center gap-2 mb-1">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              ¿Cómo aprende un niño de 7 años?
            </h4>
            <p className="text-xs leading-relaxed text-amber-900">
              A los 7 años (1° básico), el aprendizaje del inglés es 100% natural a través de la asociación visual, el ritmo de las canciones, el juego y la imitación auditiva. No se busca memorizar reglas gramaticales complejas, sino familiarizarse con estructuras cotidianas como <em>&ldquo;This is a dog&rdquo;</em> y <em>&ldquo;The rabbit is fast and small&rdquo;</em>.
            </p>
          </div>

          {/* Quick Syllabus summary */}
          <div>
            <h4 className="font-black text-slate-900 text-base mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Resumen del Temario Incluido:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <strong>12 Animales:</strong> Hen, Chicken, Rabbit, Bird, Dog, Fish, Cat, Turtle, Parrot, Hamster, Spider, Snail.
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <strong>6 Adjetivos:</strong> Big, Small, Tall, Short, Fast, Slow.
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <strong>3 Opuestos:</strong> Big-Small, Tall-Short, Fast-Slow.
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <strong>12 Colores:</strong> Blue, Red, Orange, Yellow, Pink, Purple, Green, Black, White, Brown, Gray, Light blue.
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 sm:col-span-2">
                <strong>4 Oraciones de descripción:</strong>
                <div className="mt-1 font-mono text-[11px] text-slate-600">
                  • The rabbit is fast and small.<br />
                  • The snail is slow and small.<br />
                  • The turtle is slow and small.<br />
                  • The hamster is fast and small.
                </div>
              </li>
              <li className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 sm:col-span-2">
                <strong>Gramática básica:</strong>
                <div className="mt-1 text-[11px] text-slate-600">
                  • <code>The + animal + is + adj + and + adj</code> (The dog is big and fast)<br />
                  • <code>This is + a/an + animal</code> (This is a dog, This is a cat)
                </div>
              </li>
            </ul>
          </div>

          {/* Microphone and Audio Tips */}
          <div>
            <h4 className="font-black text-slate-900 text-base mb-2 flex items-center gap-2">
              <Mic className="w-5 h-5 text-rose-600" />
              Consejos para la Pronunciación y Micrófono:
            </h4>
            <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1.5">
              <p>• Usa el botón <strong>🐢 Audio Lento</strong> para que el niño escuche cada sílaba pausada.</p>
              <p>• En el <strong>Micrófono Mágico</strong>, felicita al niño sin importar las estrellas; ¡el refuerzo positivo genera confianza para hablar en inglés!</p>
              <p>• Si el navegador restringe el micrófono en tu dispositivo, el botón <em>&ldquo;Simular pronunciación&rdquo;</em> permite seguir jugando sin frustraciones.</p>
            </div>
          </div>

          {/* GitHub Pages Note & Download Buttons */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl border-2 border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-black text-amber-300 flex items-center gap-2 text-base">
                <Github className="w-5 h-5 text-white" />
                Publicar en GitHub Pages (Todo listo)
              </h4>
              <span className="text-[10px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full">
                ✓ Listo para subir
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Hemos dejado el proyecto configurado con <code>base: &apos;./&apos;</code> y el workflow automático <code>.github/workflows/deploy.yml</code>. Puedes descargarlo en ZIP o subirlo directamente:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <a
                href="/safari-kids-english-source.zip"
                download="safari-kids-english-source.zip"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-transform active:scale-95"
              >
                <span>📦 Descargar Código Fuente (ZIP)</span>
              </a>
              <a
                href="/safari-kids-english-dist.zip"
                download="safari-kids-english-dist.zip"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-transform active:scale-95"
              >
                <span>🚀 Descargar Web Compilada (dist)</span>
              </a>
            </div>

            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs font-mono text-emerald-400">
              <p className="text-[10px] text-slate-400 mb-1 font-sans font-bold">Comando para conectar a tu repositorio de GitHub:</p>
              <code>git remote add origin https://github.com/TU-USUARIO/TU-REPO.git</code><br />
              <code>git push -u origin main</code>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sfx.playPop();
              onClose();
            }}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md"
          >
            ¡Entendido, a jugar! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
