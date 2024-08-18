import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';
import Uncontroled from './pages/forms/uncontrolled/Uncontrolled';
import Hooked from './pages/forms/hooked/Hooked';
import StoreProvider from './redux/store';
import NotificationPorvider from './context/Notification';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/forms/uncontrolled',
    element: <Uncontroled />,
  },
  {
    path: '/forms/hooked',
    element: <Hooked />,
  },
]);

function App() {
  return (
    <StoreProvider>
      <NotificationPorvider>
        <RouterProvider router={router}></RouterProvider>
      </NotificationPorvider>
    </StoreProvider>
  );
}

export default App;
