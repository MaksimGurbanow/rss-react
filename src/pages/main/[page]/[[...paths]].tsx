import Loader from '../../../components/common/loader/Loader';
import List from '../../../components/list/List';
import Search from '../../../components/search/Search';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import Pagination from '../../../components/pagination/Pagination';
import '../main.scss';
import { RootState } from '../../../app/redux/store';
import SavedItems from '../../../components/savedItems/SavedItems';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { DummyResponse, Product } from '../../../types/types';
import Details from '../../../components/details/Details';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const page = Number(query.page) || 1;
  const search = (query.search as string) || '';
  const paths = (query.paths as string[]) || [];
  console.log(paths);
  const isDetailsPage = Boolean((paths as string[])[0]);
  const productId = paths[1] || null;
  const productDetails =
    isDetailsPage && productId
      ? await fetch(
          `${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}/${productId}`,
        ).then((res) => res.json())
      : null;
  const skip = (page - 1) * process.env.NEXT_PUBLIC_LIMIT;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PAGE_URL}/search?q=${search.trim()}&skip=${skip}&limit=${process.env.NEXT_PUBLIC_LIMIT}&select=title&select=id&select=images`,
  ).then((res) => res.json());
  return {
    props: {
      response,
      page,
      productDetails,
    },
  };
};

interface MainProps {
  response: DummyResponse;
  page: number;
  productDetails: Product | null;
}

const Main = ({ response, page, productDetails }: MainProps) => {
  const { searchQuery, update } = useSearchQuery();
  const { push, asPath } = useRouter();
  const savedProducts = useSelector((state: RootState) => state.savedProducts);

  const openDetails = (id: number) => {
    push(`${asPath.split('/details')[0]}/details/${id}`);
  };

  return (
    <div data-testid="main-page">
      <Search
        onSearch={(value) => {
          update(value);
          push(`/main/1?search=${encodeURIComponent(value)}`);
        }}
        searchValue={searchQuery}
      />
      {productDetails && <Details product={productDetails} />}
      {response && <List items={response.products} onClick={openDetails} />}
      {!response && <Loader />}
      {response && <Pagination page={page} total={response.total} />}
      {!!savedProducts.length && <SavedItems />}
    </div>
  );
};

Main.getLayout = (page: React.ReactNode) => {
  return <div className="main-layout">{page}</div>;
};

export default Main;
