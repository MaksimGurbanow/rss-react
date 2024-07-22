import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import './pagination.scss';
import { PaginationProps } from '../../types/props';

const Pagination = ({ page, total }: PaginationProps) => {
  const navigate = useNavigate();
  return (
    <div className="pagination-pages" data-testid="pagination-container">
      <Button
        className="pagination-pages__button"
        onClick={() => navigate(`/${page - 1}`)}
        disabled={page <= 1}
        testid="pagination-previous"
      >
        Previous
      </Button>
      <Button
        className="pagination-pages__button"
        disabled={page * import.meta.env.VITE_LIMIT > total}
        onClick={() => navigate(`/${page + 1}`)}
        testid="pagination-next"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
