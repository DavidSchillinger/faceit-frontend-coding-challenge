import React, { ChangeEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import {
  createTournament,
  updateTournamentSearch,
} from '../../actions/tournaments';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useRootDispatch } from '../../store';
import { isValidTournamentName } from './isValidTournamentName';
import { parseTournamentName } from './parseTournamentName';
import theme from '../../theme';

const Container = styled.div`
  display: flex;
  gap: ${theme.spacing(4)};
  justify-content: space-between;
  flex-wrap: wrap;
`;

const useToolbarActionHandlers = () => {
  const dispatch = useRootDispatch();

  const handleSearchChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      dispatch(updateTournamentSearch(search));
    },
    200
  );

  const handleCreateClick = useCallback(() => {
    // In the real world, we'd probably want to have a more powerful dialog that
    // allows us to show validation errors to the user.
    const rawName = window.prompt('Tournament Name:');
    const name = parseTournamentName(rawName);
    if (!isValidTournamentName(name)) return;
    dispatch(createTournament(name));
  }, [dispatch]);

  return { handleSearchChange, handleCreateClick };
};

const Toolbar = () => {
  const { handleSearchChange, handleCreateClick } = useToolbarActionHandlers();

  return (
    <Container>
      {/* This div prevents vertical resizing sometimes caused by the flex container. */}
      <div>
        <Input
          placeholder="Search tournaments…"
          onChange={handleSearchChange}
        />
      </div>

      <Button onClick={handleCreateClick}>CREATE TOURNAMENT</Button>
    </Container>
  );
};

export default Toolbar;
