/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    gtag: (param1: string, param2: string | undefined, param3: object) => void;
  }
}

export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};
