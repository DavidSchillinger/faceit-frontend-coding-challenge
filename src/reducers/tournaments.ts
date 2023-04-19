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

export type TournamentsState = {
  status: 'pending' | 'fulfilled' | 'rejected';
  tournaments: Tournament[];
};

const initialState: TournamentsState = { status: 'pending', tournaments: [] };

export default function tournaments(
  state: TournamentsState = initialState,
  action: Actions
): TournamentsState {
  switch (action.type) {
    case 'tournaments/fetchStarted':
      return { ...state, status: 'pending' };
    case 'tournaments/fetchSucceeded':
      return { ...state, status: 'fulfilled', tournaments: action.payload };
    case 'tournaments/fetchFailed':
      return { ...state, status: 'rejected' };
  }

  switch (action.type) {
    case 'tournaments/deleteStarted':
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (tournament) => tournament.id !== action.payload
        ),
      };
  }

  switch (action.type) {
    case 'tournaments/createSucceeded':
      return {
        ...state,
        tournaments: [action.payload, ...state.tournaments],
      };
  }

  return state;
}
