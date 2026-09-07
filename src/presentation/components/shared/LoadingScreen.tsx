import { Spinner } from '@/components/ui/spinner';

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-background">
      <Spinner />
      <p className="mt-4 text-lg font-medium">Cargando...</p>
    </div>
  );
};
