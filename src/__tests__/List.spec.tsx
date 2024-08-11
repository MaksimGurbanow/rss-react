import { screen, waitFor } from '@testing-library/dom';
import { wrappedComponent } from './index.test';
import { products } from './contants';
import List from '../components/list/List';

describe('List', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });
  test('Should display specified number of products', async () => {
    wrappedComponent(<List items={products} detailsPath="/main/1/details/" />);
    await waitFor(async () => {
      const listItem = await screen.findAllByTestId('item-container');
      listItem.every((item) => expect(item).toBeDefined());
    });
  });
  test('Should display message if tehre is no items to render', async () => {
    wrappedComponent(<List items={[]} detailsPath="/main/1/details/" />);
    await waitFor(async () => {
      const errorMessage = await screen.findByTestId('no-items-container');
      expect(errorMessage).toBeDefined();
    });
  });

  test('Should have container', async () => {
    wrappedComponent(<List items={[]} detailsPath="/main/1/details/" />);
    expect(await screen.findByTestId('list-container')).toBeDefined();
  });
});
