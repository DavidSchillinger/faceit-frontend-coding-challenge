import React from 'react';
import styled from 'styled-components';
import { fetchTournaments } from '../../../actions/tournaments';
import Button from '../../../components/Button';
import { useRootDispatch } from '../../../store';
import theme from '../../../theme';
import { Message } from './Message';

const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(4)};
`;

const Error = () => {
  const dispatch = useRootDispatch();

  return (
    <Message>
      Something went wrong.
      <ButtonContainer>
        <Button onClick={() => dispatch(fetchTournaments())}>RETRY</Button>
      </ButtonContainer>
    </Message>
  );
};

export { Error };
