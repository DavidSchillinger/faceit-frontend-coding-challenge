import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Toolbar = () => (
  <Container>
    <Input placeholder="Search tournaments…" />
    <Button>CREATE TOURNAMENT</Button>
  </Container>
);

export default Toolbar;
