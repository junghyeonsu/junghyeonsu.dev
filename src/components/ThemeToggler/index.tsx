import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  margin: 10px;
  width: 100px;
  height: 40px;
`;

const ThemeToggler = () => {
  const [activeTheme, setActiveTheme] = useState('light');
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    savedTheme && setActiveTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  return (
    <Button onClick={() => setActiveTheme(inactiveTheme)}>Change to {inactiveTheme} mode</Button>
  );
};

export default ThemeToggler;
