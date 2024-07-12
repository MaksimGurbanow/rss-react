import React, { useState } from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.css';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import { SearchProps } from '../../types/props';

const Search = ({ queryValue, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(queryValue);
  return (
    <div className="search-field">
      <ErrorBoundary fallback={() => <div>Search Input mounting failed</div>}>
        <Input
          placeholder="Type here to search what you need"
          value={query}
          onChange={(v) => setQuery(v)}
        />
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <div>Search Button mounting failed</div>}>
        <Button onClick={() => onSearch(query)}>Search</Button>
      </ErrorBoundary>
    </div>
  );
};

export default Search;
