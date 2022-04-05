import { Box, Spacer, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Introduction from './Introduction';
import Logo from './Logo';

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
      columnGap={5}
      zIndex="5"
      alignItems="center"
      width="100%"
      height="70px"
      shadow="md"
      backgroundColor={colorMode === 'dark' ? '#202125' : 'gray.50'}
    >
      <Logo />
      <Spacer />
      <Introduction />
      <ThemeToggler />
    </Box>
  );
};

export default Header;
