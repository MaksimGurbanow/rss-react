import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import { searchProducts } from '../app/api';

export default (searchQuery: string = '', page: number | string = 0) => {
  const [listData, setListData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    setIsLoading(true);

    if (isNaN(page as number)) throw new Error('Page parameter is not valid');
    searchProducts(searchQuery, page as number, limit)
      .then((res) => {
        setTotal(res.total);
        return res.products;
      })
      .then((items) => setListData(items))
      .catch(() => {
        throw new Error('Failed to fetch products');
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, page]);

  return { listData, setListData, isLoading, total, limit };
};
