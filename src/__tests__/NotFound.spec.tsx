import { act, fireEvent, screen } from '@testing-library/react';
import { wrappedComponent } from '../index.test';
import NotFound from '../pages/404';
import Main from '../pages/main/[page]/[[...paths]]';

describe('Not Found', () => {
  beforeEach(() => {});
  test('Should contain message', async () => {
    wrappedComponent(<NotFound />, ['/wrong-path']);
    await screen.findByTestId('not-found-message');
  });

  test('Should redirect to Main page upon clicking', async () => {
    wrappedComponent(<NotFound />, ['/wrong-path']);
    const button = await screen.findByTestId('not-found-button');
    act(() => {
      fireEvent.click(button);
    });
    wrappedComponent(<Main />, ['/mian/1']);
    await screen.findByTestId('main-page');
  });
});
