import { Circle, CircleCheck, CircleDollarSign, CircleX } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  status: string;
}

const getStatusConfig = (
  status: string,
): { label: string; color: string; Icon: React.ReactElement } => {
  switch (status) {
    case 'OPEN':
      return {
        label: 'Abierto',
        color:
          'text-amber-800 bg-amber-200 dark:text-amber-200 dark:bg-amber-800/40',
        Icon: <Circle data-icon="inline-start" />,
      };
    case 'CLOSED':
      return {
        label: 'Cerrado',
        color:
          'text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-muted',
        Icon: <CircleCheck data-icon="inline-start" />,
      };
    case 'CANCELLED':
      return {
        label: 'Cancelado',
        color: 'text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800/40',
        Icon: <CircleX data-icon="inline-start" />,
      };
    default:
      return {
        label: 'Pagado',
        color:
          'text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700/30',
        Icon: <CircleDollarSign data-icon="inline-start" />,
      };
  }
};

export const OrderStatusBadge = ({ status }: Props) => {
  return (
    <Badge className={cn(getStatusConfig(status).color)}>
      {getStatusConfig(status).Icon}
      {getStatusConfig(status).label}
    </Badge>
  );
};
