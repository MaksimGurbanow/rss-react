import React from 'react';
import './App.css';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import NotFound from './routes/notFound/NotFound';
import Details from './routes/details/Details';
import ThemeColorProvider from './context/ThemeColor';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeColorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/:page" element={<Main />}>
              <Route path="details/:productId?" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeColorProvider>
    </ErrorBoundary>
  );
};

export default App;
