import { screen, waitFor } from '@testing-library/dom';
import { wrappedComponent } from './index.test';
import { products } from './contants';
import List from '../components/list/List';
import RemixStub from './remixMockRouter';
import { createRemixStub } from '@remix-run/testing';
import Main from '../app/routes/main.$page/route';
import getProducts from '../api/getProducts';

describe('List', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });
  test('Should display specified number of products', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    await waitFor(async () => {
      const listItem = await screen.findAllByTestId('item-container');
      listItem.every((item) => expect(item).toBeDefined());
    });
  });
  test('Should display message if tehre is no items to render', async () => {
    const CustomRemixStub = createRemixStub([
      {
        path: '/main/1',
        Component: Main,
        loader: () => ({
          page: 1,
          res: { products: [], total: 10, limit: 10, skip: 0 },
        }),
      },
    ]);
    wrappedComponent(<CustomRemixStub initialEntries={['/main/1']} />);

    await waitFor(async () => {
      const errorMessage = await screen.findByTestId('no-items-container');
      expect(errorMessage).toBeDefined();
    });
  });

  test('Should have container', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    expect(await screen.findByTestId('list-container')).toBeDefined();
  });
});
