import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import { fetchTournaments } from '../../actions/tournaments';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useRootDispatch } from '../../store';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Toolbar = () => {
  const dispatch = useRootDispatch();

  const debouncedSearch = useDebouncedCallback((search: string) => {
    dispatch(fetchTournaments({ search }));
  }, 200);

  return (
    <Container>
      <Input
        placeholder="Search tournaments…"
        onChange={(event) => debouncedSearch(event.target.value)}
      />
      <Button>CREATE TOURNAMENT</Button>
    </Container>
  );
};

export default Toolbar;
