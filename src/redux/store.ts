import { configureStore } from '@reduxjs/toolkit';
import { savedProductsSlice } from './slices/savedProducts';

const store = configureStore({
  reducer: {
    savedProducts: savedProductsSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
