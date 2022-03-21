interface Theme {
  light: ThemeMode;
  dark: ThemeMode;
}

interface ThemeMode {
  header: {
    [style: string]: string;
  };
}

const light: ThemeMode = {
  header: {
    text: '#1f1f1f',
    background: '#ffffff',
  },
};

const dark: ThemeMode = {
  header: {
    text: '#ffffff',
    background: '#1f1f1f',
  },
};

export const theme: Theme = {
  light: { ...light },
  dark: { ...dark },
};
