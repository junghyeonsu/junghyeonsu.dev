import { Box, Spacer, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import About from './About';
import Logo from './Logo';
import RSS from '../RSS';

const ThemeToggler = dynamic(() => import('../ThemeToggler'), {
  ssr: false,
});

const Header = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      overflow="hidden"
      as="header"
      position="sticky"
      top="0"
      display="flex"
      paddingLeft={5}
      paddingRight={10}
      columnGap={4}
      zIndex="5"
      alignItems="center"
      width="100%"
      height="70px"
      shadow="md"
      backgroundColor={colorMode === 'dark' ? '#202125' : 'gray.50'}
    >
      <Logo />
      <Spacer />
      <About />
      <RSS />
      <ThemeToggler />
    </Box>
  );
};

export default Header;
