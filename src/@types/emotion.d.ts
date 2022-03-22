import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    header: {
      background: string;
      text: string;
    };
  }
}
