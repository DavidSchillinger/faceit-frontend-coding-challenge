import React, { useCallback } from 'react';
import styled from 'styled-components';
import TournamentCard from './Tournament';
import { Tournament } from '../../../reducers/tournaments';
import theme from '../../../theme';
import { useRootDispatch } from '../../../store';
import {
  deleteTournament,
  updateTournament,
} from '../../../actions/tournaments';
import { Loading } from './Loading';
import { Error } from './Error';
import { Message } from './Message';
import { isValidTournamentName } from '../isValidTournamentName';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing(6)};
`;

type GridProps = {
  tournaments: Tournament[];
};

const Grid = (props: GridProps) => {
  const { tournaments } = props;

  const dispatch = useRootDispatch();

  const onClickDelete = useCallback(
    (tournamentId: string) => {
      if (!window.confirm('Do you really want to delete this tournament?'))
        return;
      dispatch(deleteTournament(tournamentId));
    },
    [dispatch]
  );

  const onClickEdit = useCallback(
    (tournament: Tournament) => {
      const name = window.prompt('New Tournament Name:', tournament.name);
      if (!isValidTournamentName(name)) return;
      dispatch(updateTournament({ ...tournament, name }));
    },
    [dispatch]
  );

  if (tournaments.length === 0) {
    return <Message>No tournaments found.</Message>;
  }

  return (
    <Container>
      {tournaments.map((tournament) => (
        <div key={tournament.id}>
          <TournamentCard
            tournament={tournament}
            onClickEdit={() => onClickEdit(tournament)}
            onClickDelete={() => onClickDelete(tournament.id)}
          />
        </div>
      ))}
    </Container>
  );
};

export { Grid, Error as GridError, Loading as GridLoading };
