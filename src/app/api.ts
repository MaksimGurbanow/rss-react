import { DummyResponse } from '../types/types';

export const searchProducts = async (
  query: string,
  page: number,
  limit: number,
): Promise<DummyResponse> => {
  const skip = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${query.trim()}&skip=${skip}&limit=${limit}`,
  );
  const items = await res.json();
  return items;
};
