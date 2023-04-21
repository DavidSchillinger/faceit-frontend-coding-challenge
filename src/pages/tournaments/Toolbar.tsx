import React, { useCallback } from 'react';
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
import theme from '../../theme';

const Container = styled.div`
  display: flex;
  gap: ${theme.spacing(4)};
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Toolbar = () => {
  const dispatch = useRootDispatch();

  const debouncedSearch = useDebouncedCallback((search: string) => {
    dispatch(updateTournamentSearch(search));
  }, 200);

  const onClickCreate = useCallback(() => {
    const name = prompt('Tournament Name:');
    if (!isValidTournamentName(name)) return;
    dispatch(createTournament(name));
  }, [dispatch]);

  return (
    <Container>
      {/* This div prevents vertical resizing sometimes caused by the flex container. */}
      <div>
        <Input
          placeholder="Search tournaments…"
          onChange={(event) => debouncedSearch(event.target.value)}
        />
      </div>
      <Button onClick={onClickCreate}>CREATE TOURNAMENT</Button>
    </Container>
  );
};

export default Toolbar;
