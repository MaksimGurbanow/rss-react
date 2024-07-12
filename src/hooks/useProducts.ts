import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import { searchProducts } from '../app/api';

export default (
  searchQuery: string = '',
  page: number | string = 0,
  total: number = 30,
) => {
  const [listData, setListData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchProducts(searchQuery, page as number, total)
      .then((res) => res.products)
      .then((items) => setListData(items))
      .catch(() => {
        throw new Error('Failed to fetch products');
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, page]);

  return { listData, setListData, isLoading };
};
