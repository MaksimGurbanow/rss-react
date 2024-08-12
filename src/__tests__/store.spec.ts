import getProductById from '../api/getProductById';
import { addProducts, removeProduct } from '../redux/slices/savedProducts';
import store from '../redux/store';
import { Product } from '../types/types';
import { mockItem } from './contants';

describe('Save products', async () => {
  test('Should save products', async () => {
    const data = await getProductById(1);
    store.dispatch(addProducts([data] as Product[]));

    expect(store.getState().savedProducts[0]).toBeDefined();
  });

  test('Should delete product', async () => {
    store.dispatch(addProducts([mockItem] as Product[]));
    store.dispatch(removeProduct(1));
    expect(store.getState().savedProducts[0]).toBeUndefined();
  });
});
