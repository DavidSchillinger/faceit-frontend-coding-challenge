const isValidTournamentName = (value: string | null): value is string => {
  if (!value) return false;
  // Latin letters, numbers and spaces allowed. Note Latin also includes diacritics...
  // TODO
  return true;
};

export { isValidTournamentName };
