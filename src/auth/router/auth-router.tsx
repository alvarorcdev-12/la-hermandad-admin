import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { NotAuthenticatedRoute } from '../components/ProtectedRoutes';

const AuthLayout = lazy(() => import('../layout/AuthLayout'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/register/RegisterPage'));

export const authRouter: RouteObject = {
  path: '/auth',
  element: (
    <NotAuthenticatedRoute>
      <AuthLayout />
    </NotAuthenticatedRoute>
  ),
  children: [
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      index: true,
      element: <Navigate to="/auth/login" />,
    },
  ],
};
