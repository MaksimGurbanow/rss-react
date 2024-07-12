import React from 'react';
import './button.css';
import { ButtonProps } from '../../../types/props';

const Button = ({
  onClick,
  type,
  className,
  children,
  style,
  disabled = false,
}: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      type={type || 'button'}
      onClick={handleClick}
      className={`${className} button ${disabled ? 'disabled' : ''}`}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
