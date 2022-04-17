import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@chakra-ui/react';

const UTTERANC_SRC = 'https://utteranc.es';
const DARK_THEME = 'photon-dark';
const LIGHT_THEME = 'github-light';
const UTTERANCES_SELECTOR = 'iframe.utterances-frame';
const REPOSITORY = 'junghyeonsu.dev.comment';

const Utterances = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const containerRef = useRef<any>(); // TODO: any 처리
  const theme = colorMode === 'dark' ? DARK_THEME : LIGHT_THEME;

  useEffect(() => {
    const createUtterancesEl = () => {
      const comment = document.createElement('script');
      const attributes = {
        src: `${UTTERANC_SRC}/client.js`,
        repo: `junghyeonsu/${REPOSITORY}`,
        'issue-term': 'title',
        label: 'comment',
        theme,
        crossOrigin: 'anonymous',
        async: 'true',
      };
      Object.entries(attributes).forEach(([key, value]) => {
        comment.setAttribute(key, value);
      });
      containerRef.current.appendChild(comment);
    };

    const postThemeMessage = () => {
      const message = {
        type: 'set-theme',
        theme,
      };
      utterancesEl.contentWindow.postMessage(message, UTTERANC_SRC);
    };

    const utterancesEl = containerRef.current.querySelector(UTTERANCES_SELECTOR);
    utterancesEl ? postThemeMessage() : createUtterancesEl();
  }, [theme]);

  return (
    <>
      <div ref={containerRef} />
    </>
  );
};

export default Utterances;
