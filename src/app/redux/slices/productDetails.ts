import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../../types/types';
import { GetProductByIdQueryParams } from '../types';

export const productDetailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_PRODUCTS_URL,
  }),
  endpoints: (builder) => ({
    getProductById: builder.query<Product, GetProductByIdQueryParams>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetProductByIdQuery } = productDetailsApi;
