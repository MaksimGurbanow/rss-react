import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as SearchHook from '../hooks/useSearchQuery';
import { App } from 'react-bootstrap-icons';
import { wrappedComponent } from '../index.test';
import Main from '../pages/main/[page]/[[...paths]]';
import { products } from './contants';
import { Product } from '../types/types';
import { Theme, ThemeContext } from '../contexts/ThemeContext';
import StoreProvider from '../app/redux/provider';

describe('Search', () => {
  test('Should render components correctly', async () => {
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
    const input = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');
    const toggle = await screen.findByTestId('toggle-theme');
    const container = await screen.findByTestId('search-container');

    expect(input).toBeDefined();
    expect(button).toBeDefined();
    expect(toggle).toBeDefined();
    expect(container).toBeDefined();
  });

  beforeEach(() => {
    vi.spyOn(SearchHook, 'useSearchQuery');
  });
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('Input should change value if is typed', async () => {
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
    let input = await screen.findByTestId<HTMLInputElement>('search-input');
    await userEvent.type(input, 'new');

    expect(input.value).toBe('new');
  });

  test('Should save to local storage if button is clicked', async () => {
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

    let input = await screen.findByTestId<HTMLInputElement>('search-input');
    const button = await screen.findByTestId('search-button');

    userEvent.type(input, 'example search query');
    act(() => {
      fireEvent.click(button);
    });

    expect(SearchHook.useSearchQuery).toBeCalled();
  });

  test('Button should be disabled until value is changed', async () => {
    vi.clearAllMocks();
    const mockUpdateSearchQuery = vi.fn();
    vi.spyOn(SearchHook, 'useSearchQuery').mockReturnValue({
      searchQuery: '',
      update: mockUpdateSearchQuery,
    });
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

    let input = await screen.findByTestId<HTMLInputElement>('search-input');
    const button = await screen.findByTestId('search-button');

    expect(button).toHaveProperty('disabled', true);
    fireEvent.click(button);
    expect(mockUpdateSearchQuery).not.toBeCalled();

    await userEvent.type(input, 'new');
    expect(button).toHaveProperty('disabled', false);
    fireEvent.click(button);

    expect(mockUpdateSearchQuery).toHaveBeenCalledOnce();
  });

  test('Toggle should change the theme', async () => {
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
    const toggle = await screen.findByTestId('toggle-theme');
    const themeWrapper = await screen.findByTestId('theme-wrapper');
    const { className } = themeWrapper;

    fireEvent.click(toggle);

    expect(className).not.toBe(themeWrapper.className);
  });

  test('Toggle should be toggled if the theme is dark', async () => {
    const mockValue = {
      theme: 'dark' as Theme,
      toggleTheme: vi.fn(),
    };
    render(
      <ThemeContext.Provider value={mockValue}>
        <StoreProvider>
          <Main
            page={1}
            response={{
              products: products as Product[],
              limit: 10,
              total: 10,
              skip: 0,
            }}
          />
        </StoreProvider>
      </ThemeContext.Provider>,
    );
    const toggle = await screen.findByTestId('toggle-theme');

    expect(
      toggle.querySelector('.toggle-circle')?.classList.contains('toggled'),
    ).toBeTruthy();
  });
});
