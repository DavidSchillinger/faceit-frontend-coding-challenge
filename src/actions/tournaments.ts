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

const deleteTournamentStarted = () => ({
  type: 'tournaments/deleteStarted' as const,
});

const deleteTournamentSuccess = (tournamentId: string) => ({
  type: 'tournaments/deleteSucceeded' as const,
  payload: tournamentId,
});

const deleteTournamentFailed = (error: unknown) => ({
  type: 'tournaments/deleteFailed' as const,
  error,
});

const deleteTournament =
  (tournamentId: string) => async (dispatch: RootDispatch) => {
    dispatch(deleteTournamentStarted());

    try {
      await fetch(`${API_TOURNAMENTS_URL}/${tournamentId}`, {
        method: 'DELETE',
      });
      dispatch(deleteTournamentSuccess(tournamentId));
    } catch (error) {
      dispatch(deleteTournamentFailed(error));
    }
  };

const createTournamentStarted = () => ({
  type: 'tournaments/createStarted' as const,
});

const createTournamentSuccess = (tournament: Tournament) => ({
  type: 'tournaments/createSucceeded' as const,
  payload: tournament,
});

const createTournamentFailed = (error: unknown) => ({
  type: 'tournaments/createFailed' as const,
  error,
});

const createTournament =
  (tournamentName: string) => async (dispatch: RootDispatch) => {
    dispatch(createTournamentStarted());

    try {
      const response = await fetch(API_TOURNAMENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tournamentName }),
      });
      const tournament = await response.json();
      dispatch(createTournamentSuccess(tournament));
    } catch (error) {
      dispatch(createTournamentFailed(error));
    }
  };

type Actions =
  | ReturnType<typeof fetchTournamentsStarted>
  | ReturnType<typeof fetchTournamentsSuccess>
  | ReturnType<typeof fetchTournamentsFailed>
  | ReturnType<typeof deleteTournamentStarted>
  | ReturnType<typeof deleteTournamentSuccess>
  | ReturnType<typeof deleteTournamentFailed>
  | ReturnType<typeof createTournamentStarted>
  | ReturnType<typeof createTournamentSuccess>
  | ReturnType<typeof createTournamentFailed>;

export type { Actions };
export { fetchTournaments, deleteTournament, createTournament };
