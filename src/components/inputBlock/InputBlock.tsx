import { InputProps } from '../../types/props';
import ErrorMessage from '../errorMessage/ErrorMessage';
import classes from './inputBlock.module.scss';

const InputBlock = ({
  onInput,
  value,
  name,
  label,
  type,
  innerRef,
  onChange,
  autocomplete = '',
  errors,
  accept,
}: InputProps) => {
  return (
    <div className={classes.inputBlock}>
      {label && <label htmlFor={value}>{label}</label>}
      <input
        name={name}
        ref={innerRef}
        id={value}
        type={type}
        value={value}
        accept={accept}
        onInput={({ target }) =>
          onInput && onInput((target as HTMLInputElement).value)
        }
        onChange={({ target }) =>
          onChange && onChange((target as HTMLInputElement).value)
        }
        autoComplete={autocomplete || undefined}
      />
      <ErrorMessage errors={errors || []} />
    </div>
  );
};

export default InputBlock;
