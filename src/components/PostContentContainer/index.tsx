import { Box } from '@chakra-ui/react';

import useBreakPoint from '../../hooks/useBreakPoint';

interface Props {
  children: React.ReactNode;
}

const PostContentContainer = ({ children }: Props) => {
  const isLargerThan900 = useBreakPoint();

  return (
    <Box
      as="article"
      position="relative"
      width={isLargerThan900 ? '800px' : '100vw'}
      padding={isLargerThan900 ? 7 : 5}
      marginTop={50}
      marginBottom={30}
    >
      {children}
    </Box>
  );
};

export default PostContentContainer;
