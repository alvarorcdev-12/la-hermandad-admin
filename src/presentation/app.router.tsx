import { createBrowserRouter } from 'react-router';

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
    ],
  },
]);
