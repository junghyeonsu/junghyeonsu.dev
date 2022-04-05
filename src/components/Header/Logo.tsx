import { Button, useColorMode } from '@chakra-ui/react';

import Link from 'next/link';

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Link href="/">
      <Button
        variant="unstyled"
        fontSize={14}
        _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200' }}
        padding={1}
        _active={{ bg: 'transparent' }}
        style={{ boxShadow: 'none' }}
      >
        junghyeonsu.dev
      </Button>
    </Link>
  );
};

export default Logo;
