import { DummyResponse } from '../types/types';

export const searchProducts = async (
  query: string,
  page: number,
  total: number,
): Promise<DummyResponse> => {
  const skip = (page - 1) * total;
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${query.trim()}&skip=${skip}&total=${total}`,
  );
  const items = await res.json();
  return items;
};
