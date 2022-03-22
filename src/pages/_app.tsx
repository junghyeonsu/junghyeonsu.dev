import { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { Layout } from '../components';
import { globalStyles } from '../styles/GlobalStyles';
import { dark, light } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: 다크모드 훅 만들기
  const [mode, setMode] = useState('light');
  const currentTheme = mode === 'light' ? light : dark;

  useEffect(() => {
    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // TODO: 버튼 따로 옮기기
  const onClickButton = () => {
    if (mode === 'light') setMode('dark');
    else setMode('light');
  };

  return (
    <>
      {globalStyles}
      <ThemeProvider theme={currentTheme}>
        <Layout>
          <Component {...pageProps} />
          {/* TODO: 버튼 지우기 */}
          <button onClick={onClickButton}>darkmode</button>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
