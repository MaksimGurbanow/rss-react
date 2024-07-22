import Loader from '../../components/common/loader/Loader';
import List from '../../components/list/List';
import Search from '../../components/search/Search';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import { useGetProductsPageQuery } from '../../app/redux/slices/currentPage';
import { useEffect } from 'react';
import './main.scss';
import { RootState } from '../../app/redux/store';
import SavedItems from '../../components/savedItems/SavedItems';
import { useSelector } from 'react-redux';

const Main = () => {
  const { searchQuery, update } = useSearchQuery();
  const { page } = useParams();
  const numberPage = Number(page);
  const { isFetching, data: response } = useGetProductsPageQuery({
    query: searchQuery,
    page: numberPage,
    limit: import.meta.env.VITE_LIMIT,
  });
  const navigate = useNavigate();
  const savedProducts = useSelector((state: RootState) => state.savedProducts);

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
      {isFetching && <Loader />}
      {response && <Pagination page={numberPage} total={response.total} />}
      {savedProducts.length && <SavedItems />}
      <Outlet />
    </div>
  );
};

export default Main;
