export interface Animal {
  id: string;
  english: string;
  spanish: string;
  phonetic: string;
  emoji: string;
  colorTheme: string;
  bgGradient: string;
  defaultAdjectives: string[];
  sampleSentence: string;
  sentenceSpanish: string;
  soundName: string;
  funFact: string;
}

export interface Adjective {
  id: string;
  english: string;
  spanish: string;
  phonetic: string;
  emoji: string;
  exampleAnimal: string;
  exampleSpanish: string;
  oppositeId: string;
  colorTheme: string;
}

export interface OppositePair {
  id: string;
  adj1: string;
  adj2: string;
  adj1Spanish: string;
  adj2Spanish: string;
  example1: string;
  example2: string;
  emoji1: string;
  emoji2: string;
}

export interface ColorItem {
  id: string;
  english: string;
  spanish: string;
  phonetic: string;
  hex: string;
  textColor: string;
  borderClass: string;
  exampleItem: string;
}

export interface SentenceItem {
  id: string;
  english: string;
  spanish: string;
  animal: string;
  adj1: string;
  adj2: string;
  emoji: string;
}

export interface Song {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  lyrics: {
    line: string;
    spanish: string;
    action?: string;
  }[];
}

export const ANIMALS: Animal[] = [
  {
    id: 'hen',
    english: 'Hen',
    spanish: 'Gallina',
    phonetic: 'Hen',
    emoji: '🐔',
    colorTheme: 'from-amber-400 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-100 to-orange-200 border-amber-300 text-amber-900',
    defaultAdjectives: ['small', 'fast'],
    sampleSentence: 'This is a hen.',
    sentenceSpanish: 'Esta es una gallina.',
    soundName: 'Cluck cluck!',
    funFact: 'Hens lay eggs every morning! (¡Las gallinas ponen huevos cada mañana!)'
  },
  {
    id: 'chicken',
    english: 'Chicken',
    spanish: 'Pollo',
    phonetic: 'CHIK-en',
    emoji: '🐥',
    colorTheme: 'from-yellow-400 to-amber-500',
    bgGradient: 'bg-gradient-to-br from-yellow-100 to-amber-200 border-yellow-300 text-yellow-950',
    defaultAdjectives: ['small', 'fast'],
    sampleSentence: 'The chicken is small and fast.',
    sentenceSpanish: 'El pollo es pequeño y rápido.',
    soundName: 'Peep peep!',
    funFact: 'Baby chickens are very fluffy! (¡Los pollitos son muy suaves!)'
  },
  {
    id: 'rabbit',
    english: 'Rabbit',
    spanish: 'Conejo',
    phonetic: 'RAB-it',
    emoji: '🐰',
    colorTheme: 'from-pink-400 to-rose-500',
    bgGradient: 'bg-gradient-to-br from-pink-100 to-rose-200 border-pink-300 text-rose-950',
    defaultAdjectives: ['fast', 'small'],
    sampleSentence: 'The rabbit is fast and small.',
    sentenceSpanish: 'El conejo es rápido y pequeño.',
    soundName: 'Hop hop!',
    funFact: 'Rabbits have very long ears to hear well! (¡Los conejos tienen orejas largas!)'
  },
  {
    id: 'bird',
    english: 'Bird',
    spanish: 'Pájaro',
    phonetic: 'Berd',
    emoji: '🐦',
    colorTheme: 'from-sky-400 to-blue-500',
    bgGradient: 'bg-gradient-to-br from-sky-100 to-blue-200 border-sky-300 text-sky-950',
    defaultAdjectives: ['small', 'fast'],
    sampleSentence: 'This is a bird.',
    sentenceSpanish: 'Este es un pájaro.',
    soundName: 'Tweet tweet!',
    funFact: 'Birds love singing in the trees! (¡A los pájaros les encanta cantar!)'
  },
  {
    id: 'dog',
    english: 'Dog',
    spanish: 'Perro',
    phonetic: 'Dog',
    emoji: '🐶',
    colorTheme: 'from-amber-500 to-yellow-600',
    bgGradient: 'bg-gradient-to-br from-amber-100 to-yellow-200 border-amber-300 text-amber-950',
    defaultAdjectives: ['big', 'fast'],
    sampleSentence: 'The dog is big and fast.',
    sentenceSpanish: 'El perro es grande y rápido.',
    soundName: 'Woof woof!',
    funFact: 'Dogs are our best animal friends! (¡Los perros son los mejores amigos!)'
  },
  {
    id: 'fish',
    english: 'Fish',
    spanish: 'Pez',
    phonetic: 'Fish',
    emoji: '🐟',
    colorTheme: 'from-cyan-400 to-blue-600',
    bgGradient: 'bg-gradient-to-br from-cyan-100 to-blue-200 border-cyan-300 text-blue-950',
    defaultAdjectives: ['small', 'fast'],
    sampleSentence: 'This is a fish.',
    sentenceSpanish: 'Este es un pez.',
    soundName: 'Glub glub!',
    funFact: 'Fish breathe underwater! (¡Los peces nadan y respiran bajo el agua!)'
  },
  {
    id: 'cat',
    english: 'Cat',
    spanish: 'Gato',
    phonetic: 'Kat',
    emoji: '🐱',
    colorTheme: 'from-violet-400 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-violet-100 to-purple-200 border-purple-300 text-purple-950',
    defaultAdjectives: ['small', 'slow'],
    sampleSentence: 'The cat is small and slow.',
    sentenceSpanish: 'El gato es pequeño y lento.',
    soundName: 'Meow meow!',
    funFact: 'Cats can jump very high! (¡Los gatos saltan muy alto y ronronean!)'
  },
  {
    id: 'turtle',
    english: 'Turtle',
    spanish: 'Tortuga',
    phonetic: 'TUR-tuhl',
    emoji: '🐢',
    colorTheme: 'from-emerald-400 to-teal-600',
    bgGradient: 'bg-gradient-to-br from-emerald-100 to-teal-200 border-emerald-300 text-emerald-950',
    defaultAdjectives: ['slow', 'small'],
    sampleSentence: 'The turtle is slow and small.',
    sentenceSpanish: 'La tortuga es lenta y pequeña.',
    soundName: 'Slow step!',
    funFact: 'Turtles carry their home on their back! (¡Llevan su caparazón a todos lados!)'
  },
  {
    id: 'parrot',
    english: 'Parrot',
    spanish: 'Loro',
    phonetic: 'PAIR-uht',
    emoji: '🦜',
    colorTheme: 'from-red-400 via-yellow-400 to-green-500',
    bgGradient: 'bg-gradient-to-br from-lime-100 to-green-200 border-green-300 text-green-950',
    defaultAdjectives: ['small', 'fast'],
    sampleSentence: 'This is a parrot.',
    sentenceSpanish: 'Este es un loro.',
    soundName: 'Squawk squawk!',
    funFact: 'Parrots can repeat human words! (¡Los loros pueden repetir palabras!)'
  },
  {
    id: 'hamster',
    english: 'Hamster',
    spanish: 'Hámster',
    phonetic: 'HAM-ster',
    emoji: '🐹',
    colorTheme: 'from-orange-400 to-amber-500',
    bgGradient: 'bg-gradient-to-br from-orange-100 to-amber-200 border-orange-300 text-orange-950',
    defaultAdjectives: ['fast', 'small'],
    sampleSentence: 'The hamster is fast and small.',
    sentenceSpanish: 'El hámster es rápido y pequeño.',
    soundName: 'Squeak squeak!',
    funFact: 'Hamsters run super fast on their wheels! (¡Corren rápido en su ruedita!)'
  },
  {
    id: 'spider',
    english: 'Spider',
    spanish: 'Araña',
    phonetic: 'SPY-der',
    emoji: '🕷️',
    colorTheme: 'from-slate-600 to-slate-800',
    bgGradient: 'bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 text-slate-900',
    defaultAdjectives: ['small', 'fast'],
    sampleSentence: 'This is a spider.',
    sentenceSpanish: 'Esta es una araña.',
    soundName: 'Tick tick!',
    funFact: 'Spiders have 8 legs and spin webs! (¡Tienen 8 patas y tejen telarañas!)'
  },
  {
    id: 'snail',
    english: 'Snail',
    spanish: 'Caracol',
    phonetic: 'Snayl',
    emoji: '🐌',
    colorTheme: 'from-teal-400 to-cyan-600',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-lime-100 border-lime-300 text-lime-950',
    defaultAdjectives: ['slow', 'small'],
    sampleSentence: 'The snail is slow and small.',
    sentenceSpanish: 'El caracol es lento y pequeño.',
    soundName: 'Slurp slurp!',
    funFact: 'Snails leave a shiny trail when they move! (¡Dejan un caminito brillante!)'
  }
];

