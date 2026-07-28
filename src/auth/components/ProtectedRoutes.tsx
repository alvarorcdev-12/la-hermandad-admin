import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/auth/store/auth.store';

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />;

  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  if (authStatus === 'checking') return null;

  if (authStatus === 'authenticated') return <Navigate to="/admin" />;

  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  const isOwner = useAuthStore((state) => state.isOwner);

  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />;

  if (!isOwner) return <Navigate to="/admin" />;

  return children;
};
