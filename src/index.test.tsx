import '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './pages/_app';
import { act, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Main from './pages/main/[page]/[[...paths]]';
import NotFound from './pages/404';
import { server } from './__tests__/mockServer';

export const wrappedComponent = (
  ui: ReactNode,
  routes: string[] = [],
  pageProps: object = {},
) => {
  return render(
    <MemoryRouter initialEntries={routes}>
      <App Component={() => ui} pageProps={{ props: pageProps }} />
    </MemoryRouter>,
  );
};

describe('Should open expected component upon changing the url path', () => {
  beforeAll(() => {
    server.listen();
  });
  test('Should render Main component', async () => {
    wrappedComponent(<Main />, ['/main/1']);
    const mainPage = await screen.findByTestId('main-page');
    expect(mainPage).toBeDefined();
  });

  test('Should render NotFound component', async () => {
    wrappedComponent(<NotFound />, ['/non-existing-page']);
    const notFoundPage = await screen.findByTestId('not-found-page');
    expect(notFoundPage).toBeDefined();
  });
});

describe('Theme component should work correctly', () => {
  test('Should have a theme wrapper', async () => {
    wrappedComponent(<Main />, ['/main/1']);
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
