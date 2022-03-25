import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const setInitialTheme = `
    function getUserPreference() {
        if (window.localStorage.getItem('theme')) {
          return window.localStorage.getItem('theme')
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.body.dataset.theme = getUserPreference();
    `;

    return (
      <Html lang="ko">
        <Head>
          <link href="/assets/fonts/NEXON-Lv2-Gothic-Bold.ttf" rel="stylesheet" />
          <link href="/assets/fonts/NEXON-Lv2-Gothic-Light.ttf" rel="stylesheet" />
          <link href="/assets/fonts/NEXON-Lv2-Gothic-Medium.ttf" rel="stylesheet" />
          <link href="/assets/fonts/NEXON-Lv2-Gothic.ttf" rel="stylesheet" />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
