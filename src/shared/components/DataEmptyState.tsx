import { useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  description?: string;
}

export const DataEmptyState = ({
  title = 'No se encontraron items',
  description = 'Intenta de cambiar los filtros o el término de búsqueda',
}: Props) => {
  const [, setSearchParams] = useSearchParams();

  const handleClearParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col items-center py-6 gap-6 justify-between max-w-4xl mx-auto w-full">
        <Search className="size-14 text-muted-foreground" />
        <div className="flex-1 text-center space-y-2 max-w-lg">
          <div>
            <h3 className="font-semibold text-xl">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
              {description}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="shadow-xs hover:shadow-sm"
          onClick={handleClearParams}
        >
          Borrar búsqueda y filtros
        </Button>
      </div>
    </div>
  );
};
