import '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act, ReactNode, useEffect, useState } from 'react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';
import mockRouter from 'next-router-mock';
import StoreProvider from '../redux/provider';
import DefinedComponent from './utils/defineComponent';
import { ThemeProvider } from '../contexts/ThemeContext';

const MockRouter = ({ path }: { path: string }) => {
  const [component, setComponent] = useState<ReactNode | null>(null);

  const fetchComponent = async (path: string) => {
    setComponent(await DefinedComponent(path));
  };
  useEffect(() => {
    fetchComponent(path);
  }, [path]);

  return (
    <MemoryRouterProvider
      onPush={(newPath) => {
        console.log('pushed');
        fetchComponent(newPath);
      }}
    >
      {component}
    </MemoryRouterProvider>
  );
};

export const routedComponent = (path: string) => {
  return wrappedComponent(<MockRouter path={path} />);
};

export const wrappedComponent = (ui: ReactNode) => {
  return render(
    <ThemeProvider>
      <StoreProvider>{ui}</StoreProvider>
    </ThemeProvider>,
  );
};

describe('Should open expected component upon changing the url path', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should render Main component', async () => {
    routedComponent('/main/1');
    const mainPage = await screen.findByTestId('main-page');
    expect(mainPage).toBeDefined();
    await screen.findByTestId('main-page');
  });

  test('Should render NotFound component upon moving to non existing path', async () => {
    routedComponent('/main/1');
    await act(async () => {
      await mockRouter.push('/not');
    });
    const notFoundPage = await screen.findByTestId('not-found-page');
    expect(notFoundPage).toBeDefined();
  });
});

describe('Details page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('Should render details page for /main/:page/details/:id path', async () => {
    routedComponent('/main/1/details/1');
    const details = await screen.findByTestId('details-page');
    expect(details).toBeDefined();
  });

  test('Shoud open details upon clicking one of the items', async () => {
    routedComponent('/main/1');
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
  test('Should have a theme wrapper', async () => {
    routedComponent('/main/1');
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
