import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

type ThemeModeTogglerProps = Omit<IconButtonProps, 'aria-label'>;

const ThemeToggler: React.FC<ThemeModeTogglerProps> = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <>
      <IconButton
        fontSize="4xl"
        variant="ghost"
        onClick={() => toggleColorMode()}
        icon={<SwitchIcon />}
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        style={{ boxShadow: 'none' }}
        aria-label="darkmode toggle button"
      />
      <Button>버튼</Button>
    </>
  );
};

export default ThemeToggler;
