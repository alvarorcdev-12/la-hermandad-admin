import { createBrowserRouter, Navigate } from 'react-router';

export const appRouter = createBrowserRouter([
  {
    path: '/auth',
    lazy: () =>
      import('./layouts/AuthLayout').then((m) => ({
        element: <m.default />,
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
  {
    path: '/admin',
    lazy: () =>
      import('./layouts/AdminLayout').then((m) => ({
        element: <m.default />,
      })),
    children: [
      {
        index: true,
        lazy: () =>
          import('./pages/admin/dashboard/DashboardPage').then((m) => ({
            element: <m.default />,
          })),
      },
    ],
  },
]);
