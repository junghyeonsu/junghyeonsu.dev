import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  margin: 10px;
  width: 100px;
  height: 40px;
`;

// TODO: localstorage에 저장하고 불러오는 기능 해보기
const ThemeToggler = () => {
  const [theme, setTheme] = useState('light');
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return <Button onClick={() => setTheme(nextTheme)}>Change to {nextTheme} mode</Button>;
};

export default ThemeToggler;
