import '@testing-library/dom';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import  { App } from './App';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { ThemeProvider } from './contexts/ThemeContext';
import { act } from 'react';

export const wrappedComponent = (
  ui: React.ReactNode,
  route: string[],
): RenderResult & { history: MemoryHistory } => {
  const history = createMemoryHistory({ initialEntries: route });

  const rendered = render(
    <MemoryRouter initialEntries={route} initialIndex={0}>
      <Provider store={store}>{ui}</Provider>
    </MemoryRouter>,
  );

  return {
    ...rendered,
    history,
  };
};

describe('Should open expected component upon changing the url path', () => {
  test('Should render Main component for / route', async () => {
    wrappedComponent(<App />, ['/1']);
    const mainPage = await screen.findByTestId('main-page');
    expect(mainPage).toBeDefined();
  });

  test('Should render Details component for /:page/details:productId? route', async () => {
    wrappedComponent(<App />, ['/1/details/1']);
    const detailsPage = await screen.findByTestId('details-page');
    expect(detailsPage).toBeDefined();
  });

  test('Should render NotFound page for non existing royte', async () => {
    wrappedComponent(<App />, ['/non-existing-page']);
    const notFoundPage = await screen.findByTestId('not-found-page');
    expect(notFoundPage).toBeDefined();
  });
});

describe('Theme component should work correctly', () => {
  test('Should have a theme wrapper', async () => {
    wrappedComponent(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
      ['/1'],
    );
    const themeWrapper = await screen.findByTestId('theme-wrapper');
    expect(themeWrapper).toBeDefined();
    expect(themeWrapper).toHaveProperty(
      'className',
      'theme-wrapper light-theme',
    );
    const toggleTheme = await screen.findByTestId('toggle-theme');
    act(() => {
      fireEvent.click(toggleTheme);
    });
    expect(themeWrapper).toHaveProperty(
      'className',
      'theme-wrapper dark-theme',
    );
  });
});
