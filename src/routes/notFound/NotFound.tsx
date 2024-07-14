import './notFound.css';
import Button from '../../components/ui/button/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-message" data-testid="not-found-page">
      <h3 data-testid="not-found-message">
        Oops... You got non existing page. Would you like to move to the main
        page?
      </h3>

      <Button
        className="not-found-button"
        onClick={() => navigate('/1')}
        testid="not-found-button"
      >
        Move to main
      </Button>
    </div>
  );
};

export default NotFound;
