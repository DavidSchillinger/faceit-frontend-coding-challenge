import { RootDispatch } from '../store';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../reducers/tournaments';

type Started = { type: 'tournaments/fetchStarted' };
type Succeeded = {
  type: 'tournaments/fetchSucceeded';
  payload: Tournament[];
};
type Failed = { type: 'tournaments/fetchFailed'; error: unknown };

type Actions = Started | Succeeded | Failed;

const getTournamentsStarted = (): Started => ({
  type: 'tournaments/fetchStarted',
});

const getTournamentsSuccess = (tournaments: Tournament[]): Succeeded => ({
  type: 'tournaments/fetchSucceeded',
  payload: tournaments,
});

const getTournamentsFailed = (error: unknown): Failed => ({
  type: 'tournaments/fetchFailed',
  error,
});

const fetchTournaments = () => async (dispatch: RootDispatch) => {
  dispatch(getTournamentsStarted());

  try {
    const response = await fetch(API_TOURNAMENTS_URL);
    const tournaments = await response.json();
    dispatch(getTournamentsSuccess(tournaments));
  } catch (error) {
    dispatch(getTournamentsFailed(error));
  }
};

export type { Actions };
export { fetchTournaments };
