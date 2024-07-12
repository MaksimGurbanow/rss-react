import React from 'react';
import './notFound.css';
import Button from '../../components/ui/button/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-message">
      <h3>
        Oops... You got non existiong page. Would you like to move to the main
        page?
      </h3>

      <Button className="not-found-button" onClick={() => navigate('/main')}>
        Move to main
      </Button>
    </div>
  );
};

export default NotFound;
