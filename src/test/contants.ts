import { Product } from '../types/types';

export const products: Pick<Product, 'title' | 'images' | 'id'>[] = [
  {
    id: 1,
    title: 'Test',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 2,
    title: 'Test2',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 3,
    title: 'Test3',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 4,
    title: 'Test4',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 5,
    title: 'Test5',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 6,
    title: 'Test6',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 7,
    title: 'Test7',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 8,
    title: 'Test8',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 9,
    title: 'Test9',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 10,
    title: 'Test10',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 11,
    title: 'Test11',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 12,
    title: 'Test12',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 13,
    title: 'Test13',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 14,
    title: 'Test14',
    images: ['https://picsum.photos/536/354'],
  },
  {
    id: 15,
    title: 'Test15',
    images: ['https://picsum.photos/536/354'],
  },
];

export const mockItem: Pick<
  Product,
  'images' | 'title' | 'id' | 'description'
> = {
  title: 'example',
  id: 1,
  images: ['https://picsum.photos/536/354'],
  description: 'example',
};
