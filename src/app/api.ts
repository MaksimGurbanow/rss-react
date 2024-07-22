import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DummyResponse, Product } from '../types/types';
import {
  GetProductByIdQueryParams,
  GetProductsPageQueryParams,
} from './redux/types';

export const searchProducts = async (
  query: string,
  page: number,
  limit: number,
): Promise<DummyResponse> => {
  const skip = (page - 1) * limit;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/search?q=${query.trim()}&skip=${skip}&limit=${limit}&select=title&select=id&select=images&total=11`,
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

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getProductsPage: builder.query<DummyResponse, GetProductsPageQueryParams>({
      query: ({ query, page, limit }) => {
        const skip = (page - 1) * limit;
        return {
          url: `/search?q=${query.trim()}&skip=${skip}&limit=${limit}&select=title&select=id&select=images&total=11`,
        };
      },
    }),
    getProductById: builder.query<Product, GetProductByIdQueryParams>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsPageQuery, useGetProductByIdQuery } = dummyApi;
