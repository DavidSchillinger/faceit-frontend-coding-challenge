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

const initialState: TournamentDetails[] = [];

export default function tournaments(
  state: TournamentDetails[] = initialState,
  action: unknown
) {
  return state;
}
