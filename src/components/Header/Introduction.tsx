import { Button, useColorMode } from '@chakra-ui/react';

const Introduction = () => {
  const { colorMode } = useColorMode();
  return (
    <a href="https://hyeonsu-jung.vercel.app/" target="_blank">
      <Button
        variant="unstyled"
        fontSize={14}
        _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200' }}
        padding={1}
        _active={{ bg: 'transparent' }}
        style={{ boxShadow: 'none' }}
      >
        intro
      </Button>
    </a>
  );
};

export default Introduction;