export const ADJECTIVES: Adjective[] = [
  {
    id: 'big',
    english: 'Big',
    spanish: 'Grande',
    phonetic: 'Big',
    emoji: '🐘',
    exampleAnimal: 'Elephant',
    exampleSpanish: 'Elefante',
    oppositeId: 'small',
    colorTheme: 'bg-blue-500 text-white'
  },
  {
    id: 'small',
    english: 'Small',
    spanish: 'Pequeño',
    phonetic: 'Smorl',
    emoji: '🐭',
    exampleAnimal: 'Mouse',
    exampleSpanish: 'Ratón',
    oppositeId: 'big',
    colorTheme: 'bg-emerald-500 text-white'
  },
  {
    id: 'tall',
    english: 'Tall',
    spanish: 'Alto',
    phonetic: 'Tawl',
    emoji: '🦒',
    exampleAnimal: 'Giraffe',
    exampleSpanish: 'Jirafa',
    oppositeId: 'short',
    colorTheme: 'bg-amber-500 text-white'
  },
  {
    id: 'short',
    english: 'Short',
    spanish: 'Bajo / corto',
    phonetic: 'Short',
    emoji: '🐁',
    exampleAnimal: 'Mouse',
    exampleSpanish: 'Ratón',
    oppositeId: 'tall',
    colorTheme: 'bg-rose-500 text-white'
  },
  {
    id: 'fast',
    english: 'Fast',
    spanish: 'Rápido',
    phonetic: 'Fast',
    emoji: '🐇',
    exampleAnimal: 'Rabbit',
    exampleSpanish: 'Conejo',
    oppositeId: 'slow',
    colorTheme: 'bg-orange-500 text-white'
  },
  {
    id: 'slow',
    english: 'Slow',
    spanish: 'Lento',
    phonetic: 'Sloh',
    emoji: '🐢',
    exampleAnimal: 'Turtle',
    exampleSpanish: 'Tortuga',
    oppositeId: 'fast',
    colorTheme: 'bg-teal-500 text-white'
  }
];

