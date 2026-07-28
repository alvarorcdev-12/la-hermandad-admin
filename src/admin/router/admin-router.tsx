import { AuthenticatedRoute } from '@/auth/components/ProtectedRoutes';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const AdminLayout = lazy(() => import('../layout/AuthLayout'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const ProductsPage = lazy(() => import('../pages/products/ProductsPage'));
const ProductPage = lazy(() => import('../pages/product/ProductPage'));
const CategoriesPage = lazy(() => import('../pages/categories/CategoriesPage'));
const CustomersPage = lazy(() => import('../pages/customers/CustomersPage'));
const CustomerPage = lazy(() => import('../pages/customer/CustomerPage'));

export const adminRouter: RouteObject = {
  path: '/admin',
  element: (
    <AuthenticatedRoute>
      <AdminLayout />
    </AuthenticatedRoute>
  ),
  handle: {
    breadcrumb: 'Inicio',
  },
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
      path: 'customers',
      element: <CustomersPage />,
    },
    {
      path: 'customers/:id',
      element: <CustomerPage />,
    },
  ],
};
