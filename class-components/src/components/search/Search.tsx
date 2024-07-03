import React from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import './search.css';
import { Callback } from '../../types/types';

interface SearchProps {
  value: string;
  onSearch: Callback;
  onChange: (v: string) => void;
}

export default class Search extends React.Component<SearchProps> {
  private handleSubmit() {
    this.props.onSearch();
  }

  render() {
    return (
      <div className="search-field">
        <Input
          placeholder="Type here to search what you need"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <Button onClick={this.handleSubmit}>Search</Button>
      </div>
    );
  }
}
