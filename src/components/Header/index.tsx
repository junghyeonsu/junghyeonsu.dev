import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { themedPalette } from '../../styles/theme';

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
  background-color: ${themedPalette.bg_page1};

  a {
    color: ${themedPalette.text1};
  }
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
