import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import classes from './main.module.scss';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.mainPage}>
      <Button onClick={() => navigate('/forms/uncontrolled')}>
        Uncontrolled form
      </Button>
      <Button onClick={() => navigate('/forms/hooked')}>
        <span className={classes.hookedButton}>Hooked form</span>
      </Button>
    </div>
  );
};

export default Main;
