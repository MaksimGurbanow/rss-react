'use client';

import './button.scss';
import { ButtonProps } from '../../../types/props';

const Button = ({
  type,
  className,
  children,
  style,
  disabled = false,
  testid,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      className={`button ${disabled ? 'disabled' : ''} ${className}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
      data-testid={testid}
    >
      {children}
    </button>
  );
};

export default Button;
