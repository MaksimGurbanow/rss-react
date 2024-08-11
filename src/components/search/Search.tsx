import { useEffect, useMemo, useState } from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.scss';
import Toggle from '../toggle/Toggle';
import { BrightnessHighFill, MoonStarsFill } from 'react-bootstrap-icons';
import { useThemeContext } from '../../contexts/ThemeContext';
import { SearchProps } from '../../types/props';
import { useLocation, useNavigate } from '@remix-run/react';
import formatAddress from '../../utils/formatAddress';

const Search = ({ searchValue, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(searchValue || '');
  const { theme, toggleTheme } = useThemeContext();
  const valueChanged = useMemo(
    () => query !== searchValue,
    [query, searchValue],
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setQuery(searchValue || '');
  }, [searchValue]);
  return (
    <div className="search-field" data-testid="search-container">
      <Input
        placeholder="Type here to search what you need"
        value={query}
        onChange={(v) => setQuery(v)}
        testid="search-input"
      />
      <Button
        testid="search-button"
        disabled={!valueChanged}
        onClick={() => {
          if (valueChanged && onSearch) {
            onSearch(query as string);
            navigate(formatAddress({ query, pathname, newPage: 1 }));
          }
        }}
      >
        Search
      </Button>
      <Toggle
        initial={{ icon: <BrightnessHighFill /> }}
        end={{ icon: <MoonStarsFill /> }}
        callback={toggleTheme}
        defaultToggled={theme === 'dark'}
        testid="toggle-theme"
      />
    </div>
  );
};

export default Search;
