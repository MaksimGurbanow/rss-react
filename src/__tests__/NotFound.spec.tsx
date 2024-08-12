import { act, fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { server } from './mockServer';
import { wrappedComponent } from './index.test';
import RemixStub from './remixMockRouter';

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
    wrappedComponent(<RemixStub initialEntries={['/non']} />);
    await screen.findByTestId('not-found-message');
  });

  test('Should redirect to Main page upon clicking', async () => {
    wrappedComponent(<RemixStub initialEntries={['/non']} />);
    const button = await screen.findByTestId('not-found-button');
    await act(async () => {
      fireEvent.click(button);
    });
    await screen.findByTestId('main-page-1');
  });
});
