import { parseTournamentName } from './parseTournamentName';

describe('parseTournamentName', () => {
  it('should return "" for null', function() {
    expect(parseTournamentName(null)).toEqual('');
  });

  it('should return "" for "empty" strings', function () {
    const empty = ['', ' ', '\t', '\n'];

    empty.forEach((value) => {
      expect(parseTournamentName(value)).toEqual('');
    });
  });

  it('should trim the string', function() {
    const empty = [' foo', 'foo ', ' foo\t', '\n foo  '];

    empty.forEach((value) => {
      expect(parseTournamentName(value)).toEqual('foo');
    });
  });
});
