import React from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.css';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import { SearchProps } from '../../types/props';

const Search = ({ value, onChange, onSearch }: SearchProps) => {
  return (
    <div className="search-field">
      <ErrorBoundary fallback={() => <div>Search Input mounting failed</div>}>
        <Input
          placeholder="Type here to search what you need"
          value={value}
          onChange={onChange}
        />
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <div>Search Button mounting failed</div>}>
        <Button onClick={onSearch}>Search</Button>
      </ErrorBoundary>
    </div>
  );
};

export default Search;
