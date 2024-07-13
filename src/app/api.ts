import { DummyResponse, Product } from '../types/types';

export const searchProducts = async (
  query: string,
  page: number,
  limit: number,
): Promise<DummyResponse> => {
  const skip = (page - 1) * limit;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/search?q=${query.trim()}&skip=${skip}&limit=${limit}&select=title&select=id&select=images`,
  );
  const items = await res.json();
  return items;
};

export const getProductById = async (
  productId?: string | number,
): Promise<Product> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${productId}`);
  return await res.json();
};