export const OPPOSITES: OppositePair[] = [
  {
    id: 'big-small',
    adj1: 'Big',
    adj2: 'Small',
    adj1Spanish: 'Grande',
    adj2Spanish: 'Pequeño',
    example1: 'Elephant (Elefante)',
    example2: 'Mouse (Ratón)',
    emoji1: '🐘',
    emoji2: '🐭'
  },
  {
    id: 'tall-short',
    adj1: 'Tall',
    adj2: 'Short',
    adj1Spanish: 'Alto',
    adj2Spanish: 'Bajo / corto',
    example1: 'Giraffe (Jirafa)',
    example2: 'Mouse (Ratón)',
    emoji1: '🦒',
    emoji2: '🐁'
  },
  {
    id: 'fast-slow',
    adj1: 'Fast',
    adj2: 'Slow',
    adj1Spanish: 'Rápido',
    adj2Spanish: 'Lento',
    example1: 'Rabbit (Conejo)',
    example2: 'Turtle (Tortuga)',
    emoji1: '🐇',
    emoji2: '🐢'
  }
];

export const COLORS: ColorItem[] = [
  {
    id: 'blue',
    english: 'Blue',
    spanish: 'Azul',
    phonetic: 'Bloo',
    hex: '#2563eb',
    textColor: 'text-white',
    borderClass: 'border-blue-400',
    exampleItem: 'Blue bird 🐦'
  },
  {
    id: 'red',
    english: 'Red',
    spanish: 'Rojo',
    phonetic: 'Red',
    hex: '#ef4444',
    textColor: 'text-white',
    borderClass: 'border-red-400',
    exampleItem: 'Red parrot 🦜'
  },
  {
    id: 'orange',
    english: 'Orange',
    spanish: 'Naranjo',
    phonetic: 'OR-inj',
    hex: '#f97316',
    textColor: 'text-white',
    borderClass: 'border-orange-400',
    exampleItem: 'Orange cat 🐱'
  },
  {
    id: 'yellow',
    english: 'Yellow',
    spanish: 'Amarillo',
    phonetic: 'YEL-oh',
    hex: '#eab308',
    textColor: 'text-yellow-950',
    borderClass: 'border-yellow-400',
    exampleItem: 'Yellow chicken 🐥'
  },
  {
    id: 'pink',
    english: 'Pink',
    spanish: 'Rosado',
    phonetic: 'Pingk',
    hex: '#ec4899',
    textColor: 'text-white',
    borderClass: 'border-pink-400',
    exampleItem: 'Pink rabbit nose 🐰'
  },
  {
    id: 'purple',
    english: 'Purple',
    spanish: 'Morado',
    phonetic: 'PUR-puhl',
    hex: '#a855f7',
    textColor: 'text-white',
    borderClass: 'border-purple-400',
    exampleItem: 'Purple butterfly 🦋'
  },
  {
    id: 'green',
    english: 'Green',
    spanish: 'Verde',
    phonetic: 'Green',
    hex: '#22c55e',
    textColor: 'text-white',
    borderClass: 'border-green-400',
    exampleItem: 'Green turtle 🐢'
  },
  {
    id: 'black',
    english: 'Black',
    spanish: 'Negro',
    phonetic: 'Blak',
    hex: '#1e293b',
    textColor: 'text-white',
    borderClass: 'border-slate-800',
    exampleItem: 'Black spider 🕷️'
  },
  {
    id: 'white',
    english: 'White',
    spanish: 'Blanco',
    phonetic: 'Wayt',
    hex: '#ffffff',
    textColor: 'text-slate-800',
    borderClass: 'border-slate-300',
    exampleItem: 'White rabbit 🐇'
  },
  {
    id: 'brown',
    english: 'Brown',
    spanish: 'Café / marrón',
    phonetic: 'Brown',
    hex: '#854d0e',
    textColor: 'text-white',
    borderClass: 'border-amber-800',
    exampleItem: 'Brown dog 🐶'
  },
  {
    id: 'gray',
    english: 'Gray / Grey',
    spanish: 'Gris',
    phonetic: 'Gray',
    hex: '#64748b',
    textColor: 'text-white',
    borderClass: 'border-slate-500',
    exampleItem: 'Gray elephant 🐘'
  },
  {
    id: 'light-blue',
    english: 'Light blue',
    spanish: 'Celeste',
    phonetic: 'Layt bloo',
    hex: '#38bdf8',
    textColor: 'text-slate-900',
    borderClass: 'border-sky-300',
    exampleItem: 'Light blue fish 🐟'
  }
];

