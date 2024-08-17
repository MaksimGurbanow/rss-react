import { SelectProps } from '../../types/props';
import classes from './select.module.scss';

const Select = ({ options, innerRef }: SelectProps) => {
  return (
    <select className={classes.selectBlock} ref={innerRef}>
      {options.map((option, index) => (
        <option
          value={option.value}
          label={option.label}
          key={`${index}-${option.label}-${option.value}`}
        />
      ))}
    </select>
  );
};

export default Select;
