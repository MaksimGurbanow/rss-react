import Button from '../ui/button/Button';
import './pagination.scss';
import { PaginationProps } from '../../types/props';
import { useRouter } from 'next/router';

const Pagination = ({ page, total }: PaginationProps) => {
  const router = useRouter();
  return (
    <>
      <Button
        className="pagination-pages__button previous"
        onClick={() => router.push(`/main/${page - 1}`)}
        disabled={page <= 1}
        testid="pagination-previous"
      >
        Previous
      </Button>
      <Button
        className="pagination-pages__button next"
        disabled={page * process.env.NEXT_PUBLIC_LIMIT > total}
        onClick={() => router.push(`/main/${page + 1}`)}
        testid="pagination-next"
      >
        Next
      </Button>
    </>
  );
};

export default Pagination;
