import { Link } from '@remix-run/react';
import '../(not-found)/notFound.scss';
import Button from '../../components/ui/button/Button';
import { json } from '@remix-run/node';

export const loader = () => {
  return json(null, { status: 404 });
};

const NotFound = () => {
  return (
    <div className="not-found-message" data-testid="not-found-page">
      <h3 data-testid="not-found-message">
        Oops... You got non existing page. Would you like to move to the main
        page?
      </h3>

      <Link to="/main/1">
        <Button className="not-found-button" testid="not-found-button">
          Move to main
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
