import { screen, waitFor } from '@testing-library/dom';
import { wrappedComponent, routedComponent } from './index.test';
import { server } from './mockServer';
import Main from '../app/main/[page]/[[...paths]]/page';

describe('Check the main page content', () => {
  beforeAll(() => {
    server.listen();
    window.URL.createObjectURL = vi.fn();
  });
  afterEach(() => {
    server.resetHandlers();
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  afterAll(() => {
    server.close();
  });
  test('Should have a search component', async () => {
    wrappedComponent(await Main({ params: { page: '1' } }));
    await waitFor(
      async () => {
        const searchContainer = await screen.findByTestId('search-container');
        expect(searchContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
  test('Should have a List component', async () => {
    wrappedComponent(await Main({ params: { page: '1' } }));

    await waitFor(
      async () => {
        const listContainer = await screen.findByTestId('list-container');
        expect(listContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });

  test('Should have a Pagination component', async () => {
    wrappedComponent(await Main({ params: { page: '1' } }));

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
  test('Should have details component if details are provided', async () => {
    routedComponent('/main/1/details/1');
    expect(await screen.findByTestId('details-page')).toBeDefined();
  });
  test("Shouldn't have details component if they are not provided", async () => {
    wrappedComponent(await Main({ params: { page: '1' } }));

    expect(screen.queryByTestId('details-page')).toBeNull();
  });
});
