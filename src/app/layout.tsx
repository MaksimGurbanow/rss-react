import { ThemeProvider } from '../contexts/ThemeContext';
import '../index.scss';
import '../App.scss';
import StoreProvider from '../redux/provider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="shortcut icon" href="/search-logo.jpg" type="image/x-icon" />
      </head>
      <body>
        <div id="__next">
          <ThemeProvider>
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
