'use client';

import { useMemo, useState } from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.scss';
import Toggle from '../toggle/Toggle';
import { BrightnessHighFill, MoonStarsFill } from 'react-bootstrap-icons';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import { SearchProps } from '../../types/props';

const Search = ({ searchValue }: SearchProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(searchValue);
  const { theme, toggleTheme } = useThemeContext();
  const valueChanged = useMemo(
    () => query !== searchValue,
    [query, searchValue],
  );
  return (
    <div className="search-field" data-testid="search-container">
      <Input
        placeholder="Type here to search what you need"
        value={query}
        onChange={(v) => setQuery(v)}
        testid="search-input"
      />
      <Button
        onClick={() => {
          if (valueChanged) {
            document.cookie = `searchQuery=${query}`;
            router.refresh();
          }
        }}
        testid="search-button"
        disabled={!valueChanged}
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
