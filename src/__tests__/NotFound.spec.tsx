import { act, fireEvent, screen } from '@testing-library/react';
import { routedComponent } from './index.test';
import mockRouter from 'next-router-mock';
import { server } from './mockServer';

describe('Not Found', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  test('Should contain message', async () => {
    routedComponent('/wrong-path');
    await screen.findByTestId('not-found-message');
  });

  test('Should redirect to Main page upon clicking', async () => {
    routedComponent('/wrong-path');
    const button = await screen.findByTestId('not-found-button');
    await act(async () => {
      fireEvent.click(button);
      await mockRouter.push('/main/1');
    });
    await screen.findByTestId('main-page');
  });
});
