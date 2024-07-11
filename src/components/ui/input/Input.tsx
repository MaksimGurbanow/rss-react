import React from 'react';
import './input.css';
import { InputProps } from '../../../types/props';

const Input = ({ placeholder, value, onChange }: InputProps) => {
  const handleChange = (v: string) => {
    onChange(v);
  };
  return (
    <input
      placeholder={placeholder}
      className="search-input"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Input;
