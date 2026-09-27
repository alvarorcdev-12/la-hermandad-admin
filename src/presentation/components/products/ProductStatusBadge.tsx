import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  status: string;
}

export const ProductStatusBadge = ({ status }: Props) => {
  const statusConfig: Partial<Record<string, { label: string; color: string }>> = {
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
      color: 'text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-muted/60',
    },
  };

  const config = statusConfig[status] ?? {
    label: status,
    color: 'text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-muted/60',
  };

  return (
    <Badge className={cn('capitalize', config.color)}>
      {config.label}
    </Badge>
  );
};
