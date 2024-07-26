import { App } from '../../App';
import { wrappedComponent } from '../../App.spec';
import { act, fireEvent, screen } from '@testing-library/react';

describe('Not Found', () => {
  beforeEach(() => {
    wrappedComponent(<App />, ['/wrong-path']);
  });
  test('Should contain message', async () => {
    await screen.findByTestId('not-found-message');
  });

  test('Should redirect to Main page upon clicking', async () => {
    const button = await screen.findByTestId('not-found-button');
    act(() => {
      fireEvent.click(button);
    });

    await screen.findByTestId('main-page');
  });
});
