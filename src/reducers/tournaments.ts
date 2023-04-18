export type TournamentDetails = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string; // ISO8601
};

const initialState: TournamentDetails[] = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: index + '',
    name: 'Tournament Name ' + index,
    organizer: 'Organizer Name',
    game: 'Game Name',
    participants: {
      current: 123,
      max: 256,
    },
    startDate: new Date().toISOString(),
  }));

export default function tournaments(
  state: TournamentDetails[] = initialState,
  action: unknown
) {
  return state;
}
