import React, { useCallback } from 'react';
import styled from 'styled-components';
import TournamentCard from './Tournament';
import { Tournament } from '../../../reducers/tournaments';
import theme from '../../../theme';
import { useRootDispatch } from '../../../store';
import { deleteTournament } from '../../../actions/tournaments';
import { Loading } from './Loading';
import { Error } from './Error';
import { Message } from './Message';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing(4)};
`;

type GridProps = {
  tournaments: Tournament[];
};

const Grid = (props: GridProps) => {
  const { tournaments } = props;

  const dispatch = useRootDispatch();

  const onClickDelete = useCallback(
    (tournamentId: string) => {
      if (window.confirm('Do you really want to delete this tournament?')) {
        dispatch(deleteTournament(tournamentId));
      }
    },
    [dispatch]
  );

  if (tournaments.length === 0) {
    return <Message>No tournaments found.</Message>;
  }

  return (
    <Container>
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament.id}
          tournament={tournament}
          onClickEdit={() => {}}
          onClickDelete={() => onClickDelete(tournament.id)}
        />
      ))}
    </Container>
  );
};

export { Grid, Error as GridError, Loading as GridLoading };
