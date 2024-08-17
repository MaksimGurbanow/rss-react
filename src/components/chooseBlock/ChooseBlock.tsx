import { ChooseProps } from '../../types/props';
import ErrorMessage from '../errorMessage/ErrorMessage';
import InputBlock from '../inputBlock/InputBlock';
import classes from './chooseBlock.module.scss';

const ChooseBlock = ({ options, isMultiple = false, error }: ChooseProps) => {
  return (
    <div className={classes.chooseBlock}>
      {options.map((option, index) => (
        <InputBlock
          type={isMultiple ? 'checkbox' : 'radio'}
          key={`${index}`}
          innerRef={option.ref}
          name={option.name}
          value={option.value}
          label={option.label}
        />
      ))}
      <ErrorMessage errors={error || []} />
    </div>
  );
};

export default ChooseBlock;
