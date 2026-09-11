import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
} from './components/protected/ProtectedRoutes';

// Layouts
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
// Pages
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
const DashboardPage = lazy(
  () => import('./pages/admin/dashboard/DashboardPage'),
);
const ProductsPage = lazy(() => import('./pages/admin/products/ProductsPage'));
const ProductPage = lazy(() => import('./pages/admin/product/ProductPage'));
const CategoriesPage = lazy(
  () => import('./pages/admin/categories/CategoriesPage'),
);
const CategoryPage = lazy(() => import('./pages/admin/category/CategoryPage'));
const CustomersPage = lazy(
  () => import('./pages/admin/customers/CustomersPage'),
);
const CustomerPage = lazy(() => import('./pages/admin/customer/CustomerPage'));
const OrdersPage = lazy(() => import('./pages/admin/orders/OrdersPage'));
const CreateOrderPage = lazy(
  () => import('./pages/admin/order/CreateOrderPage'),
);
const EditOrderPage = lazy(() => import('./pages/admin/order/EditOrderPage'));

const appRouter = createBrowserRouter([
  // AUTH
  {
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
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  // ADMIN
  {
    path: '/admin',
    element: (
      <AuthenticatedRoute>
        <AdminLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'categories/:id',
        element: <CategoryPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'customers/:id',
        element: <CustomerPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/new',
        element: <CreateOrderPage />,
      },
      {
        path: 'orders/:id',
        element: <EditOrderPage />,
      },
    ],
  },
  {
    index: true,
    element: <Navigate to="/admin" />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={appRouter} />;
};
