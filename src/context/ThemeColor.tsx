import { createContext, useEffect, useState } from 'react';
import { BaseProps } from '../types/props';

type Theme = 'dark' | 'white';

interface ThemeColor {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const ThemeColorContext = createContext<ThemeColor | null>(null);

const ThemeColorProvider = ({ children }: BaseProps) => {
  const [theme, setTheme] = useState<Theme>('white');
  useEffect(() => {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'white');
    setTheme(localStorage.getItem('theme') as Theme);
  });

  return (
    <ThemeColorContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeColorContext.Provider>
  );
};

export default ThemeColorProvider;
