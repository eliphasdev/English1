# Safari Kids English - Animales y Mascotas 🐾

App interactiva en React + Vite + Tailwind CSS diseñada especialmente para niños de 7 años (1° básico) para aprender y practicar inglés escolar.

## Contenidos del Temario Incluidos
1. **12 Animales y Mascotas:** Hen, Chicken, Rabbit, Bird, Dog, Fish, Cat, Turtle, Parrot, Hamster, Spider, Snail.
2. **6 Adjetivos:** Big, Small, Tall, Short, Fast, Slow.
3. **3 Pares de Opuestos:** Big ↔ Small, Tall ↔ Short, Fast ↔ Slow.
4. **12 Colores:** Blue, Red, Orange, Yellow, Pink, Purple, Green, Black, White, Brown, Gray / Grey, Light blue.
5. **4 Oraciones de Descripción del Cuaderno:**
   - *The rabbit is fast and small.*
   - *The snail is slow and small.*
   - *The turtle is slow and small.*
   - *The hamster is fast and small.*
6. **Gramática Básica:**
   - Estructura: `The + animal + is + adjective + and + adjective.` (Ej: *The dog is big and fast*, *The cat is small and slow*).
   - Expresión: `This is a/an...` (Ej: *This is a dog*, *This is a cat*).
7. **Juegos y Audios:**
   - Reconocimiento de voz en tiempo real con micrófono y estrellas evaluativas.
   - Audios con velocidad normal 🐰 y velocidad lenta 🐢.
   - Rompecabezas de oraciones (Sentence Builder).
   - Parejas de opuestos.
   - Quiz auditivo y Memorice safari.
   - 4 Canciones infantiles con karaoke interactivo.
   - Álbum de stickers y diploma descargable.

---

## 🚀 Cómo Publicar en GitHub Pages

La app ya está preparada con rutas relativas (`base: './'`) y el archivo de despliegue automático `.github/workflows/deploy.yml`.

### Opción 1: Publicación Automática con GitHub Actions (Recomendada)
1. Sube este proyecto a tu repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Safari Kids English"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, ve a tu repositorio y entra en **Settings** > **Pages** (en el menú izquierdo).
3. En **Build and deployment > Source**, selecciona **GitHub Actions**.
4. ¡Listo! El workflow `.github/workflows/deploy.yml` compilará y publicará la web automáticamente en:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

### Opción 2: Compilación Local y Subida de la carpeta `dist`
```bash
npm run build
```
La carpeta generada `dist` contiene el sitio web listo para alojar en GitHub Pages o cualquier servidor estático.
