import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppRouter } from './app.router';
import { LoadingScreen } from './components/shared/LoadingScreen';

import { useAuthStore } from './store/auth.store';
import { Toaster } from '@/components/ui/toast';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: React.PropsWithChildren) => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <LoadingScreen />;

  return children;
};

export const LaHermandadAdminApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <AppRouter />
      </CheckAuthProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
