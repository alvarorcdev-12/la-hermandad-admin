import { RouterProvider } from 'react-router';
import { appRouter } from './presentation/app.router';

export const LaHermandadAdminApp = () => {
  return <RouterProvider router={appRouter} />;
};
