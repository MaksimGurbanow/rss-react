import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../../types/types';
import { GetProductByIdQueryParams } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductById = createAsyncThunk(
  'detailsApi/getProductById',
  (productId: string) => {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}/${productId}`,
    ).then((res) => res.json());
    return res;
  },
);

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
