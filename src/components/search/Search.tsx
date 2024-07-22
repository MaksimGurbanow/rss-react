import { useMemo, useState } from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.scss';
import { SearchProps } from '../../types/props';
import Toggle from '../toggle/Toggle';
import { BrightnessHighFill, MoonStarsFill } from 'react-bootstrap-icons';
import { useThemeContext } from '../../contexts/ThemeContext';

const Search = ({ searchValue, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(searchValue);
  const inputValueChanged = useMemo(
    () => searchValue !== query && !!(query || searchValue),
    [query],
  );

  const { theme, toggleTheme } = useThemeContext();
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
          if (inputValueChanged) onSearch(query);
        }}
        disabled={!inputValueChanged}
        testid="search-button"
      >
        Search
      </Button>
      <Toggle
        initial={{ icon: <BrightnessHighFill /> }}
        end={{ icon: <MoonStarsFill /> }}
        callback={toggleTheme}
        defaultToggled={theme === 'light'}
      />
    </div>
  );
};

export default Search;