export const DESCRIBING_SENTENCES: SentenceItem[] = [
  {
    id: 'sent-1',
    english: 'The rabbit is fast and small.',
    spanish: 'El conejo es rápido y pequeño.',
    animal: 'Rabbit',
    adj1: 'fast',
    adj2: 'small',
    emoji: '🐰'
  },
  {
    id: 'sent-2',
    english: 'The snail is slow and small.',
    spanish: 'El caracol es lento y pequeño.',
    animal: 'Snail',
    adj1: 'slow',
    adj2: 'small',
    emoji: '🐌'
  },
  {
    id: 'sent-3',
    english: 'The turtle is slow and small.',
    spanish: 'La tortuga es lenta y pequeña.',
    animal: 'Turtle',
    adj1: 'slow',
    adj2: 'small',
    emoji: '🐢'
  },
  {
    id: 'sent-4',
    english: 'The hamster is fast and small.',
    spanish: 'El hámster es rápido y pequeño.',
    animal: 'Hamster',
    adj1: 'fast',
    adj2: 'small',
    emoji: '🐹'
  }
];

export const GRAMMAR_EXAMPLES = [
  {
    pattern: 'The + animal + is + adjective + and + adjective.',
    explanation: 'Estructura para describir animales',
    examples: [
      {
        english: 'The dog is big and fast.',
        spanish: 'El perro es grande y rápido.',
        emoji: '🐕'
      },
      {
        english: 'The cat is small and slow.',
        spanish: 'El gato es pequeño y lento.',
        emoji: '🐈'
      },
      {
        english: 'The rabbit is fast and small.',
        spanish: 'El conejo es rápido y pequeño.',
        emoji: '🐇'
      },
      {
        english: 'The turtle is slow and small.',
        spanish: 'La tortuga es lenta y pequeña.',
        emoji: '🐢'
      }
    ]
  },
  {
    pattern: 'This is + a/an + animal',
    explanation: 'Expresión para identificar animales: "Esto es / Este es / Esta es"',
    examples: [
      {
        english: 'This is a dog.',
        spanish: 'Este es un perro.',
        emoji: '🐶'
      },
      {
        english: 'This is a cat.',
        spanish: 'Este es un gato.',
        emoji: '🐱'
      },
      {
        english: 'This is a rabbit.',
        spanish: 'Este es un conejo.',
        emoji: '🐰'
      },
      {
        english: 'This is a turtle.',
        spanish: 'Esta es una tortuga.',
        emoji: '🐢'
      }
    ]
  }
];

