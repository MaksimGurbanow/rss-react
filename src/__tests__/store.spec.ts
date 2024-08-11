import { currentPageApi } from '../redux/slices/currentPage';
import { productDetailsApi } from '../redux/slices/productDetails';
import { addProducts, removeProduct } from '../redux/slices/savedProducts';
import store from '../redux/store';
import { Product } from '../types/types';
import { mockItem } from './contants';

describe('Should return appropriate data', () => {
  test('Should return product items', async () => {
    const { data } = await store.dispatch(
      currentPageApi.endpoints.getProductsPage.initiate({
        limit: 10,
        page: 1,
        query: '',
      }),
    );
    expect(data).toBeDefined();
  });

  test('Should return product details', async () => {
    const { data } = await store.dispatch(
      productDetailsApi.endpoints.getProductById.initiate({
        id: 1,
      }),
    );
    expect(data).toBeDefined();
  });
});

describe('Save products', async () => {
  test('Should save products', async () => {
    const { data } = await store.dispatch(
      productDetailsApi.endpoints.getProductById.initiate({
        id: 1,
      }),
    );
    store.dispatch(addProducts([data] as Product[]));

    expect(store.getState().savedProducts[0]).toBeDefined();
  });

  test('Should delete product', async () => {
    store.dispatch(addProducts([mockItem] as Product[]));
    store.dispatch(removeProduct(1));
    expect(store.getState().savedProducts[0]).toBeUndefined();
  });
});
