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

type Actions =
  | ReturnType<typeof fetchTournamentsStarted>
  | ReturnType<typeof fetchTournamentsSuccess>
  | ReturnType<typeof fetchTournamentsFailed>
  | ReturnType<typeof deleteTournamentStarted>
  | ReturnType<typeof deleteTournamentSuccess>
  | ReturnType<typeof deleteTournamentFailed>;

export type { Actions };
export { fetchTournaments, deleteTournament };
