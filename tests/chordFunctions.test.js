const { getChordFunctionFromName } = require('../chordFunctions');

describe('getChordFunctionFromName', () => {
  const romanNumerals = ['I', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'bVI', 'VI', 'bVII', 'VII'];
  const chordQualities = ['Major', 'Minor', 'Augmented', 'Diminished', 'Major7', 'Minor7', 'Dominant7', 'HalfDiminished', 'Diminished7', 'Sus4', 'Sus2'];
  const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  keys.forEach((key) => {
    const scale = chromaticScaleWithKey(key);

    scale.forEach((note, index) => {
      chordQualities.forEach((quality) => {
        const expectedFunction = `${romanNumerals[index]}${getQualitySymbol(quality)}`;
        test(`Chord ${note}${quality} in key of ${key} should be ${expectedFunction}`, () => {
          expect(getChordFunctionFromName(key, note, quality)).toBe(expectedFunction);
        });
      });
    });
  });

  test('Handling of sharp notes', () => {
    expect(getChordFunctionFromName('C', 'F#', 'Major')).toBe('bV');
    expect(getChordFunctionFromName('G', 'C#', 'Major7')).toBe('bVmaj7');
  });

  test('URL-encoded inputs', () => {
    expect(getChordFunctionFromName('C', 'F%23', 'Major')).toBe('bV');
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

  test('Missing parameters should throw an error', () => {
    expect(() => getChordFunctionFromName(null, 'C', 'Major')).toThrow('Key, chord root, and quality are required');
    expect(() => getChordFunctionFromName('C', null, 'Major')).toThrow('Key, chord root, and quality are required');
    expect(() => getChordFunctionFromName('C', 'G', null)).toThrow('Key, chord root, and quality are required');
  });
});

function chromaticScaleWithKey(key) {
  const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const startIdx = chromaticScale.indexOf(key);
  return [...chromaticScale.slice(startIdx), ...chromaticScale.slice(0, startIdx)];
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
