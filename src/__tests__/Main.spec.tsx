import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { App } from 'react-bootstrap-icons';
import { wrappedComponent } from '../index.test';
import { server } from './mockServer';
import Main, { getServerSideProps } from '../pages/main/[page]/[[...paths]]';
import { mockItem, products } from './contants';
import { DummyResponse, Product } from '../types/types';

describe('Check the main page content', () => {
  beforeAll(() => {
    server.listen();
    window.URL.createObjectURL = vi.fn();
  });
  beforeEach(() => {
    server.resetHandlers();
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  afterAll(() => {
    server.close();
  });
  test('Should have a search component', async () => {
    wrappedComponent(<Main />, ['/1']);
    await waitFor(
      async () => {
        const searchContainer = await screen.findByTestId('search-container');
        expect(searchContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
  test('Should have a List component', async () => {
    wrappedComponent(
      <Main
        page={1}
        response={{
          products: products as Product[],
          limit: 10,
          total: 10,
          skip: 0,
        }}
      />,
      ['/main/1'],
    );
    await waitFor(
      async () => {
        const listContainer = await screen.findByTestId('list-container');
        expect(listContainer).toBeDefined();
      },
      { timeout: 5000 },
    );
  });
  test("Shouldn't have a List component if response is empty", async () => {
    wrappedComponent(
      <Main
        page={1}
        response={{
          products: [],
          limit: 10,
          total: 10,
          skip: 0,
        }}
      />,
      ['/main/1'],
    );
    await waitFor(
      async () => {
        const listContainer = screen.queryByTestId('list-container');
        expect(listContainer).toBeNull();
      },
      { timeout: 5000 },
    );
  });
  test('Should have a Pagination component', async () => {
    wrappedComponent(
      <Main
        page={1}
        response={{
          products: products as Product[],
          limit: 10,
          total: 10,
          skip: 0,
        }}
      />,
      ['/main/1'],
    );
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
    wrappedComponent(
      <Main
        page={1}
        response={{
          products: products as Product[],
          limit: 10,
          total: 10,
          skip: 0,
        }}
        productDetails={mockItem as Product}
        productId="1"
      />,
      ['/main/1'],
    );

    expect(await screen.findByTestId('details-page')).toBeDefined();
  });
  test("Shouldn't have details component if they are not provided", () => {
    wrappedComponent(
      <Main
        page={1}
        response={{
          products: products as Product[],
          limit: 10,
          total: 10,
          skip: 0,
        }}
      />,
      ['/main/1'],
    );
    expect(screen.queryByTestId('details-page')).toBeNull();
  });
  test('Should have a saved products block if there are saved items', async () => {
    wrappedComponent(
      <Main
        page={1}
        response={{
          products: products as Product[],
          limit: 10,
          total: 10,
          skip: 0,
        }}
      />,
      ['/main/1'],
    );
    const button = await screen.findByTestId('save-button-1');
    fireEvent.click(button);
    const savedItemsBlock = await screen.findByTestId('saved-products');
    expect(savedItemsBlock).toBeDefined();
  });
});

describe('GetServerSideProps', () => {
  test('Should fetch products', async () => {
    const context = {
      query: {
        page: 1,
        search: 'test',
      },
    };

    global.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({ total: 10, limit: 10, skip: 0, products }),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              products: [],
              total: 0,
              limit: 10,
              skip: 0,
            }),
        }),
      );
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({
      props: {
        response: { products, total: 10, limit: 10, skip: 0 } as DummyResponse,
        page: 1,
        productDetails: null,
        productId: null,
      },
    });
  });
});
