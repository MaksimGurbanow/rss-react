import { forwardRef } from 'react';
import { InputProps } from '../../types/props';
import ErrorMessage from '../errorMessage/ErrorMessage';
import classes from './inputBlock.module.scss';
import Image from '../../assets/graphic-style.svg?react';

const InputBlock = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onInput,
      value,
      name,
      label = '',
      type,
      errors,
      accept,
      className,
      onChange,
    }: InputProps,
    ref,
  ) => {
    const isFile = type === 'file';
    return (
      <div
        className={`${classes.inputBlock} ${className} ${errors?.length ? classes.error : ''}`}
      >
        {label && (
          <label
            htmlFor={name}
            className={`${classes.inputBlockLabel} ${isFile && classes._file}`}
            onLoad={() => console.log(1)}
          >
            {label}
            {isFile && (
              <div className={classes.labelFileContext}>
                <Image width={80} height={80} />
              </div>
            )}
          </label>
        )}
        <input
          name={name}
          ref={ref}
          id={name}
          type={type}
          onChange={(e) => {
            console.log(1)
            if (onChange) {
              onChange(e);
            }
          }}
          value={value}
          accept={accept}
          className={`${classes.inputBlockInput} ${isFile && classes._file}`}
          onInput={({ target }) =>
            onInput && onInput((target as HTMLInputElement).value)
          }
        />
        <ErrorMessage errors={errors || []} />
      </div>
    );
  },
);

export default InputBlock;
