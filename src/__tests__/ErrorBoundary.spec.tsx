import { screen } from '@testing-library/dom';
import ErrorBoundary from '../components/common/error-boundary/ErrorBoundary';
import { render } from '@testing-library/react';

const BuggyComponent = () => {
  throw new Error('I throw error instead of component');
};

describe('Error boundary', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    vi.clearAllMocks();
  });
  test('Should render fallback if child component has error', async () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>,
    );
    const message = await screen.findByTestId('error-boundary-message');
    expect(message).toBeDefined();
  });

  test('Should render fallback message if it is provided', async () => {
    render(
      <ErrorBoundary fallback={() => <div>Custom message</div>}>
        <BuggyComponent />
      </ErrorBoundary>,
    );
    const message = await screen.findByTestId('error-boundary-fallback');
    expect(message.innerHTML).toBe('<div>Custom message</div>');
  });
});
