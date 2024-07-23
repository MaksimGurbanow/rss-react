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
    'price',
    'title',
    'rating',
    'minimumOrderQuantity',
  ];
  const refinedItems = items.map((item) => {
    return productKeys.map((key) => item[key]);
  });

  let csvContent = productKeys.join(',') + '\n';

  refinedItems.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  return csvContent;
};
