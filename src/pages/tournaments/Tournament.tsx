import styled from 'styled-components';
import theme from '../../theme';
import Button from '../../components/Button';
import H6 from '../../components/H6';

const Container = styled.div`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(4)};
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(2)};
`;

const Tournament = () => (
  <Container>
    <H6>Sed Natus Itaque</H6>
    <div>Organizer: Sed Autem</div>
    <div>Game: Rocket League</div>
    <div>Participants: 3/256</div>
    <div>Start: 27/02/2020, 12:50:53</div>

    <Actions>
      <Button>EDIT</Button>
      <Button>DELETE</Button>
    </Actions>
  </Container>
);

export default Tournament;
