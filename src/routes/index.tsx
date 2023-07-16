import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/App';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      /*  {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/service',
        element: <Services />,
      }, */
    ],
  },
]);

export default router;
