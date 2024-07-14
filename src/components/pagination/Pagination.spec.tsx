import { App } from '../../App';
import { renderWithRouter } from '../../App.spec';
import { mockItem, products } from '../../test/contants';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('../../app/api', () => ({
      getProductById: vi.fn(() => {
        return Promise.resolve(mockItem);
      }),
      searchProducts: vi.fn((skip: number) => {
        return Promise.resolve({
          products: products.slice(0, 10),
          total: 10,
          skip,
          limit: 11,
        });
      }),
    }));
  });

  test('Should change URL upon clicking the buttons', async () => {
    let res = renderWithRouter(<App />, ['/1']);

    let items = await screen.findAllByTestId('item-container');

    let nextButton = await screen.findByTestId('pagination-next');
    act(() => {
      fireEvent.click(nextButton);
    });
    res = renderWithRouter(<App />, ['/2']);

    await waitFor(() => {
      expect(res.history.location.pathname).toBe('/2');
    });
  });
});
