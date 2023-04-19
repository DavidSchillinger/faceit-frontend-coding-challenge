import { RootDispatch } from '../store';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../reducers/tournaments';

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

const fetchTournaments =
  ({ search }: { search?: string } = {}) =>
  async (dispatch: RootDispatch) => {
    dispatch(fetchTournamentsStarted());

    try {
      const base = API_TOURNAMENTS_URL;
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
  (tournamentId: string) => async (dispatch: RootDispatch) => {
    dispatch(deleteTournamentStarted(tournamentId));

    try {
      const url = `${API_TOURNAMENTS_URL}/${tournamentId}`;
      await fetch(url, { method: 'DELETE' });
    } catch {
      // No specific error handling expected.
    } finally {
      dispatch(fetchTournaments());
    }
  };

const createTournamentSuccess = (tournament: Tournament) => ({
  type: 'tournaments/createSucceeded' as const,
  payload: tournament,
});

const createTournament =
  (tournamentName: string) => async (dispatch: RootDispatch) => {
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

type Actions =
  | ReturnType<typeof fetchTournamentsStarted>
  | ReturnType<typeof fetchTournamentsSuccess>
  | ReturnType<typeof fetchTournamentsFailed>
  | ReturnType<typeof deleteTournamentStarted>
  | ReturnType<typeof createTournamentSuccess>;

export type { Actions };
export { fetchTournaments, deleteTournament, createTournament };
