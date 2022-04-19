import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import DarkModeRSS from './DarkModeRSS';
import LightModeRSS from './LightModeRSS';

type ThemeModeTogglerProps = Omit<IconButtonProps, 'aria-label'>;

const RSS: React.FC<ThemeModeTogglerProps> = () => {
  const { colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(LightModeRSS, DarkModeRSS);

  return (
    <Link href="/rss.xml" passHref>
      <IconButton
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="2xl"
        borderRadius="3xl"
        variant="unstyled"
        icon={<SwitchIcon />}
        _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200' }}
        _active={{ bg: 'transparent' }}
        style={{ boxShadow: 'none' }}
        aria-label="darkmode toggle button"
      />
    </Link>
  );
};

export default RSS;
