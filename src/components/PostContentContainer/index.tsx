import { Box } from '@chakra-ui/react';

import useMediaQuery from '../../hooks/useMediaQuery';

import { STYLE } from '../../constants';

interface Props {
  children: React.ReactNode;
}

const PostContentContainer = ({ children }: Props) => {
  const mediaQuery = useMediaQuery();

  return (
    <Box
      as="article"
      position="relative"
      width={mediaQuery?.isLargerThan900 ? STYLE.CONTENT_WIDTH : '100vw'}
      padding={mediaQuery?.isLargerThan900 ? 7 : 5}
      marginTop={50}
      marginBottom={30}
    >
      {children}
    </Box>
  );
};

export default PostContentContainer;
