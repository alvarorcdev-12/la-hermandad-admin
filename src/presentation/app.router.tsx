import { createBrowserRouter, Navigate } from 'react-router';
import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
} from './components/protected/ProtectedRoutes';

export const appRouter = createBrowserRouter([
  // AUTH
  {
    path: '/auth',
    lazy: () =>
      import('./layouts/AuthLayout').then((m) => ({
        element: (
          <NotAuthenticatedRoute>
            <m.default />
          </NotAuthenticatedRoute>
        ),
      })),
    children: [
      {
        path: 'login',
        lazy: () =>
          import('./pages/auth/login/LoginPage').then((m) => ({
            element: <m.LoginPage />,
          })),
      },
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  // ADMIN
  {
    path: '/admin',
    lazy: () =>
      import('./layouts/AdminLayout').then((m) => ({
        element: (
          <AuthenticatedRoute>
            <m.default />
          </AuthenticatedRoute>
        ),
      })),
    children: [
      {
        index: true,
        lazy: () =>
          import('./pages/admin/dashboard/DashboardPage').then((m) => ({
            element: <m.default />,
          })),
      },
      {
        path: 'products',
        lazy: () =>
          import('./pages/admin/products/ProductsPage').then((m) => ({
            element: <m.default />,
          })),
      },
    ],
  },
]);
