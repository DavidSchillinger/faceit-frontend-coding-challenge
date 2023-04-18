import React from 'react';
import styled from 'styled-components';
import TournamentCard from './Tournament';
import { TournamentsState } from '../../reducers/tournaments';
import theme from '../../theme';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing(4)};
`;

const Placeholder = styled.div`
  text-align: center;
`;

type Props = {
  state: TournamentsState;
  onClickEdit: (tournamentId: string) => void;
  onClickDelete: (tournamentId: string) => void;
};

const Grid = (props: Props) => {
  const { state, onClickEdit, onClickDelete } = props;

  switch (state.status) {
    case 'idle':
    case 'pending':
      return <Placeholder>Loading tournaments…</Placeholder>;
    case 'error':
      return <Placeholder>Something went wrong. TODO: Retry</Placeholder>;
    case 'success':
      return (
        <Container>
          {state.tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onClickEdit={() => onClickEdit(tournament.id)}
              onClickDelete={() => onClickDelete(tournament.id)}
            />
          ))}
        </Container>
      );
  }
};

export default Grid;
