import React from 'react';
import './input.css';

export interface InputProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export default class Input extends React.Component<InputProps> {
  private handleChange(v: string) {
    this.props.onChange(v);
  }
  render() {
    return (
      <input
        placeholder={this.props?.placeholder}
        className="search-input"
        value={this.props.value}
        onChange={(e) => this.handleChange(e.target.value)}
      />
    );
  }
}
