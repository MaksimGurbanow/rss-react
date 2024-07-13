import { useMemo, useState } from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.css';
import { SearchProps } from '../../types/props';

const Search = ({ searchValue, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(searchValue);
  const inputValueChanged = useMemo(
    () => searchValue !== query && !!(query || searchValue),
    [query],
  );
  return (
    <div className="search-field">
      <Input
        placeholder="Type here to search what you need"
        value={query}
        onChange={(v) => setQuery(v)}
      />
      <Button
        onClick={() => {
          if (inputValueChanged) onSearch(query);
        }}
        disabled={!inputValueChanged}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
