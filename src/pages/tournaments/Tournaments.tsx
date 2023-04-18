import React from 'react';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Toolbar from './Toolbar';
import Grid from './Grid';

const data = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: index + '',
    name: 'Tournament Name ' + index,
    organizer: 'Organizer Name',
    game: 'Game Name',
    participants: {
      current: 123,
      max: 256,
    },
    startDate: new Date().toISOString(),
  }));

const Tournaments = () => (
  <Container>
    <H4>FACEIT Tournaments</H4>

    <Container>
      <Toolbar
        onChangeSearch={(term) => {
          console.log('SEARCH ' + term);
        }}
        onClickCreate={() => {
          console.log('CREATE');
        }}
      />
    </Container>

    <Container>
      <Grid
        tournaments={data}
        onClickEdit={(tournamentId) => {
          console.log('EDIT ' + tournamentId);
        }}
        onClickDelete={(tournamentId) => {
          console.log('DELETE ' + tournamentId);
        }}
      />
    </Container>
  </Container>
);

export default Tournaments;
