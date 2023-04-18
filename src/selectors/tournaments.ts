import { RootState } from '../store';

const selectTournaments = (state: RootState) => state.tournaments;

export default selectTournaments;
