import { DummyResponse } from '../types/types';

const getProducts = async ({
  query,
  page,
  limit = 10,
}: {
  query: string;
  page: number;
  limit?: number;
}): Promise<DummyResponse & { page: number }> => {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `${process.env.REMIX_API_PAGE_URL}/search?q=${query.trim() || ''}&skip=${skip}&limit=${limit}&select=title&select=id&select=images`,
  );

  return await response.json().then((res) => ({ ...res, page }));
};

export default getProducts;
