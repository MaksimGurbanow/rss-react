import { fireEvent, screen } from '@testing-library/react';
import { App } from '../../App';
import Item from './Item';
import capitalize from '../../utils/capitalize';
import { wrappedComponent } from '../../App.spec';
import { mockItem } from '../../test/contants';
import { act } from 'react';
import { server } from '../../test/mockServer';
import { productDetailsApi } from '../../app/redux/slices/productDetails';

describe('Item', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    server.resetHandlers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  test('Should render image and title (title is capitalized)', async () => {
    wrappedComponent(
      <Item title={mockItem.title} id={mockItem.id} images={mockItem.images} />,
      ['/1'],
    );
    const title = await screen.findByTestId('item-name');
    expect(title.innerText).toBe(capitalize(mockItem.title));

    const image = await screen.findByTestId<HTMLImageElement>('item-image');
    expect(image.src).toBe(mockItem.images[0]);
  });

  test('Should open details page if clicked', async () => {
    wrappedComponent(<App />, ['/1']);

    const item = await screen.findAllByTestId('item-container');
    fireEvent.click(item[0]);

    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });

  test('Should triiger API call if click', async () => {
    const detailsPageSpy = vi.spyOn(
      productDetailsApi.endpoints.getProductById,
      'initiate',
    );
    wrappedComponent(<App />, ['/1']);

    const item = await screen.findAllByTestId('item-container');

    await act(async () => {
      fireEvent.click(item[0]);
    });

    expect(detailsPageSpy).toBeCalledTimes(1);
  });
});
