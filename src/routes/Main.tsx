import React, { useState } from 'react';
import ErrorBoundary from '../components/common/error-boundary/ErrorBoundary';
import Loader from '../components/common/loader/Loader';
import List from '../components/list/List';
import Search from '../components/search/Search';
import store from '../store/Store';
import useProducts from '../hooks/useProducts';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState(store.query);
  const { listData, isLoading } = useProducts(store.query);

  const handleSearchSubmit = () => {
    store.query = searchQuery;
  };

  return (
    <>
      <ErrorBoundary
        fallback={() => <h4>Is seems that search container is not created</h4>}
      >
        <Search
          onChange={(value: string) => setSearchQuery(value)}
          onSearch={handleSearchSubmit}
          value={searchQuery}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <List items={listData} />
      </ErrorBoundary>
      <ErrorBoundary>{isLoading && <Loader />}</ErrorBoundary>
    </>
  );
};

export default Main;
