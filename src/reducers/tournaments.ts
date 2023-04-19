import type { Actions } from '../actions/tournaments';

export type Tournament = {
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

type Initial = { status: 'initial'; tournaments: null };
type Pending = { status: 'pending'; tournaments: Tournament[] | null };
type Success = { status: 'success'; tournaments: Tournament[] };
type Error = {
  status: 'error';
  error: unknown;
  tournaments: Tournament[] | null;
};

export type TournamentsState = Initial | Pending | Success | Error;

const initialState: TournamentsState = { status: 'initial', tournaments: null };

export default function tournaments(
  state: TournamentsState = initialState,
  action: Actions
): TournamentsState {
  switch (action.type) {
    case 'tournaments/fetchStarted':
      return { status: 'pending', tournaments: state.tournaments };
    case 'tournaments/fetchSucceeded':
      return { status: 'success', tournaments: action.payload };
    case 'tournaments/fetchFailed':
      return {
        status: 'error',
        error: action.error,
        tournaments: state.tournaments,
      };
  }

  switch (action.type) {
    case 'tournaments/deleteStarted':
      return { status: 'pending', tournaments: state.tournaments };
    case 'tournaments/deleteSucceeded':
      return {
        status: 'success',
        tournaments: (state.tournaments ?? []).filter(
          (tournament) => tournament.id !== action.payload
        ),
      };
    case 'tournaments/deleteFailed':
      return {
        status: 'error',
        error: action.error,
        tournaments: state.tournaments,
      };
  }

  return state;
}
