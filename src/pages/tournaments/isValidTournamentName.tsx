// Letters, numbers and spaces pass.
// Note: Letters with diacritics are rejected.
const regexp = /^[\w\d ]+$/;

const isValidTournamentName = (value: string | null): value is string => {
  if (!value) return false;
  if (!value.trim()) return false;
  return regexp.test(value);
};

export { isValidTournamentName };
