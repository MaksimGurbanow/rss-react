import List from '../../../../components/list/List';
import Pagination from '../../../../components/pagination/Pagination';
import '../../main.scss';
import SavedItems from '../../../../components/savedItems/SavedItems';
import { cookies } from 'next/headers';
import getProducts from '../../../../api/getProducts';
import Search from '../../../../components/search/Search';
import Details from '../../../../components/details/Details';
import getProductById from '../../../../api/getProductById';

const Main = async ({
  params,
}: {
  params: { page: string; paths: string[] };
}) => {
  const { page, paths } = params;

  const [detailsPath, detailsId] = paths || [];

  const cookiewStore = cookies();
  const searchQuery = cookiewStore.get('searchQuery')?.value || '';
  const { total, products } = await getProducts({
    query: searchQuery,
    page: Number(page),
  });

  const productDetails =
    detailsPath && detailsId && (await getProductById(detailsId));

  return (
    <div data-testid="main-page">
      <Search searchValue={searchQuery} />
      {productDetails && (
        <Details productId={detailsId} product={productDetails} />
      )}
      {products && (
        <List items={products} detailsPath={`/main/${page}/details/`} />
      )}
      <Pagination total={total || 0} page={Number(page)} />
      <SavedItems />
    </div>
  );
};

export default Main;
