import React, { useEffect } from 'react';
import { fetchTournaments } from '../../actions/tournaments';
import { useRootSelector, useRootDispatch } from '../../store';
import selectTournaments from '../../selectors/tournaments';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Toolbar from './Toolbar';
import { Grid, GridError, GridLoading } from './grid';
import styled from 'styled-components';
import theme from '../../theme';

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

const PageContainer = styled(Container)`
  padding: 0 ${theme.spacing(4)};
`;

const Page = () => {
  return (
    <PageContainer>
      <H4>FACEIT Tournaments</H4>

      <Container>
        <Toolbar />
      </Container>

      <Container>
        <Tournaments />
      </Container>
    </PageContainer>
  );
};

export default Page;
