import { isValidTournamentName } from './isValidTournamentName';

describe('isValidTournamentName', () => {
  const cases: [string, boolean][] = [
    ['', false],
    [' ', false],
    ['\t', false],
    ['foo', true],
    ['foo bar', true],
    ['foo 123', true],
    [' bar 123 ', true],
    ['foo ^', false],
    ['$ foo', false],
  ];

  it.each(cases)('isValidTournamentName(%p) should return %p', (value, result) => {
    expect(isValidTournamentName(value)).toBe(result);
  });
});
