import Button from '../ui/button/Button';
import './pagination.scss';
import { PaginationProps } from '../../types/props';
import { json, Link, useLoaderData, useLocation } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import formatAddress from '../../utils/formatAddress';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const page = Number(params.page);
  const searchQuery =
    new URL(request?.url).searchParams.get('searchQuery') || '';
  return json({ limit: 10, page, searchQuery });
};

const Pagination = ({ total }: PaginationProps) => {
  const { searchQuery = '', page, limit = 10 } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  return (
    <div className="pagination">
      <Button
        className="pagination-pages__button previous"
        disabled={page <= 1}
        testid="pagination-previous"
      >
        {page > 1 ? (
          <Link
            to={formatAddress({
              query: searchQuery,
              pathname,
              newPage: page - 1,
            })}
            className="pagination-link"
          >
            Previous
          </Link>
        ) : (
          'Previous'
        )}
      </Button>
      {page * limit < total ? (
        <Link
          to={formatAddress({
            query: searchQuery,
            pathname,
            newPage: page + 1,
          })}
          className="pagination-link"
        >
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
