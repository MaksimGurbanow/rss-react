import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import classes from './main.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import Alert from '../../components/alert/Alert';

const Main = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className={classes.mainPage}>
      <Alert />
      <div className={classes.buttons}>
        <Button onClick={() => navigate('/forms/uncontrolled')}>
          Uncontrolled form
        </Button>
        <Button onClick={() => navigate('/forms/hooked')}>
          <span className={classes.hookedButton}>Hooked form</span>
        </Button>
      </div>
      {user.isLogined ? (
        <div className={classes.userInfoTable}>
          <div className={classes.userInfo}>
            <div>Name</div>
            <div>{user.name}</div>
          </div>
          <div className={classes.userInfo}>
            <div>Password</div>
            <div>{user.password}</div>
          </div>
          <div className={classes.userInfo}>
            <div>Email</div>
            <div>{user.email}</div>
          </div>
          <div className={classes.userInfo}>
            <div>Country</div>
            <div>{user.country}</div>
          </div>
          <div className={classes.userInfo}>
            <div>Gender</div>
            <div>{user.gender}</div>
          </div>
          <div className={classes.userInfo}>
            <div>Terms and conditions</div>
            <div>{user.termsAndConditions && 'Accepted'}</div>
          </div>
          <div className={classes.imageBlock}>
            <h4>image</h4>
            <img src={user.image} alt="user" className={classes.image} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
