import Loader from '../../../components/common/loader/Loader';
import List from '../../../components/list/List';
import Search from '../../../components/search/Search';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import Pagination from '../../../components/pagination/Pagination';
import '../main.scss';
import { RootState } from '../../../redux/store';
import SavedItems from '../../../components/savedItems/SavedItems';
import { cookies } from 'next/headers';
import getProducts from '../../../api/getProducts';

const Main = async () => {
  const cookiewStore = cookies();
  const searchQuery = cookiewStore.get('searchQuery')?.value || '';
  const response = await getProducts({ query: searchQuery });
  return (
    <div data-testid="main-page">
      {/* <Search
        onSearch={(value) => {
          update(value);
          push(`/main/1?search=${encodeURIComponent(value)}`);
        }}
        searchValue={searchQuery}
      /> */}
      {/* {productDetails && (
        <Details product={productDetails} productId={productId} />
      )} */}
      {response && <List items={response.products} />}
      {/* {!hasItems && <Loader />} */}
      {/* <Pagination page={page || 1} total={response?.total || 0} /> */}
      <SavedItems />
    </div>
  );
};

export default Main;
