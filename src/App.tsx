import './App.scss';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './routes/main/Main';
import NotFound from './routes/notFound/NotFound';
import Details from './routes/details/Details';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import store from './app/redux/store';
import { Provider } from 'react-redux';

export const App = () => {
  const { theme } = useThemeContext();
  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      <Routes>
        <Route path="/" element={<Navigate to="1" />} />
        <Route path="/:page" element={<Main />}>
          <Route path="details/:productId?" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default WrappedApp;
