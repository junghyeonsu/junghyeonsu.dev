import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';

import theme from '../../styles/theme';

interface Props {
  cookies: string;
  children: React.ReactNode;
}

export function Chakra({ cookies, children }: Props) {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
// TODO: type 고치기
export function getServerSideProps({ req }: { req: any }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
}
