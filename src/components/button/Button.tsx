import { ButtonProps } from '../../types/props';
import classes from './button.module.scss';

const Button = ({
  disabled,
  onClick,
  children,
  className,
  style,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`${classes.button} ${className}`}
      style={style}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
