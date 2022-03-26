import styled from '@emotion/styled';
// import { themedPalette } from '../../styles/theme';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100vw;
  height: 100px;
`;

const Footer = () => {
  return <Container>@copyright 2022 junghyeonsu.dev</Container>;
};

export default Footer;
