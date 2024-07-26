import { server } from '../../test/mockServer';
import { currentPageApi } from './slices/currentPage';
import store from './store';

describe('Should return appropriate data', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
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
});
