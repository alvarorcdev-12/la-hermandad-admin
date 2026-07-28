import { createBrowserRouter, Navigate } from 'react-router';
import { authRouter } from './auth/router/auth-router';
import { adminRouter } from './admin/router/admin-router';

export const appRouter = createBrowserRouter([
  // Auth
  { ...authRouter },

  {
    ...adminRouter,
  },
  {
    index: true,
    element: <Navigate to="/admin" />,
  },
]);
