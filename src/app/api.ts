import { Product } from '../types/types';

export const getProductById = async (id: string | number): Promise<Product> => {
  const item = (
    await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}${id}`)
  ).json();
  return item;
};
