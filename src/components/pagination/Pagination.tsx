import Button from '../ui/button/Button';
import './pagination.scss';
import { PaginationProps } from '../../types/props';
import Link from 'next/link';

const Pagination = ({ total, page }: PaginationProps) => {
  const limit = Number(process.env.NEXT_PUBLIC_LIMIT) || 10;

  return (
    <div className="pagination">
      <Button
        className="pagination-pages__button previous"
        disabled={page <= 1}
        testid="pagination-previous"
      >
        {page > 1 ? (
          <Link href={`/main/${page - 1}`} className="pagination-link">
            Previous
          </Link>
        ) : (
          'Previous'
        )}
      </Button>
      {page * limit < total ? (
        <Link href={`/main/${page + 1}`} className="pagination-link">
          <Button
            className="pagination-pages__button next"
            disabled={page * limit >= total}
            testid="pagination-next"
          >
            Next
          </Button>
        </Link>
      ) : (
        <Button
          className="pagination-pages__button next"
          disabled={page * limit >= total}
          testid="pagination-next"
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
