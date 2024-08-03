const chromaticScaleFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const romanNumeralsFlats = ['I', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'bVI', 'VI', 'bVII', 'VII'];

const chromaticScaleSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const romanNumeralsSharps = ['I', '#I', 'II', '#II', 'III', 'IV', '#IV', 'V', '#V', 'VI', '#VI', 'VII'];

const sharpToFlatMap = {
  'C#': 'Db', 'c#': 'Db',
  'D#': 'Eb', 'd#': 'Eb',
  'F#': 'Gb', 'f#': 'Gb',
  'G#': 'Ab', 'g#': 'Ab',
  'A#': 'Bb', 'a#': 'Bb'
};

const flatToSharpMap = {
  'Db': 'C#', 'db': 'C#',
  'Eb': 'D#', 'eb': 'D#',
  'Gb': 'F#', 'gb': 'F#',
  'Ab': 'G#', 'ab': 'G#',
  'Bb': 'A#', 'bb': 'A#'
};

const chordQualityMap = {
  'Major': '',
  'Minor': 'm',
  'Augmented': '+',
  'Diminished': '°',
  'Major7': 'maj7',
  'Minor7': 'm7',
  'Dominant7': '7',
  'HalfDiminished': 'ø',
  'Diminished7': '°7',
  'Sus4': 'sus4',
  'Sus2': 'sus2'
};

function convertSharpToFlat(note) {
  return sharpToFlatMap[note] || note.toUpperCase();
}

function convertFlatToSharp(note) {
  return flatToSharpMap[note] || note.toUpperCase();
}

function detectMode(key, chordRoot) {
  const hasSharp = /#/.test(key) || /#/.test(chordRoot);
  const hasFlat = /b/.test(key) || /b/.test(chordRoot);
  if (hasSharp && hasFlat) {
    throw new Error('Cannot mix sharps and flats in the same chord.');
  }
  return hasSharp ? 'sharps' : 'flats';
}

function getChordFunctionFromName(key, chordRoot, chordQuality) {
  try {
    console.log('\n--- getChordFunctionFromName Start ---');
    console.log(`Input key: ${key}`);
    console.log(`Input chordRoot: ${chordRoot}`);
    console.log(`Input chordQuality: ${chordQuality}`);

    if (!key) {
      throw new Error('Key is required');
    }
    if (!chordRoot) {
      throw new Error('Chord root is required');
    }
    if (!chordQuality) {
      throw new Error('Chord quality is required');
    }

    const mode = detectMode(key, chordRoot);
    console.log(`Detected mode: ${mode}`);

    if (mode === 'flats') {
      key = convertSharpToFlat(key);
      chordRoot = convertSharpToFlat(decodeURIComponent(chordRoot));
      console.log(`Converted key (flats mode): ${key}`);
      console.log(`Converted chordRoot (flats mode): ${chordRoot}`);
    } else {
      key = decodeURIComponent(key.toUpperCase());
      chordRoot = decodeURIComponent(chordRoot.toUpperCase());
      console.log(`Converted key (sharps mode): ${key}`);
      console.log(`Converted chordRoot (sharps mode): ${chordRoot}`);
    }

    chordQuality = chordQuality.charAt(0).toUpperCase() + chordQuality.slice(1).toLowerCase();
    console.log(`Formatted chordQuality: ${chordQuality}`);

    const rootPattern = /^[A-G][b#]?$/i;
    if (!rootPattern.test(chordRoot)) {
      throw new Error('Invalid chord root');
    }

    const chromaticScale = mode === 'sharps' ? chromaticScaleSharps : chromaticScaleFlats;
    const romanNumerals = mode === 'sharps' ? romanNumeralsSharps : romanNumeralsFlats;

    console.log(`Using chromaticScale: ${chromaticScale}`);
    console.log(`Using romanNumerals: ${romanNumerals}`);

    if (!chromaticScale.includes(key)) {
      throw new Error('Invalid key');
    }
    if (!chromaticScale.includes(chordRoot)) {
      throw new Error('Invalid chord root');
    }
    if (!Object.keys(chordQualityMap).includes(chordQuality)) {
      throw new Error('Invalid chord quality');
    }

    const rootIndex = chromaticScale.indexOf(chordRoot);
    const keyIndex = chromaticScale.indexOf(key);

    console.log(`rootIndex: ${rootIndex}`);
    console.log(`keyIndex: ${keyIndex}`);

    const degree = (rootIndex - keyIndex + chromaticScale.length) % chromaticScale.length;
    console.log(`Calculated degree: ${degree}`);

    const result = `${romanNumerals[degree]}${chordQualityMap[chordQuality]}`;
    console.log(`Resulting chord function: ${result}`);
    console.log('--- getChordFunctionFromName End ---\n');

    return result;
  } catch (error) {
    console.error(`Error in getChordFunctionFromName: ${error.message}`);
    throw error;
  }
}

// Test case
console.log(getChordFunctionFromName('B', 'F', 'Sus4'));

module.exports = { getChordFunctionFromName };
