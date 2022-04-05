import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const PostContentContainer = ({ children }: Props) => {
  return (
    <Box as="article" position="relative" width={800} padding={7} marginTop={50} marginBottom={30}>
      {children}
    </Box>
  );
};

export default PostContentContainer;
