import { css, Global } from '@emotion/react';
import { themes } from './theme';
import { FONT } from '../constants';

const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

// reset css
// https://meyerweb.com/eric/tools/css/reset/
export const globalStyles = (
  <Global
    styles={css`
      ${reset}

      @font-face {
        font-family: ${FONT.NEXON_BOLD};
        src: url('/assets/fonts/NEXON-Lv2-Gothic-Bold.ttf');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: ${FONT.NEXON_LIGHT};
        src: url('/assets/fonts/NEXON-Lv2-Gothic-Light.ttf');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: ${FONT.NEXON_MEDIUM};
        src: url('/assets/fonts/NEXON-Lv2-Gothic-Medium.ttf');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: ${FONT.NEXON_REGULAR};
        src: url('/assets/fonts/NEXON-Lv2-Gothic.ttf');
        font-weight: normal;
        font-style: normal;
      }

      body {
        ${themes.light}
        transition: 0.125s all ease-in;

        font-family: ${FONT.NEXON_REGULAR};
      }

      @media (prefers-color-scheme: dark) {
        body {
          ${themes.dark}
        }
      }

      body[data-theme='light'] {
        ${themes.light};
      }

      body[data-theme='dark'] {
        ${themes.dark};
      }
    `}
  />
);
