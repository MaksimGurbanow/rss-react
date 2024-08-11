import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { mockItem, products } from './contants';

export const handlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}search?q=&skip=0&limit=$10&select=title&select=id&select=images`,
    () => {
      return HttpResponse.json({
        total: 10,
        products: products.slice(0, 5),
        skip: 0,
        limit: 10,
      });
    },
  ),
  http.get(`${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}1`, () => {
    return HttpResponse.json(mockItem);
  }),

  http.get('/api/savedProducts', () => {
    return HttpResponse.json({
      products: [],
    });
  }),

  http.put('/api/savedProducts', () => {
    return HttpResponse.json({
      product: mockItem,
    });
  }),
];

export const server = setupServer(...handlers);
