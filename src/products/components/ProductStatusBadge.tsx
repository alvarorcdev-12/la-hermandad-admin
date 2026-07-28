import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  status: string;
}

export const ProductStatusBadge = ({ status }: Props) => {
  const statusConfig = {
    ACTIVE: {
      label: 'Activo',
      color:
        'text-emerald-800 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-800/40',
    },
    DRAFT: {
      label: 'Borrador',
      color: 'text-blue-800 bg-blue-200 dark:text-blue-200 dark:bg-blue-800/40',
    },
    ARCHIVED: {
      label: 'Archivado',
      color: 'text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-gray-800/40',
    },
  };

  return (
    <Badge className={cn('capitalize', statusConfig[status].color)}>
      {statusConfig[status].label}
    </Badge>
  );
};
