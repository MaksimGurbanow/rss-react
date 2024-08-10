import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

const initialState: Product[] = [];

export const savedProductsSlice = createSlice({
  name: 'savedProducts',
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      const newState = [...state];
      for (const newProduct of action.payload) {
        if (!state.some((product) => product.id === newProduct.id)) {
          newState.push(newProduct);
        }
      }
      return newState;
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    unsellectAll: () => [],
  },
});

export const { addProducts, removeProduct, unsellectAll } =
  savedProductsSlice.actions;
