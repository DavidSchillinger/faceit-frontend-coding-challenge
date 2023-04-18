import { RootDispatch } from '../store';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { TournamentDetails } from '../reducers/tournaments';

type Fetch = (dispatch: RootDispatch) => Promise<void>;
type Started = { type: 'tournaments/fetchStarted' };
type Succeeded = {
  type: 'tournaments/fetchSucceeded';
  payload: TournamentDetails[];
};
type Failed = { type: 'tournaments/fetchFailed'; error: unknown };

type Actions = Fetch | Started | Succeeded | Failed;

const getTournamentsStarted = (): Started => ({
  type: 'tournaments/fetchStarted',
});

const getTournamentsSuccess = (
  tournaments: TournamentDetails[]
): Succeeded => ({
  type: 'tournaments/fetchSucceeded',
  payload: tournaments,
});

const getTournamentsFailed = (error: unknown): Failed => ({
  type: 'tournaments/fetchFailed',
  error,
});

const fetchTournaments = (): Fetch => async (dispatch) => {
  dispatch(getTournamentsStarted());

  try {
    const tournaments: any = await fetch(API_TOURNAMENTS_URL);
    console.log('RESPONSE', tournaments);
    dispatch(getTournamentsSuccess(tournaments));
  } catch (error) {
    dispatch(getTournamentsFailed(error));
  }
};

export type { Actions };
export { fetchTournaments };
