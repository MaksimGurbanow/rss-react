import React from 'react';
import Loader from '../components/common/loader/Loader';
import List from '../components/list/List';
import Search from '../components/search/Search';
import useProducts from '../hooks/useProducts';
import useSearchQuery from '../hooks/useSearchQuery';
import { Outlet, useParams } from 'react-router-dom';
import Switch from '../components/switch/Switch';

const Main = () => {
  const { searchQuery, update } = useSearchQuery();
  const { page } = useParams();
  const numberPage = Number(page);
  const { listData, isLoading, limit, total } = useProducts(
    searchQuery,
    numberPage,
  );

  return (
    <>
      <Search onSearch={(value) => update(value)} queryValue={searchQuery} />
      <List items={listData} />
      {isLoading && <Loader />}
      <Switch limit={limit} page={numberPage} total={total} />
      <Outlet />
    </>
  );
};

export default Main;
