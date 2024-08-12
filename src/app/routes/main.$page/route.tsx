import './main.scss';
import Search from '../../../components/search/Search';
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { LoaderFunctionArgs } from '@remix-run/node';
import getProducts from '../../../api/getProducts';
import List from '../../../components/list/List';
import Pagination from '../../../components/pagination/Pagination';
import { Suspense } from 'react';
import Loader from '../../../components/common/loader/Loader';
import SavedItems from '../../../components/savedItems/SavedItems';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const page = Number(params.page);
  const searchQuery = request?.url
    ? new URL(request?.url)?.searchParams?.get('searchQuery') || ''
    : '';
  const res = getProducts({
    query: searchQuery,
    page,
  });
  return defer({ res, page });
};

const Main = () => {
  const { searchQuery, update } = useSearchQuery();
  const { res, page } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  return (
    <div data-testid={`main-page-${page}`}>
      {navigation.state === 'loading' ? <Loader /> : ''}
      <Search searchValue={searchQuery} onSearch={update} />
      <Outlet />
      <Suspense fallback={<Loader />}>
        <Await resolve={res}>{(res) => <List items={res.products} />}</Await>
      </Suspense>
      <Await resolve={res}>
        {(res) => <Pagination total={res.total || 0} page={page} />}
      </Await>

      <SavedItems />
    </div>
  );
};

export default Main;
