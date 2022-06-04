// import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { renderStatic } from '../lib/renderer';

// import theme from '../styles/theme';

export default class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInitialProps(ctx: any) {
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          <style data-emotion={`css ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
        </>,
      ],
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || []; function
                gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config',
                '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { page_path:
                  window.location.pathname, });
                  `,
            }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="03tUkcTUQFs2twM6WNUdGdFy78xmlW1U0EfmTfRGCS8"
          />
          <meta name="naver-site-verification" content="e7d38efb01c531754d6451648bcf717de8faf98e" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
