import styled from 'styled-components';
import Tournament from './Tournament';
import theme from '../../theme';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing(4)};
`;

const Grid = () => (
  <Container>
    {Array(30)
      .fill()
      .map((_, index) => (
        <Tournament key={index} />
      ))}
  </Container>
);

export default Grid;
