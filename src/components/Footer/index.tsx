import styled from '@emotion/styled';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100vw;
  height: 100px;
  background-color: ${props => props.theme.header.background};
  color: ${props => props.theme.header.text};
`;

const Footer = () => {
  return <Container>@copyright 2022 junghyeonsu.dev</Container>;
};

export default Footer;
