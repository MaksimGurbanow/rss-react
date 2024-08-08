import { App } from '../../App';
import { wrappedComponent } from '../../App.spec';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { server } from '../../test/mockServer';

describe('Pagination', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeEach(() => {
    vi.clearAllMocks();
    server.resetHandlers();
  });

  test('Should change URL upon clicking the buttons', async () => {
    let res = wrappedComponent(<App />, ['/1']);

    await screen.findAllByTestId('item-container');

    let nextButton = await screen.findByTestId('pagination-next');
    act(() => {
      fireEvent.click(nextButton);
    });
    res = wrappedComponent(<App />, ['/2']);

    await waitFor(() => {
      expect(res.history.location.pathname).toBe('/2');
    });
  });
});
