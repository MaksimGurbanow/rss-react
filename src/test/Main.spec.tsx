/* import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { wrappedComponent } from '../../../App.spec';
import { App } from '../../../App';
import { act } from '@testing-library/react';
import { server } from '../../../test/mockServer';

describe('Check the main page content', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
    vi.clearAllTimers();
    vi.clearAllMocks();
    act(() => {
      wrappedComponent(<App />, ['/1']);
    });
  });
  afterAll(() => {
    server.close();
  });
  test('Should have a search component', async () => {
    await waitFor(
      async () => {
        const searchContainer = await screen.findByTestId('search-container');
        expect(searchContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
  test('Should have a List component', async () => {
    await waitFor(
      async () => {
        const listContainer = await screen.findByTestId('list-container');
        expect(listContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
  test('Should have a Pagination component', async () => {
    await waitFor(
      async () => {
        const prevButton = await screen.findByTestId('pagination-previous');
        const nextButton = await screen.findByTestId('pagination-next');
        expect(prevButton).toBeDefined();
        expect(nextButton).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
  test('Should have a saved products block if there are saved items', async () => {
    const button = await screen.findByTestId('save-button-1');
    act(() => {
      fireEvent.click(button);
    });
    const savedItemsBlock = await screen.findByTestId('saved-products');
    expect(savedItemsBlock).toBeDefined();
  });
});
 */