export const SONGS: Song[] = [
  {
    id: 'animal-safari',
    title: 'The Pet Safari Song',
    subtitle: '¡Canta y conoce a todos los animales!',
    icon: '🐾',
    themeColor: 'from-amber-400 to-orange-500',
    lyrics: [
      { line: 'This is a dog, woof woof!', spanish: '¡Este es un perro, guau guau!', action: '🐶' },
      { line: 'This is a cat, meow meow!', spanish: '¡Este es un gato, miau miau!', action: '🐱' },
      { line: 'Look at the rabbit, hop hop hop!', spanish: '¡Mira al conejo, saltar y saltar!', action: '🐰' },
      { line: 'And the little turtle, never stop!', spanish: '¡Y la tortuguita, nunca se detiene!', action: '🐢' },
      { line: 'Hen and chicken, bird and fish,', spanish: 'Gallina y pollo, pájaro y pez,', action: '🐥' },
      { line: 'Parrot, hamster, make a wish!', spanish: 'Loro, hámster, ¡pide un deseo!', action: '🦜' },
      { line: 'Spider climbing, snail so slow,', spanish: 'Araña trepando, caracol muy lento,', action: '🐌' },
      { line: 'We love animals, here we go!', spanish: '¡Amamos los animales, aquí vamos!', action: '🎉' }
    ]
  },
  {
    id: 'opposites-song',
    title: 'Big & Small, Fast & Slow!',
    subtitle: '¡La canción de los adjetivos opuestos!',
    icon: '⚡',
    themeColor: 'from-blue-400 to-indigo-500',
    lyrics: [
      { line: 'Big, big, big like an elephant!', spanish: '¡Grande, grande, grande como un elefante!', action: '🐘' },
      { line: 'Small, small, small like a mouse!', spanish: '¡Pequeño, pequeño, pequeño como un ratón!', action: '🐭' },
      { line: 'Tall giraffe reaching the sky!', spanish: '¡Alta jirafa alcanzando el cielo!', action: '🦒' },
      { line: 'Short little mouse walking by!', spanish: '¡Bajo ratoncito pasando caminando!', action: '🐁' },
      { line: 'Fast, fast rabbit running away!', spanish: '¡Rápido conejo corriendo!', action: '🐇' },
      { line: 'Slow, slow turtle enjoying the day!', spanish: '¡Lenta tortuga disfrutando el día!', action: '🐢' },
      { line: 'Opposites, opposites, sing it loud!', spanish: '¡Opuestos, opuestos, canta bien fuerte!', action: '⭐' }
    ]
  },
  {
    id: 'colors-parade',
    title: 'Rainbow Animals Parade',
    subtitle: '¡Colores brillantes con nuestros amigos!',
    icon: '🎨',
    themeColor: 'from-pink-400 via-purple-400 to-cyan-500',
    lyrics: [
      { line: 'Blue bird flying in the air,', spanish: 'Pájaro azul volando en el aire,', action: '🐦' },
      { line: 'Yellow chicken standing there!', spanish: '¡Pollito amarillo de pie ahí!', action: '🐥' },
      { line: 'Green turtle by the lake,', spanish: 'Tortuga verde cerca del lago,', action: '🐢' },
      { line: 'Orange cat is wide awake!', spanish: '¡El gato naranjo está muy despierto!', action: '🐱' },
      { line: 'Red, pink, purple, white and black,', spanish: 'Rojo, rosado, morado, blanco y negro,', action: '🌈' },
      { line: 'Brown and gray on the forest track,', spanish: 'Café y gris en el sendero del bosque,', action: '🐶' },
      { line: 'Light blue fish swimming fast!', spanish: '¡Pez celeste nadando rápido!', action: '🐟' },
      { line: 'We know all the colors at last!', spanish: '¡Al fin sabemos todos los colores!', action: '✨' }
    ]
  },
  {
    id: 'sentence-boogie',
    title: 'The Sentence Builder Boogie',
    subtitle: '¡Aprende a describir con ritmo!',
    icon: '🎵',
    themeColor: 'from-emerald-400 to-teal-500',
    lyrics: [
      { line: 'The rabbit is fast and small!', spanish: '¡El conejo es rápido y pequeño!', action: '🐰' },
      { line: 'The snail is slow and small!', spanish: '¡El caracol es lento y pequeño!', action: '🐌' },
      { line: 'The turtle is slow and small!', spanish: '¡La tortuga es lenta y pequeña!', action: '🐢' },
      { line: 'The hamster is fast and small!', spanish: '¡El hámster es rápido y pequeño!', action: '🐹' },
      { line: 'The dog is big and fast, hooray!', spanish: '¡El perro es grande y rápido, hurra!', action: '🐶' },
      { line: 'The cat is small and slow today!', spanish: '¡El gato es pequeño y lento hoy!', action: '🐱' },
      { line: 'This is English, we can say!', spanish: '¡Esto es inglés, lo decimos bien!', action: '🌟' }
    ]
  }
];

