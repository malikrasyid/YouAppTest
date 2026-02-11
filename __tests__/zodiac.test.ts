import { getZodiac, getShio } from '../lib/zodiac';

describe('Zodiac Logic', () => {
  test('calculates correct Zodiac for August 10', () => {
    expect(getZodiac(10, 8)).toBe('Leo');
  });

  test('calculates correct Shio for 1996', () => {
    expect(getShio(1996)).toBe('Rat');
  });
});