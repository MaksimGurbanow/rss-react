import './button.css';
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
    onClick();
  };
  return (
    <button
      type={type || 'button'}
      onClick={handleClick}
      className={`${className} button ${disabled ? 'disabled' : ''}`}
      style={style}
      disabled={disabled}
      data-testid={testid}
    >
      {children}
    </button>
  );
};

export default Button;
