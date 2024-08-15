import { InputProps } from '../../types/props';
import classes from './inputBlock.module.scss';

const InputBlock = ({
  onInput,
  value,
  name,
  labelText,
  type,
  validation,
}: InputProps) => {
  console.log(validation);
  return (
    <div className={classes.inputBlock}>
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onInput={({ target }) =>
          onInput && onInput((target as HTMLInputElement).value)
        }
      />
    </div>
  );
};

export default InputBlock;
