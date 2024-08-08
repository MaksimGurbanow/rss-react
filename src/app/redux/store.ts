import { configureStore } from '@reduxjs/toolkit';
import { savedProductsSlice } from './slices/savedProducts';
import { currentPageApi } from './slices/currentPage';
import { productDetailsApi } from './slices/productDetails';

const store = configureStore({
  reducer: {
    [currentPageApi.reducerPath]: currentPageApi.reducer,
    [productDetailsApi.reducerPath]: productDetailsApi.reducer,
    savedProducts: savedProductsSlice.reducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(currentPageApi.middleware)
      .concat(productDetailsApi.middleware),
});

export const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [currentPageApi.reducerPath]: currentPageApi.reducer,
      [productDetailsApi.reducerPath]: productDetailsApi.reducer,
      savedProducts: savedProductsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(currentPageApi.middleware)
        .concat(productDetailsApi.middleware),
    preloadedState,
  });
};

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type CreateRootState = ReturnType<
  ReturnType<typeof createStore>['getState']
>;
