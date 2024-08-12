import { Product } from '../types/types';

const getProductById = async (id: string | number): Promise<Product> => {
  const item = (await fetch(`https://dummyjson.com/products/${id}`)).json();
  return item;
};

export default getProductById;
