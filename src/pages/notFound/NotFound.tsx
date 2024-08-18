import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import classes from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={classes.notFoundPage}>
      <h3>
        Oops... You got a non-existing page. Would you move to the main page?
      </h3>
      <Link to="/">
        <Button>Move</Button>
      </Link>
    </div>
  );
};

export default NotFound;
