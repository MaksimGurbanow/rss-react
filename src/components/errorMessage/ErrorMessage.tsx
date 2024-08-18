import genKey from '../../utils/genKey';
import classes from './errorMessage.module.scss';

const ErrorMessage = ({ errors }: { errors: string[] }) => {
  return errors?.length ? (
    <div className={classes.errorMessage}>
      {errors.map((error) => (
        <p key={'error' + genKey()}>{error}</p>
      ))}
    </div>
  ) : null;
};

export default ErrorMessage;
