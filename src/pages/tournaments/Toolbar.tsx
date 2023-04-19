import React, { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import { fetchTournaments, createTournament } from '../../actions/tournaments';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useRootDispatch } from '../../store';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const isValidTournamentName = (value: string | null): value is string => {
  if (!value) return false;
  // Latin letters, numbers and spaces allowed. Note Latin also includes diacritics...
  return true;
};

const Toolbar = () => {
  const dispatch = useRootDispatch();

  const debouncedSearch = useDebouncedCallback((search: string) => {
    dispatch(fetchTournaments({ search }));
  }, 200);

  const onClickCreate = useCallback(() => {
    const name = prompt('Tournament Name:');
    if (!isValidTournamentName(name)) return;
    dispatch(createTournament(name));
  }, [dispatch]);

  return (
    <Container>
      <Input
        placeholder="Search tournaments…"
        onChange={(event) => debouncedSearch(event.target.value)}
      />
      <Button onClick={onClickCreate}>CREATE TOURNAMENT</Button>
    </Container>
  );
};

export default Toolbar;
