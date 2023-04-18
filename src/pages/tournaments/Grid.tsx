import React from 'react';
import styled from 'styled-components';
import Tournament from './Tournament';
import type { TournamentDetails } from '../../reducers/tournaments';
import theme from '../../theme';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing(4)};
`;

type Props = {
  tournaments: TournamentDetails[];
  onClickEdit: (tournamentId: string) => void;
  onClickDelete: (tournamentId: string) => void;
};

const Grid = (props: Props) => {
  const { tournaments, onClickEdit, onClickDelete } = props;

  return (
    <Container>
      {tournaments.map((tournament) => (
        <Tournament
          key={tournament.id}
          tournament={tournament}
          onClickEdit={() => onClickEdit(tournament.id)}
          onClickDelete={() => onClickDelete(tournament.id)}
        />
      ))}
    </Container>
  );
};

export default Grid;
