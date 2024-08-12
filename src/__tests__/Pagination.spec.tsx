import { wrappedComponent } from './index.test';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import RemixStub from './remixMockRouter';
import { useLocation } from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import Main from '../app/routes/main.$page/route';
import { act } from '@testing-library/react';

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test('Should render', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    const nextButton = await screen.findByTestId('pagination-next');
    const previousButton = await screen.findByTestId('pagination-previous');

    expect(nextButton).toBeDefined();
    expect(previousButton).toBeDefined();
  });

  test('Previous button should be disabled if it is the first page', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    const previousButton = await screen.findByTestId('pagination-previous');

    expect(previousButton.classList.contains('disabled')).toBeTruthy();
  });

  test('Next button should be disabled', async () => {
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
    const nextButton = await screen.findByTestId('pagination-next');

    expect(nextButton.classList.contains('disabled')).toBeTruthy();
  });

  test('Should switch to next', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    const next = await screen.findByTestId('pagination-next');

    await act(async () => {
      fireEvent.click(next);
    });
    expect(await screen.findByTestId('main-page-2')).toBeDefined();
  });
});
