import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import Button from '../../../components/Button';
import H6 from '../../../components/H6';
import { Tournament } from '../../../reducers/tournaments';

const Container = styled.div`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(4)};
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(2)};
`;

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'medium',
});

type Props = {
  tournament: Tournament;
  onClickEdit: () => void;
  onClickDelete: () => void;
};

const TournamentCard = (props: Props) => {
  const { tournament, onClickEdit, onClickDelete } = props;

  return (
    <Container>
      <H6>{tournament.name}</H6>
      <div>Organizer: {tournament.organizer}</div>
      <div>Game: {tournament.game}</div>
      <div>
        Participants: {tournament.participants.current}/
        {tournament.participants.max}
      </div>
      <div>
        Start: {dateTimeFormatter.format(Date.parse(tournament.startDate))}
      </div>

      <Actions>
        <Button onClick={onClickEdit}>EDIT</Button>
        <Button onClick={onClickDelete}>DELETE</Button>
      </Actions>
    </Container>
  );
};

export default TournamentCard;
