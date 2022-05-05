import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // usage: mode(ligthModeColor, darkModeColor)(props)

interface ColorMode {
  colorMode: 'dark' | 'light';
}

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: ColorMode) => ({
      'html, body': {
        fontFamily: 'Noto Sans KR, sans-serif',
        backgroundColor: mode('gray.50', '#202125')(props),
      },
    }),
  },
});

export default theme;
