import { useState, useEffect } from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

type ThemeModeTogglerProps = Omit<IconButtonProps, 'aria-label'>;

const ThemeToggler: React.FC<ThemeModeTogglerProps> = () => {
  const [activeTheme, setActiveTheme] = useState<string | undefined>(document.body.dataset.theme);
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';
  const SwitchIcon = activeTheme === 'light' ? MoonIcon : SunIcon;

  useEffect(() => {
    if (activeTheme) {
      document.body.dataset.theme = activeTheme;
      window.localStorage.setItem('theme', activeTheme);
    }
  }, [activeTheme]);

  return (
    <IconButton
      fontSize="4xl"
      variant="ghost"
      onClick={() => setActiveTheme(inactiveTheme)}
      icon={<SwitchIcon />}
      _hover={{ bg: 'transparent' }}
      _active={{ bg: 'transparent' }}
      style={{ boxShadow: 'none' }}
      aria-label="darkmode toggle button"
    />
  );
};

export default ThemeToggler;
