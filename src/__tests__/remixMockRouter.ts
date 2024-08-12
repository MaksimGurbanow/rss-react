import { createRemixStub } from '@remix-run/testing';
import Main from '../app/routes/main.$page/route';
import { defer } from '@remix-run/react';
import { mockItem, products } from './contants';
import App from '../app/routes/route';
import NotFound from '../app/routes/$';
import Details from '../app/routes/main.$page.details.($id)/route';

const RemixStub = createRemixStub([
  {
    path: '/main/:page',
    Component: Main,

    children: [
      {
        path: '/main/:page/details/1',
        Component: Details,
        loader() {
          return { id: 1, product: mockItem };
        },
      },
      {
        path: '/main/:page/details',
        Component: Details,
        loader() {
          return { id: undefined, product: undefined };
        },
      },
    ],
    loader({ params }) {
      const page = Number(params.page);
      return defer({
        page,
        res: {
          products: products.slice((page - 1) * 10, 10),
          total: products.length,
          limit: 10,
          skip: 0,
        },
      });
    },
  },
  {
    path: '/',
    Component: App,
    loader: () => null,
  },
  {
    path: '*',
    Component: NotFound,
    loader: () => null,
  },
]);

export default RemixStub;
