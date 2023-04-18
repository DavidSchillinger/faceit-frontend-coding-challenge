import React, { useEffect } from 'react';
import { fetchTournaments } from '../../actions/tournaments';
import { useRootSelector, useRootDispatch } from '../../store';
import selectTournaments from '../../selectors/tournaments';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Toolbar from './Toolbar';
import Grid from './Grid';

const Tournaments = () => {
  const dispatch = useRootDispatch();
  const tournaments = useRootSelector(selectTournaments);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  return (
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
          tournaments={tournaments}
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
};

export default Tournaments;