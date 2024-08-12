import '@testing-library/dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act, ReactNode } from 'react';
import mockRouter from 'next-router-mock';
import StoreProvider from '../redux/provider';
import { ThemeProvider } from '../contexts/ThemeContext';
import { server } from './mockServer';
import RemixStub from './remixMockRouter';

export const wrappedComponent = (ui: ReactNode) => {
  return render(
    <ThemeProvider>
      <StoreProvider>{ui}</StoreProvider>
    </ThemeProvider>,
  );
};

describe('Should open expected component upon changing the url path', () => {
  test('Should render Home page', async () => {
    wrappedComponent(<RemixStub initialEntries={['/']} />);
    await waitFor(() => screen.findByTestId('home-header'));
    await act(async () => {
      fireEvent.click(await screen.findByTestId('link-to-main'));
    });
    await screen.findByTestId('main-page-1');
  });

  test('Should render 404 page', async () => {
    wrappedComponent(<RemixStub initialEntries={['/not-found']} />);
    await waitFor(() => screen.findByTestId('not-found-page'));
  });
});

describe('Details page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('Should render details page for /main/:page/details/:id path', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1/details/1']} />);
    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });

  test('Shoud open details upon clicking one of the items', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);

    const items = await screen.findAllByTestId('item-container');
    await act(async () => {
      fireEvent.click(items[0]);
      await mockRouter.push('/main/1/details/1');
    });
    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });
});

describe('Theme component should work correctly', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  test('Should have a theme wrapper', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);

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
