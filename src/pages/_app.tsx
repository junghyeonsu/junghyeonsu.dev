import { AppProps } from 'next/app';
import { Layout } from '../components';
import { ChakraProvider } from '@chakra-ui/react';
import { globalStyles } from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
