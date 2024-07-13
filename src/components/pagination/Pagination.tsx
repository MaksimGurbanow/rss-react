import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import './pagination.css';
import { PaginationProps } from '../../types/props';

const Pagination = ({ page, total }: PaginationProps) => {
  const navigate = useNavigate();
  return (
    <div className="pagination-pages">
      <Button
        className="pagination-pages__button"
        onClick={() => navigate(`/${page - 1}`)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Button
        className="pagination-pages__button"
        disabled={page * import.meta.env.VITE_TOTAL > total}
        onClick={() => navigate(`/${page + 1}`)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
