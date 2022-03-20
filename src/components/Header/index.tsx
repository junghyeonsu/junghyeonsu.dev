import styled from '@emotion/styled';

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100vw;
  height: 100px;
  background-color: black;

  a {
    color: white;
  }
`;

const Header = () => {
  return (
    <Container>
      <a target="_blank" href="https://hyeonsu-jung.vercel.app/">
        소개
      </a>
    </Container>
  );
};

export default Header;
