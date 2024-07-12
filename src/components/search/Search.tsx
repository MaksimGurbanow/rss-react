import React, { useState } from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.css';
import { SearchProps } from '../../types/props';

const Search = ({ queryValue, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(queryValue);
  return (
    <div className="search-field">
      <Input
        placeholder="Type here to search what you need"
        value={query}
        onChange={(v) => setQuery(v)}
      />
      <Button onClick={() => onSearch(query)}>Search</Button>
    </div>
  );
};

export default Search;
