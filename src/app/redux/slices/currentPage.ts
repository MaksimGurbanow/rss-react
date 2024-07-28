import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DummyResponse } from '../../../types/types';
import { GetProductsPageQueryParams } from '../types';

export const currentPageApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_PAGE_URL }),
  endpoints: (builder) => ({
    getProductsPage: builder.query<DummyResponse, GetProductsPageQueryParams>({
      query: ({ query, page, limit }) => {
        const skip = (page - 1) * limit;
        return {
          url: `/search?q=${query.trim()}&skip=${skip}&limit=${limit}&select=title&select=id&select=images`,
        };
      },
    }),
  }),
});

export const { useGetProductsPageQuery } = currentPageApi;
