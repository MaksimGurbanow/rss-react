import { ButtonProps } from '../../types/props';
import classes from './button.module.scss';

const Button = ({
  disabled,
  onClick,
  children,
  className,
  style,
}: ButtonProps) => {
  console.log(classes);
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`${classes.button} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
