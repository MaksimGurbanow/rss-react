import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { server } from './mockServer';
import { routedComponent, wrappedComponent } from './index.test';
import { mockItem } from './contants';
import capitalize from '../utils/capitalize';
import Details from '../app/routes/main.$page.details.($id)/route';

describe('Details', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  afterAll(() => {
    server.close();
  });

  test('Should render while data is not fetched yet', async () => {
    routedComponent('/main/1/details/1');
    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });

  test('Should contain close button', async () => {
    routedComponent('/main/1/details/1');
    const button = await screen.findByTestId('details-close-button');
    expect(button).toBeDefined();
  });

  test('Should contain open button if details are closed', async () => {
    wrappedComponent(<Details product={mockItem} productId="1" />);
    expect(await screen.findByTestId('open-details-button')).toBeDefined();
  });

  test('Should render appropriate data', async () => {
    wrappedComponent(<Details product={mockItem} productId="1" />);
    await waitFor(
      async () => {
        const itemName = await screen.findByTestId('item-details-name');
        const itemImage =
          await screen.findByTestId<HTMLInputElement>('item-details-image');
        const descriptionBlock = await screen.findByTestId('description-block');

        expect(itemName.innerHTML).toBe(capitalize(mockItem.title));
        expect(itemImage.src).toBe(mockItem.images[0]);
        expect(descriptionBlock.innerHTML).toBe(
          '<h5>Description</h5><div>example</div>',
        );
      },
      { timeout: 5000 },
    );
  });
});
