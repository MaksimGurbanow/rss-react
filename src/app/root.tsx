import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import StoreProvider from '../redux/provider';
import '../index.scss';
import '../App.scss';
import ErrorBoundary from '../components/common/error-boundary/ErrorBoundary';

export async function loader() {
  return json({
    ENV: {
      REMIX_API_BASE_URL: process.env.REMIX_API_BASE_URL,
      REMIX_API_PAGE_URL: process.env.REMIX_API_PAGE_URL,
      REMIX_API_PRODUCTS_URL: process.env.REMIX_API_PRODUCTS_URL,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/search-logo.jpg" />
        <Meta />
        <Links />
        <title>Dummy store</title>
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <StoreProvider>
              <div id="remix">
                <Outlet />
                <ScrollRestoration />
              </div>
            </StoreProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
          }}
        />
      </body>
    </html>
  );
}
