import { Product } from '../types/types';

const getProductById = async (id: string | number): Promise<Product> => {
  const item = (
    await fetch(`${process.env.REMIX_API_PRODUCTS_URL}${id}`)
  ).json();
  return item;
};

export default getProductById;
