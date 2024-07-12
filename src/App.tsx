import React from 'react';
import './App.css';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import NotFound from './routes/notFound/NotFound';
import Details from './routes/details/Details';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/:page" element={<Main />}>
            <Route path="details/:productId" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
