import React from 'react';
import './App.css';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import NotFound from './routes/notFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/:page" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const WrappedApp = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default WrappedApp;
