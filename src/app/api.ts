import { DummyResponse, Product } from '../types/types';
import constants from './constants';

export const searchProducts = async (
  query: string,
  page: number,
  limit: number,
): Promise<DummyResponse> => {
  const skip = (page - 1) * limit;
  const res = await fetch(
    `${constants.apiURL}/search?q=${query.trim()}&skip=${skip}&limit=${limit}&select=title&select=id&select=thumbnail`,
  );
  const items = await res.json();
  return items;
};

export const getProductById = async (
  productId?: string | number,
): Promise<Product> => {
  const res = await fetch(`${constants.apiURL}/${productId}`);
  return await res.json();
};
