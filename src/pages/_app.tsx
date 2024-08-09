import { type ReactElement, type ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../App.scss';
import '../index.scss';
import StoreProvider from '../app/redux/provider';
import ErrorBoundary from '../components/common/error-boundary/ErrorBoundary';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = Pick<AppProps, 'Component' | 'pageProps'> & {
  Component?: NextPageWithLayout;
};

export default function App({ Component, pageProps = {} }: AppPropsWithLayout) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <StoreProvider>
          {Component && <Component {...pageProps} />}
        </StoreProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
