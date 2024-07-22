import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from '../api';

const store = configureStore({
  reducer: {
    [dummyApi.reducerPath]: dummyApi.reducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(dummyApi.middleware),
});

export default store;
