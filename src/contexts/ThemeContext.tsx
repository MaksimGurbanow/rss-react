import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { BaseProps } from '../types/props';

export type Theme = 'dark' | 'light';

export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: BaseProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      localStorage.setItem('theme', prev === 'light' ? 'dark' : 'light');
      return prev === 'light' ? 'dark' : 'light';
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`theme-wrapper ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}
        data-testid="theme-wrapper"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
