import React from 'react';
import './button.css';
import { ButtonProps } from '../../../types/props';

const Button = ({ onClick, type, className, children, style }: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      type={type || 'button'}
      onClick={handleClick}
      className={`${className} button`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
