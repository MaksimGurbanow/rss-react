import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { wrappedComponent } from '../../App.spec';
import * as SearchHook from '../../hooks/useSearchQuery';
import { useSearchQuery } from '../../hooks/useSearchQuery';

describe('Search', () => {
  test('Should render components correctly', async () => {
    wrappedComponent(<App />, ['/1']);
    const input = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');
    const toggle = await screen.findByTestId('toggle-theme');

    expect(input).toBeDefined();
    expect(button).toBeDefined();
    expect(toggle).toBeDefined();
  });

  beforeEach(() => {
    vi.spyOn(SearchHook, 'useSearchQuery');
  });
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('Should save to local storage if button is clicked', async () => {
    wrappedComponent(<App />, ['/1']);

    let input = await screen.findByTestId<HTMLInputElement>('search-input');
    const button = await screen.findByTestId('search-button');

    userEvent.type(input, 'example search query');
    act(() => {
      fireEvent.click(button);
    });

    expect(useSearchQuery).toBeCalled();
  });

  test('Button should be disabled until value is changed', async () => {
    wrappedComponent(<App />, ['/1']);
    let input = await screen.findByTestId<HTMLInputElement>('search-input');
    const button = await screen.findByTestId('search-button');

    expect(button).toHaveProperty('disabled', true);

    await userEvent.type(input, 'new');

    expect(button).toHaveProperty('disabled', false);
  });
});
