import { Box, useColorMode } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const ThemeToggler = dynamic(() => import('../ThemeToggler'), {
  ssr: false,
});

const Header = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      display="flex"
      zIndex="5"
      justifyContent="space-evenly"
      alignItems="center"
      width="100vw"
      height="70px"
      shadow="sm"
      backgroundColor={colorMode === 'dark' ? '#202125' : 'gray.50'}
    >
      <a target="_blank" href="https://hyeonsu-jung.vercel.app/">
        소개
      </a>
      <ThemeToggler />
    </Box>
  );
};

export default Header;
