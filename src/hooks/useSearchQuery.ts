import { useEffect, useState } from 'react';
import store from '../store/Store';

export default () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery(store.query);
  }, []);

  const update = (value: string) => {
    setSearchQuery(value);
    store.query = value;
  };

  return { searchQuery, update };
};
