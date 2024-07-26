import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import './pagination.scss';
import { PaginationProps } from '../../types/props';

const Pagination = ({ page, total }: PaginationProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className="pagination-pages__button previous"
        onClick={() => navigate(`/${page - 1}`)}
        disabled={page <= 1}
        testid="pagination-previous"
      >
        Previous
      </Button>
      <Button
        className="pagination-pages__button next"
        disabled={page * import.meta.env.VITE_LIMIT > total}
        onClick={() => navigate(`/${page + 1}`)}
        testid="pagination-next"
      >
        Next
      </Button>
    </>
  );
};

export default Pagination;
