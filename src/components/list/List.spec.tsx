import { screen, waitFor } from '@testing-library/dom';
import { renderWithRouter } from '../../App.spec';
import { products } from '../../test/contants';
import List from './List';

describe('List', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });
  test('Should display specified number of products', async () => {
    renderWithRouter(<List items={products} />, ['/']);
    await waitFor(async () => {
      const listItem = await screen.findAllByTestId('item-container');
      listItem.every((item) => expect(item).toBeDefined());
    });
  });
  test('Should display message if tehre is no items to render', async () => {
    renderWithRouter(<List items={[]} />, ['/']);
    await waitFor(async () => {
      const errorMessage = await screen.findByTestId('no-items-container');
      expect(errorMessage).toBeDefined();
    });
  });
});
