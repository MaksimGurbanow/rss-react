import { useEffect } from 'react';
import { useNotification } from '../../context/Notification';
import classes from './alert.module.scss';

const Alert = () => {
  const { visible, setVisible } = useNotification();
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);
  if (!visible) return null;
  return (
    <div className={classes.alertWrapper}>
      <div className={classes.alert}>You have succesfully logined</div>
    </div>
  );
};

export default Alert;
