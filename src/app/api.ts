import { DummyResponse } from '../types/types';

export const searchProducts = async (query: string): Promise<DummyResponse> => {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${query.trim()}`,
  );
  const items = await res.json();
  return items;
};
