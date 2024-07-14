import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { App } from '../../App';
import { vi } from 'vitest';
import Details from './Details';
import capitalize from '../../utils/capitalize';
import { renderWithRouter } from '../../App.spec';
import { mockItem } from '../../test/contants';

describe('Details', () => {
  beforeEach(() => {
    vi.mock('../../app/api', () => ({
      getProductById: vi.fn(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockItem);
          }, 1000);
        });
      }),
      searchProducts: vi.fn(() => {
        return Promise.resolve({
          products: [mockItem],
          total: 1,
          skip: 0,
          limit: 1,
        });
      }),
    }));
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test('Should render Loading indicator while data is not fetched yet', async () => {
    act(() => {
      renderWithRouter(<App />, ['/1/details/1']);
    });

    const loader = await screen.findByTestId('loader-container');
    expect(loader).toBeDefined();

    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });

  describe('Component should be rendered properly and closed upon closing', () => {
    beforeEach(async () => {
      vi.mock('react-router-dom', () => ({
        useParams: vi.fn(() => ({
          productId: '1',
        })),
      }));
      renderWithRouter(<Details />, ['/1']);
      const openButton = await screen.findByTestId('open-details-button');
      act(() => {
        fireEvent.click(openButton);
      });
      vi.clearAllTimers();
    });
    afterEach(() => {
      vi.unmock('react-router-dom');
    });

    test('Should render appropriate data', async () => {
      await waitFor(
        async () => {
          const itemName = await screen.findByTestId('item-details-name');
          const itemImage =
            await screen.findByTestId<HTMLInputElement>('item-details-image');

          expect(itemName.innerText).toBe(capitalize(mockItem.title));
          expect(itemImage.src).toBe(mockItem.images[0]);
        },
        { timeout: 5000 },
      );
    });

    test('Should close component upon clicking Close button', async () => {
      const closeButton = await screen.findByTestId('details-close-button');
      act(() => {
        fireEvent.click(closeButton);
      });
      const itemName = screen.queryByTestId('item-details-name');
      const itemImage = screen.queryByTestId('item-details-image');
      const detailsContainer = await screen.findByTestId('details-page');

      expect(itemName).toBeNull();
      expect(itemImage).toBeNull();
      expect(detailsContainer.classList).toContain('details-page__disabled');
    });
  });
});
