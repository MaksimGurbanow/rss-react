import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/types';

const initialState: Product[] = [];

export const savedProductsSlice = createSlice({
  name: 'savedProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      if (state.some((product) => product.id === action.payload.id)) {
        return [...state];
      }
      return [...state, action.payload];
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    unsellectAll: () => [],
  },
});

export const { addProduct, removeProduct, unsellectAll } =
  savedProductsSlice.actions;
