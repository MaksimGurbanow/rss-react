import { Product } from './../types/types';

type ProductKeys = keyof Pick<
  Product,
  | 'brand'
  | 'description'
  | 'discountPercentage'
  | 'price'
  | 'title'
  | 'rating'
  | 'minimumOrderQuantity'
  | 'warantyInformation'
>;

export default (items: Product[]) => {
  const productKeys: ProductKeys[] = [
    'brand',
    'description',
    'discountPercentage',
    'price',
    'title',
    'rating',
    'minimumOrderQuantity',
    'warantyInformation',
  ];
  const refinedItems = [];
  refinedItems.push(productKeys);
  items.forEach((item) => {
    refinedItems.push(Object.values(item));
  });

  let csvContent = '';

  refinedItems.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  return csvContent;
};