export const LEARNING_OBJECTIVES = [
  { id: 1, text: 'Reconocer y nombrar los 12 animales en inglés', target: 12, category: 'animals' },
  { id: 2, text: 'Identificar y traducir los 6 adjetivos', target: 6, category: 'adjectives' },
  { id: 3, text: 'Reconocer los 3 pares de adjetivos opuestos', target: 3, category: 'opposites' },
  { id: 4, text: 'Identificar y nombrar los 12 colores en inglés', target: 12, category: 'colors' },
  { id: 5, text: 'Describir animales con tamaño, altura y velocidad', target: 4, category: 'sentences' },
  { id: 6, text: 'Construir oraciones sencillas usando is y and', target: 5, category: 'grammar' },
  { id: 7, text: 'Utilizar la expresión "This is" para identificar animales', target: 4, category: 'this_is' },
];

export const STICKERS = [
  { id: 'stk-1', name: 'Speedy Rabbit 🐰', desc: '¡Por practicar oraciones rápidas!', icon: '🐰', unlockedAtStars: 5 },
  { id: 'stk-2', name: 'Wise Turtle 🐢', desc: '¡Por dominar los opuestos lento y rápido!', icon: '🐢', unlockedAtStars: 10 },
  { id: 'stk-3', name: 'Golden Woof 🐶', desc: '¡Por decir "This is a dog"!', icon: '🐶', unlockedAtStars: 15 },
  { id: 'stk-4', name: 'Rainbow Parrot 🦜', desc: '¡Por aprender los 12 colores!', icon: '🦜', unlockedAtStars: 25 },
  { id: 'stk-5', name: 'Super Hamster 🐹', desc: '¡Por hablar en el micrófono mágico!', icon: '🐹', unlockedAtStars: 35 },
  { id: 'stk-6', name: 'Safari Master Trophy 🏆', desc: '¡Completaste toda la unidad!', icon: '🏆', unlockedAtStars: 50 },
];
