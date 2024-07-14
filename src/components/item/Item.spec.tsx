import { fireEvent, screen } from '@testing-library/react';
import { App } from '../../App';
import { getProductById } from '../../app/api';
import Item from './Item';
import capitalize from '../../utils/capitalize';
import { renderWithRouter } from '../../App.spec';
import { mockItem } from '../../test/contants';
import { act } from 'react';

describe('Item', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.mock('../../app/api', () => ({
      searchProducts: vi.fn(() => {
        return Promise.resolve({
          products: [mockItem],
          total: 1,
          skip: 0,
          limit: 1,
        });
      }),
      getProductById: vi.fn(() => {
        return Promise.resolve(mockItem);
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Should render image and title (title is capitalized)', async () => {
    renderWithRouter(
      <Item title={mockItem.title} id={mockItem.id} images={mockItem.images} />,
      ['/1'],
    );
    const title = await screen.findByTestId('item-name');
    expect(title.innerText).toBe(capitalize(mockItem.title));

    const image = await screen.findByTestId<HTMLImageElement>('item-image');
    expect(image.src).toBe(mockItem.images[0]);
  });

  test('Should open details page if clicked', async () => {
    renderWithRouter(<App />, ['/1']);

    const item = await screen.findByTestId('item-container');
    fireEvent.click(item);

    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });

  test('Should triiger API call if click', async () => {
    renderWithRouter(<App />, ['/1']);

    const item = await screen.findByTestId('item-container');

    await act(async () => {
      fireEvent.click(item);
    });

    expect(getProductById).toBeCalledTimes(1);
  });
});
