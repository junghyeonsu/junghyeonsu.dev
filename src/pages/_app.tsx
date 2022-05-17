import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { Layout } from '../components';
import { Chakra } from '../components/Chakra';

import * as ga from '../lib/ga';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Google Analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Chakra cookies={pageProps.cookies}>
        <Layout>
          <NextNProgress color="#68D391" height={2} />
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </>
  );
}

export default MyApp;

export { getServerSideProps } from '../components/Chakra';
