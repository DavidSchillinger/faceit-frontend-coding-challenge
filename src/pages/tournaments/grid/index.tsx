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
import { parseTournamentName } from '../parseTournamentName';

const Container = styled.div`
  display: grid;
  gap: ${theme.spacing(6)};

  @media (min-width: ${theme.breakpoints.s}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.m}) {
    grid-template-columns: repeat(3, 1fr);
  }
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
      const rawName = window.prompt('New Tournament Name:', tournament.name);
      const name = parseTournamentName(rawName);
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
