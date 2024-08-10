import { DummyResponse } from '../types/types';

const getProducts = async ({
  query,
  skip = 0,
  limit = 10,
}: {
  query: string;
  skip?: number;
  limit?: number;
}): Promise<DummyResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PAGE_URL}/search?q=${query.trim() || ''}&skip=${skip}&limit=${limit}&select=title&select=id&select=images`,
  );
  return await response.json();
};

export default getProducts;
