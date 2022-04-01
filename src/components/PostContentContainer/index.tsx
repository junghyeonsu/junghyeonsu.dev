import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const PostContentContainer = ({ children }: Props) => {
  return (
    <Box
      as="article"
      position="relative"
      width="800px"
      padding="7"
      marginTop="50"
      marginBottom="130"
    >
      {children}
    </Box>
  );
};

export default PostContentContainer;
