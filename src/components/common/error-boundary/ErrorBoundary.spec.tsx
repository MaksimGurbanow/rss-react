import { screen } from '@testing-library/dom';
import { wrappedComponent } from '../../../App.spec';
import ErrorBoundary from './ErrorBoundary';

const BuggyComponent = () => {
  throw new Error('I throw error instead of component');
};

describe('Error boundary', () => {
  test('Should render fallback if child component has error', async () => {
    wrappedComponent(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>,
      ['/'],
    );
    const message = await screen.findByTestId('error-boundary-message');
    expect(message).toBeDefined();
  });

  test('Should render fallback message if it is provided', async () => {
    wrappedComponent(
      <ErrorBoundary fallback={() => <div>Custom message</div>}>
        <BuggyComponent />
      </ErrorBoundary>,
      ['/'],
    );
    const message = await screen.findByTestId('error-boundary-fallback');
    expect(message.innerText).toBe('Custom message');
  });
});
