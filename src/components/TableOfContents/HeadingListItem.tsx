import { Box, Text } from '@chakra-ui/react';

interface CommonHeadingListItemProps {
  isDarkMode: boolean;
  isActive: boolean;
  id: string;
  text: string | null;
  nodeName: string;
}

const HeadingListItem = (props: CommonHeadingListItemProps) => {
  const { isDarkMode, isActive, id, text, nodeName } = props;

  const sx = {
    position: 'relative',
    _hover: { color: isDarkMode ? 'white' : 'black' },
    fontWeight: isActive ? 'medium' : 'light',
    color: isDarkMode
      ? isActive
        ? 'white'
        : 'whiteAlpha.700'
      : isActive
      ? 'black'
      : 'blackAlpha.700',
    listStyleType: 'none',
  };

  switch (nodeName) {
    case 'H1':
      return (
        <Box as="li" sx={sx} fontSize="14px">
          <Text as="a" href={`#${id}`}>
            {text}
          </Text>
        </Box>
      );
    case 'H2':
      return (
        <Box as="li" sx={sx} fontSize="13px" left="20px">
          <Text as="a" href={`#${id}`}>
            {text}
          </Text>
        </Box>
      );
    case 'H3':
      return (
        <Box as="li" sx={sx} fontSize="12px" left="40px">
          <Text as="a" href={`#${id}`}>
            {text}
          </Text>
        </Box>
      );
    default:
      return null;
  }
};

export default HeadingListItem;
