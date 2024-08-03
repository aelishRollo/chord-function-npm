const { getChordFunctionFromName } = require('../chordFunctions');

describe('getChordFunctionFromName', () => {
  const chordQualities = ['Major', 'Minor', 'Augmented', 'Diminished', 'Major7', 'Minor7', 'Dominant7', 'HalfDiminished', 'Diminished7', 'Sus4', 'Sus2'];
  const flatKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const sharpKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  describe('Flat mode', () => {
    flatKeys.forEach((key) => {
      const scale = chromaticScaleWithKey(key, 'flats');
      scale.forEach((note, index) => {
        chordQualities.forEach((quality) => {
          const expectedFunction = `${getRomanNumeral(index, 'flats')}${getQualitySymbol(quality)}`;
          test(`Chord ${note}${quality} in key of ${key} should be ${expectedFunction}`, () => {
            expect(getChordFunctionFromName(key, note, quality)).toBe(expectedFunction);
          });
        });
      });
    });
  });

  describe('Sharp mode', () => {
    sharpKeys.forEach((key) => {
      const scale = chromaticScaleWithKey(key, 'sharps');
      scale.forEach((note, index) => {
        chordQualities.forEach((quality) => {
          const expectedFunction = `${getRomanNumeral(index, 'sharps')}${getQualitySymbol(quality)}`;
          if (key.includes('#') || note.includes('#')) {
            test(`Chord ${note}${quality} in key of ${key} should be ${expectedFunction}`, () => {
              expect(getChordFunctionFromName(key, note, quality)).toBe(expectedFunction);
            });
          }
        });
      });
    });
  });
  

  test('Mixing sharps and flats should throw an error', () => {
    expect(() => getChordFunctionFromName('C#', 'Bb', 'Major')).toThrow('Cannot mix sharps and flats in the same chord.');
  });

  test('Missing key should throw specific error', () => {
    expect(() => getChordFunctionFromName(null, 'C', 'Major')).toThrow('Key is required');
  });

  test('Missing chord root should throw specific error', () => {
    expect(() => getChordFunctionFromName('C', null, 'Major')).toThrow('Chord root is required');
  });

  test('Missing chord quality should throw specific error', () => {
    expect(() => getChordFunctionFromName('C', 'G', null)).toThrow('Chord quality is required');
  });

  test('Invalid chord root should throw an error', () => {
    expect(() => getChordFunctionFromName('C', 'H', 'Major')).toThrow('Invalid chord root');
  });

  test('Invalid key should throw an error', () => {
    expect(() => getChordFunctionFromName('H', 'C', 'Major')).toThrow('Invalid key');
  });

  test('Invalid chord quality should throw an error', () => {
    expect(() => getChordFunctionFromName('C', 'G', 'InvalidQuality')).toThrow('Invalid chord quality');
  });

});

function chromaticScaleWithKey(key, mode) {
  const chromaticScale = mode === 'sharps' 
    ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const startIdx = chromaticScale.indexOf(key);
  return [...chromaticScale.slice(startIdx), ...chromaticScale.slice(0, startIdx)];
}

function getRomanNumeral(index, mode) {
  const romanNumeralsFlats = ['I', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'bVI', 'VI', 'bVII', 'VII'];
  const romanNumeralsSharps = ['I', '#I', 'II', '#II', 'III', 'IV', '#IV', 'V', '#V', 'VI', '#VI', 'VII'];
  return mode === 'sharps' ? romanNumeralsSharps[index] : romanNumeralsFlats[index];
}

function getQualitySymbol(quality) {
  const qualityMap = {
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
  return qualityMap[quality] || '';
}
