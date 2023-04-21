import { RootState } from '../store';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../reducers/tournaments';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

type Thunk = ThunkAction<void, RootState, unknown, AnyAction>;

const fetchTournamentsStarted = () => ({
  type: 'tournaments/fetchStarted' as const,
});

const fetchTournamentsSuccess = (tournaments: Tournament[]) => ({
  type: 'tournaments/fetchSucceeded' as const,
  payload: tournaments,
});

const fetchTournamentsFailed = (error: unknown) => ({
  type: 'tournaments/fetchFailed' as const,
  error,
});

const fetchTournaments = (): Thunk => async (dispatch, getState) => {
  dispatch(fetchTournamentsStarted());

  // The search here may return unexpected tournaments because it searches _all_ fields.
  // This includes the ISO start date and id fields at the time of writing.
  // It appears that the backend doesn't support searching specific fields. (filters are exact matches only)

  try {
    const base = API_TOURNAMENTS_URL;
    const search = getState().tournaments.search;
    const url = search ? `${base}?q=${search}` : base;
    const response = await fetch(url);
    const tournaments = await response.json();
    dispatch(fetchTournamentsSuccess(tournaments));
  } catch (error) {
    dispatch(fetchTournamentsFailed(error));
  }
};

const deleteTournamentStarted = (tournamentId: string) => ({
  type: 'tournaments/deleteStarted' as const,
  payload: tournamentId,
});

const deleteTournament =
  (tournamentId: string): Thunk =>
  async (dispatch) => {
    dispatch(deleteTournamentStarted(tournamentId));

    try {
      const url = `${API_TOURNAMENTS_URL}/${tournamentId}`;
      await fetch(url, { method: 'DELETE' });
    } catch {
      // Revert to server state.
      dispatch(fetchTournaments());
    }
  };

const createTournamentSuccess = (tournament: Tournament) => ({
  type: 'tournaments/createSucceeded' as const,
  payload: tournament,
});

const createTournament =
  (tournamentName: string): Thunk =>
  async (dispatch) => {
    try {
      const response = await fetch(API_TOURNAMENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tournamentName }),
      });
      const tournament = await response.json();
      dispatch(createTournamentSuccess(tournament));
    } catch {
      // No specific error handling expected.
    }
  };

const updateTournamentStarted = (tournament: Tournament) => ({
  type: 'tournaments/updateStarted' as const,
  payload: tournament,
});

const updateTournamentSuccess = (tournament: Tournament) => ({
  type: 'tournaments/updateSuccess' as const,
  payload: tournament,
});

const updateTournament =
  (tournament: Tournament): Thunk =>
  async (dispatch) => {
    dispatch(updateTournamentStarted(tournament));

    try {
      const url = `${API_TOURNAMENTS_URL}/${tournament.id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournament),
      });
      const update = await response.json();
      dispatch(updateTournamentSuccess(update));
    } catch {
      dispatch(fetchTournaments());
    }
  };

const setTournamentSearch = (term: string) => ({
  type: 'tournaments/setSearch' as const,
  payload: term,
});

const updateTournamentSearch =
  (term: string): Thunk =>
  async (dispatch) => {
    dispatch(setTournamentSearch(term));
    dispatch(fetchTournaments());
  };

type Actions =
  | ReturnType<typeof fetchTournamentsStarted>
  | ReturnType<typeof fetchTournamentsSuccess>
  | ReturnType<typeof fetchTournamentsFailed>
  | ReturnType<typeof deleteTournamentStarted>
  | ReturnType<typeof createTournamentSuccess>
  | ReturnType<typeof updateTournamentStarted>
  | ReturnType<typeof updateTournamentSuccess>
  | ReturnType<typeof setTournamentSearch>;

export type { Actions };
export {
  fetchTournaments,
  deleteTournament,
  createTournament,
  updateTournament,
  updateTournamentSearch,
};
