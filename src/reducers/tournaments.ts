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
  search: string;
  tournaments: Tournament[];
};

const initialState: TournamentsState = {
  status: 'pending',
  search: '',
  tournaments: [],
};

export default function tournaments(
  state: TournamentsState = initialState,
  action: Actions
): TournamentsState {
  // Read:
  switch (action.type) {
    case 'tournaments/fetchStarted':
      return { ...state, status: 'pending' };
    case 'tournaments/fetchSucceeded':
      return { ...state, status: 'fulfilled', tournaments: action.payload };
    case 'tournaments/fetchFailed':
      return { ...state, status: 'rejected' };
  }

  // Delete:
  switch (action.type) {
    case 'tournaments/deleteStarted':
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (tournament) => tournament.id !== action.payload
        ),
      };
  }

  // Create
  switch (action.type) {
    case 'tournaments/createSucceeded':
      return {
        ...state,
        tournaments: [action.payload, ...state.tournaments],
      };
  }

  // Update
  switch (action.type) {
    case 'tournaments/updateStarted':
    case 'tournaments/updateSuccess':
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) =>
          tournament.id === action.payload.id ? action.payload : tournament
        ),
      };
  }

  switch (action.type) {
    case 'tournaments/setSearch':
      return {
        ...state,
        search: action.payload,
      };
  }

  return state;
}
