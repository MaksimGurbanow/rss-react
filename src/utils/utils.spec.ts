import { DummyResponse } from './../types/types';
import capitalize from './capitalize';
import convertToCSV from './convertToCSV';
import pluralize from './pluralize';

describe('Capitalize', () => {
  test('Should capitalize the message', () => {
    const message = 'test';
    expect(capitalize(message)).toBe('Test');
  });
  test('Should return empty string if no message was provided', () => {
    expect(capitalize()).toBe('');
  });
});

describe('Pluralize', () => {
  test("Should return single form of the word if its' quantity is 1", () => {
    expect(pluralize('word', 1)).toBe('word');
  });
  test('Should return multiple form of the word if the quantity is more than 1', () => {
    expect(pluralize('word', 2)).toBe('words');
  });

  test('Should throw error if quantity is less than 0', () => {
    expect(() => pluralize('word', -1)).toThrowError(
      'Quantity must be greater than 0',
    );
  });
  test('Should return single form if no number was provided', () => {
    expect(pluralize('word')).toBe('word');
  });
});

describe('ConvertToCSV', () => {
  test('Should correctly convert to string', async () => {
    const unhandledResp = await fetch(
      'https://dummyjson.com/products/' + 'search?q=a',
    );
    const res: DummyResponse = await unhandledResp.json();
    expect(res).toHaveProperty('products');
    expect(convertToCSV(res.products)).toBeDefined();
  });
});
