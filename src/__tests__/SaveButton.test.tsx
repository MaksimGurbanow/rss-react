import { act, fireEvent, screen } from '@testing-library/react';
import { wrappedComponent } from './index.test';
import RemixStub from './remixMockRouter';

describe('Save button', () => {
  test('Should be rendered', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    expect((await screen.findAllByTestId('save-button-1'))[0]).toBeDefined();
  });
  test('Should save item', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    const button = (await screen.findAllByTestId('save-button-1'))[0];
    expect(button.innerHTML).toBe('Save');
    await act(async () => fireEvent.click(button));

    expect(await screen.findByTestId('saved-products')).toBeDefined();
    expect((await screen.findAllByTestId('save-button-1'))[1].innerHTML).toBe(
      'Delete',
    );
  });

  test('Should delete if saved', async () => {
    wrappedComponent(<RemixStub initialEntries={['/main/1']} />);
    const button = (await screen.findAllByTestId('save-button-1'))[0];
    await act(async () => fireEvent.click(button));

    expect(screen.queryByTestId('saved-products')).toBeNull();
  });
});
