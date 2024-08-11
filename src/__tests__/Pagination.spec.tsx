import { wrappedComponent } from './index.test';
import { server } from './mockServer';
import Pagination from '../components/pagination/Pagination';
import { fireEvent, screen } from '@testing-library/dom';

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test('Should render', async () => {
    wrappedComponent(<Pagination page={2} total={30} />);
    const nextButton = await screen.findByTestId('pagination-next');
    const previousButton = await screen.findByTestId('pagination-previous');

    expect(nextButton).toBeDefined();
    expect(previousButton).toBeDefined();

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);
  });

  test('Previous button should be disabled if it is the first page', async () => {
    wrappedComponent(<Pagination page={1} total={30} />);
    const previousButton = await screen.findByTestId('pagination-previous');

    expect(previousButton.classList.contains('disabled')).toBeTruthy();
  });

  test('Next button should be disabled if it is the first page', async () => {
    wrappedComponent(<Pagination page={4} total={30} />);
    const previousButton = await screen.findByTestId('pagination-next');

    expect(previousButton.classList.contains('disabled')).toBeTruthy();
  });
});
