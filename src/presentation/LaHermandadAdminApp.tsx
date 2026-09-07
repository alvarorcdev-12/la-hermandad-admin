import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';

export const LaHermandadAdminApp = () => {
  return <RouterProvider router={appRouter} />;
};
