import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import { searchProducts } from '../app/api';

export default (searchQuery: string = '') => {
  const [listData, setListData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchProducts(searchQuery)
      .then((res) => res.products)
      .then((items) => setListData(items))
      .catch(() => {
        throw new Error('Failed to fetch products');
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery]);

  return { listData, setListData, isLoading };
};
