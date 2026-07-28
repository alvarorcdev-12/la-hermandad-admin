import type { PropsWithChildren } from 'react';
import { RouterProvider } from 'react-router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { appRouter } from './app-router';
import { ThemeProvider } from './components/theme-provider';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <h1>Cargando...</h1>;

  return children;
};

export const LaHermandadAdminApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <Toaster position="bottom-center" />
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </CheckAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
