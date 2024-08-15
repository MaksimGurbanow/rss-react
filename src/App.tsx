import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';
import Uncontroled from './pages/forms/uncontrolled/Uncontrolled';
import Hooked from './pages/forms/hooked/Hooked';

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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
