import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme, ThemeContext } from '../contexts/ThemeContext';
import StoreProvider from '../redux/provider';
import { server } from './mockServer';
import { wrappedComponent } from './index.test';
import RemixStub from './remixMockRouter';

describe('Search', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });
  afterAll(() => {
    server.close();
  });
  test('Should render components correctly', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    const input = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');
    const toggle = await screen.findByTestId('toggle-theme');
    const container = await screen.findByTestId('search-container');

    expect(input).toBeDefined();
    expect(button).toBeDefined();
    expect(toggle).toBeDefined();
    expect(container).toBeDefined();
  });

  test('Input should change value if is typed', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    let input = await screen.findByTestId<HTMLInputElement>('search-input');
    await userEvent.type(input, 'new');

    expect(input.value).toBe('new');
  });

  test('Toggle should change the theme', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
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
          <RemixStub initialEntries={['/main/1']} />
        </StoreProvider>
      </ThemeContext.Provider>,
    );
    const toggle = await screen.findByTestId('toggle-theme');

    expect(
      toggle.querySelector('.toggle-circle')?.classList.contains('toggled'),
    ).toBeTruthy();
  });
});
