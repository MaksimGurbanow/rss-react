import { forwardRef } from 'react';
import { SelectProps } from '../../types/props';
import ErrorMessage from '../errorMessage/ErrorMessage';
import classes from './select.module.scss';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, name, id, label, errors, onChange }: SelectProps, ref) => {
    return (
      <div
        className={`${classes.selectBlock} ${errors?.length ? classes.error : null}`}
      >
        <label htmlFor={id}>{label}</label>
        <select
          className={classes.selectForm}
          ref={ref}
          spellCheck
          defaultValue=""
          defaultChecked={false}
          name={name}
          id={id || name}
          onChange={(e) => onChange && onChange(e)}
        >
          <option value=""></option>
          {options.map((option, index) => (
            <option
              value={option.value}
              label={option.label}
              key={`${index}-${option.label}-${option.value}`}
            />
          ))}
        </select>
        <ErrorMessage errors={errors || []} />
      </div>
    );
  },
);

export default Select;
