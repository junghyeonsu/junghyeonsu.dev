import { Button, useColorMode, useMediaQuery } from '@chakra-ui/react';

import Link from 'next/link';

const Logo = () => {
  const { colorMode } = useColorMode();
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)');
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
        {isLargerThan600 ? 'junghyeonsu.dev' : 'hyeonsu'}
      </Button>
    </Link>
  );
};

export default Logo;
