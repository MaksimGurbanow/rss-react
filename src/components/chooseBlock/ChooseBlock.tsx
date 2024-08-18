import { forwardRef } from 'react';
import { ChooseProps } from '../../types/props';
import ErrorMessage from '../errorMessage/ErrorMessage';
import InputBlock from '../inputBlock/InputBlock';
import classes from './chooseBlock.module.scss';

const ChooseBlock = forwardRef<HTMLDivElement, ChooseProps>(
  (
    {
      options,
      isMultiple = false,
      error,
      text = '',
      className,
      onChange,
    }: ChooseProps,
    ref,
  ) => {
    return (
      <div
        className={`${classes.chooseBlock} ${error?.length && classes.error}`}
        ref={ref}
        onChange={(e) => onChange && onChange(e)}
      >
        {text && <div className={classes.chooseBlockText}>{text}</div>}
        <div className={classes.optionsBlock}>
          {options.map((option, index) => (
            <InputBlock
              type={isMultiple ? 'checkbox' : 'radio'}
              key={`${index}`}
              ref={option.ref}
              name={option.name}
              value={option.value as string}
              label={option.label}
              className={className || classes.option}
            />
          ))}
        </div>
        <ErrorMessage errors={error || []} />
      </div>
    );
  },
);

export default ChooseBlock;
