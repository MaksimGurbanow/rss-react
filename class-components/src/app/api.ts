import { DummyResponse } from '../types/types';

export const queryItems = async (query: string) => {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${query.trim()}`,
  );
  const items = await res.json();
  return items as DummyResponse;
};
