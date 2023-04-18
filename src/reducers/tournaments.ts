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

type Idle = { status: 'idle' };
type Pending = { status: 'pending' };
type Success = { status: 'success'; tournaments: Tournament[] };
type Error = { status: 'error'; error: unknown };

export type TournamentsState = Idle | Pending | Success | Error;

const initialState: TournamentsState = { status: 'idle' };

export default function tournaments(
  state: TournamentsState = initialState,
  action: Actions
): TournamentsState {
  switch (action.type) {
    case 'tournaments/fetchStarted':
      return { status: 'pending' };
    case 'tournaments/fetchSucceeded':
      return { status: 'success', tournaments: action.payload };
    case 'tournaments/fetchFailed':
      return { status: 'error', error: action.error };
  }

  return state;
}
