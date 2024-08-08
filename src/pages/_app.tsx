import { type ReactElement, type ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../App.scss';
import '../index.scss';
import StoreProvider from '../app/redux/provider';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>
    </ThemeProvider>
  );
}
