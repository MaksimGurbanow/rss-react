export default (word: string, quantity: number = 1) => {
  if (quantity < 0) throw new Error('Quantity must be greater than 0');
  if (quantity === 1) return word;
  return word + 's';
};
