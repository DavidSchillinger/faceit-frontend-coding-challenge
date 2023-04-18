import React from 'react';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Toolbar from './Toolbar';
import Grid from './Grid';

const Tournaments = () => (
  <Container>
    <H4>FACEIT Tournaments</H4>

    <Container>
      <Toolbar />
    </Container>

    <Container>
      <Grid />
    </Container>
  </Container>
);

export default Tournaments;
