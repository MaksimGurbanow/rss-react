import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  test('Should change value upon typing', () => {
    const handleChange = vi.fn();

    render(
      <Input 
        placeholder="Search..." 
        value="" 
        onChange={handleChange} 
      />
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledWith('new value');
  });
});