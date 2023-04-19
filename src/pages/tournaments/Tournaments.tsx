import React, { useEffect } from 'react';
import { fetchTournaments } from '../../actions/tournaments';
import { useRootSelector, useRootDispatch } from '../../store';
import selectTournaments from '../../selectors/tournaments';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Toolbar from './Toolbar';
import { Grid, GridError, GridLoading } from './grid';

const Tournaments = () => {
  const dispatch = useRootDispatch();
  const state = useRootSelector(selectTournaments);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  switch (state.status) {
    case 'pending': {
      return state.tournaments === null ? (
        <GridLoading />
      ) : (
        <Grid tournaments={state.tournaments} />
      );
    }
    case 'rejected':
      return <GridError />;
    case 'fulfilled':
      return <Grid tournaments={state.tournaments} />;
  }
};

const Page = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>

      <Container>
        <Toolbar />
      </Container>

      <Container>
        <Tournaments />
      </Container>
    </Container>
  );
};

export default Page;
