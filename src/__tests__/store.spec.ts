import { currentPageApi } from '../app/redux/slices/currentPage';
import { productDetailsApi } from '../app/redux/slices/productDetails';
import { addProduct, removeProduct } from '../app/redux/slices/savedProducts';
import store from '../app/redux/store';
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
    store.dispatch(addProduct(data as Product));

    expect(store.getState().savedProducts[0]).toBeDefined();
  });

  test('Should delete product', async () => {
    store.dispatch(addProduct(mockItem as Product));
    store.dispatch(removeProduct(1));
    expect(store.getState().savedProducts[0]).toBeUndefined();
  });
});
