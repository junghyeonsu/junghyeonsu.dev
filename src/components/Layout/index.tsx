import { useColorMode } from '@chakra-ui/react';
import Head from 'next/head';

import { Header, Footer } from '../';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { colorMode } = useColorMode();

  const favicon =
    colorMode === 'dark' ? (
      <link rel="icon" href="/dark_favicon.png" />
    ) : (
      <link rel="icon" href="/light_favicon.png" />
    );

  return (
    <>
      <Head>{favicon}</Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
