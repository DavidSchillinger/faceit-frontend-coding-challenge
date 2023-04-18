import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  onClickCreate: () => void;
  onChangeSearch: (term: string) => void;
};

const Toolbar = (props: Props) => (
  <Container>
    <Input
      placeholder="Search tournaments…"
      onChange={(event) => props.onChangeSearch(event.target.value)}
    />
    <Button onClick={props.onClickCreate}>CREATE TOURNAMENT</Button>
  </Container>
);

export default Toolbar;
