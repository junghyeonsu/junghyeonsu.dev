import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

const ThemeToggler = dynamic(() => import('../ThemeToggler'), {
  ssr: false,
});

const Container = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  width: 100vw;
  height: 100px;
`;

const Header = () => {
  return (
    <Container>
      <a target="_blank" href="https://hyeonsu-jung.vercel.app/">
        소개
      </a>
      <ThemeToggler />
    </Container>
  );
};

export default Header;
