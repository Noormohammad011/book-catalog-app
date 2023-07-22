import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/App';
import BookDetails from '../pages/BookDetails';
import Books from '../pages/Books';
import BookForm from '../pages/CreateBook';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from './PrivateRoute';
import UpdateBook from '../pages/UpdateBook';
import Profile from '../pages/Profile';

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
      {
        path: '/allbooks',
        element: <Books />,
      },
      {
        path: '/book/:id',
        element: <BookDetails />,
      },
      {
        path: '/createbook',
        element: (
          <PrivateRoute>
            <BookForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/updatebook/:id',
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
