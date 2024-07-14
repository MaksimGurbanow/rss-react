import { screen, waitFor } from '@testing-library/dom';
import { renderWithRouter } from '../../App.spec';
import { App } from '../../App';
import { act } from '@testing-library/react';

describe('Check the main page content', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    act(() => {
      renderWithRouter(<App />, ['/1']);
    });
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
        const paginationContainer = await screen.findByTestId(
          'pagination-container',
        );
        expect(paginationContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
});
