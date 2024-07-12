import React, { useState } from 'react';
import Loader from '../components/common/loader/Loader';
import List from '../components/list/List';
import Search from '../components/search/Search';
import useProducts from '../hooks/useProducts';
import useSearchQuery from '../hooks/useSearchQuery';
import Button from '../components/ui/button/Button';
import { useParams } from 'react-router-dom';

const Main = () => {
  const { searchQuery, update } = useSearchQuery();
  const { page } = useParams();
  const { listData, isLoading } = useProducts(searchQuery, page);

  const [loaded, setLoaded] = useState(true);

  return (
    <>
      <Search onSearch={(value) => update(value)} queryValue={searchQuery} />
      {loaded && <List items={listData} />}
      <Button onClick={() => setLoaded(false)}>Clock</Button>
      {isLoading && <Loader />}

      <div className="switch-pages-container">
        <Button className="switch-page__button">Previous</Button>
        <Button className="switch-page__button">Next</Button>
      </div>
    </>
  );
};

export default Main;
