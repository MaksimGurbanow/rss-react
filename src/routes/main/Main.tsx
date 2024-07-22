import Loader from '../../components/common/loader/Loader';
import List from '../../components/list/List';
import Search from '../../components/search/Search';
import { useFetching } from '../../hooks/useFetching';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import { DummyResponse } from '../../types/types';
import { searchProducts } from '../../app/api';
import { useEffect } from 'react';
import './main.scss';

const Main = () => {
  const { searchQuery, update } = useSearchQuery();
  const { page } = useParams();
  const numberPage = Number(page);
  const { isLoading, response } = useFetching<DummyResponse>(
    () => searchProducts(searchQuery, numberPage, import.meta.env.VITE_LIMIT),
    numberPage,
    searchQuery,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(numberPage)) navigate('not-found');
  }, []);

  return (
    <div data-testid="main-page">
      <Search
        onSearch={(value) => {
          update(value);
          navigate('/1');
        }}
        searchValue={searchQuery}
      />
      {response && <List items={response.products} />}
      {isLoading && <Loader />}
      {response && <Pagination page={numberPage} total={response.total} />}
      <Outlet />
    </div>
  );
};

export default Main;
