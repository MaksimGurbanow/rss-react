import React from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.css';
import { Callback } from '../../types/types';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';

interface SearchProps {
  value: string;
  onSearch: Callback;
  onChange: (v: string) => void;
}

export default class Search extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return (
      <div className="search-field">
        <ErrorBoundary fallback={() => <div>Search Input mounting failed</div>}>
          <Input
            placeholder="Type here to search what you need"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </ErrorBoundary>
        <ErrorBoundary
          fallback={() => <div>Search Button mounting failed</div>}
        >
          <Button onClick={this.props.onSearch}>Search</Button>
        </ErrorBoundary>
      </div>
    );
  }
}
