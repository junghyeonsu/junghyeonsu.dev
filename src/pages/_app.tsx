import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { Layout } from '../components';
import { reset } from '../styles/reset';

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: 다크모드 훅 만들기
  const [mode, setMode] = useState('light');

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
      {reset}

      <Layout>
        <Component {...pageProps} />
        {/* TODO: 버튼 지우기 */}
        <button onClick={onClickButton}>darkmode</button>
      </Layout>
    </>
  );
}

export default MyApp;
