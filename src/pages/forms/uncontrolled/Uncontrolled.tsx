import { useRef } from 'react';
import classes from './uncontrolled.module.scss';
import InputBlock from '../../../components/inputBlock/InputBlock';

const Uncontroled = () => {
  const name = useRef('');
  return (
    <div className={classes.formPage}>
      <h3>uncontroleed components form</h3>
      <form>
        <InputBlock name="name" ref={name} />
      </form>
    </div>
  );
};

export default Uncontroled;
