import { Box, Text, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState, memo, useMemo } from 'react';

import useIntersectionObserver from './useIntersectionObserver';
import HeadingListItem from './HeadingListItem';

import { STYLE } from '../../constants';

interface NestedHeadingType {
  nodeName: string;
  text: string | null;
  id: string;
}

const TableOfContents = () => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeadingType[]>([]);
  const { colorMode } = useColorMode();
  const [activeId, setActiveId] = useState<string>();

  const isDarkMode = useMemo(() => colorMode === 'dark', [colorMode]);

  useIntersectionObserver(setActiveId);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    const headingElementsTexts = headingElements.map(heading => {
      const { nodeName, childNodes, id } = heading;
      return { nodeName, id, text: childNodes[0].textContent };
    });
    setNestedHeadings(headingElementsTexts);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="fixed"
      width={`calc((100vw - ${STYLE.CONTENT_WIDTH}) / 2 - 50px)`} // NOTE: ((전체 화면 사이즈 - 컨텐츠 사이즈) / 2) - 여분 px)
      height="80vh"
      right="10px"
      top="150px"
      padding="0px 20px"
      as="nav"
      overflow="hidden auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Text as="p" fontSize="14px" fontWeight="bold">
        ON THIS PAGE
      </Text>
      <Box
        as="ul"
        display="flex"
        position="relative"
        flexDirection="column"
        transition="fontWeight 0.3s ease"
      >
        {nestedHeadings.map(({ nodeName, text, id }) => (
          <HeadingListItem
            key={id}
            isActive={id === activeId}
            isDarkMode={isDarkMode}
            id={id}
            text={text}
            nodeName={nodeName}
          />
        ))}
      </Box>
    </Box>
  );
};

export default memo(TableOfContents);
