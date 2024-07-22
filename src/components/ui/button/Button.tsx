import './button.scss';
import { ButtonProps } from '../../../types/props';

const Button = ({
  onClick,
  type,
  className,
  children,
  style,
  disabled = false,
  testid,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <button
      type={type || 'button'}
      onClick={handleClick}
      className={`button ${disabled ? 'disabled' : ''} ${className}`}
      style={style}
      disabled={disabled}
      data-testid={testid}
    >
      {children}
    </button>
  );
};

export default Button;
