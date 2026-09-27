import { Circle, CircleDollarSign, CircleOff } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  status: string;
}

const getStatusConfig = (
  status: string,
): { label: string; color: string; Icon: React.ReactElement } => {
  switch (status) {
    case 'PAID':
      return {
        label: 'Pagado',
        color:
          'text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700/30',
        Icon: <CircleDollarSign data-icon="inline-start" />,
      };
    case 'PARTIALLY_PAID':
      return {
        label: 'Pago parcial',
        color:
          'text-orange-800 bg-orange-200 dark:text-orange-200 dark:bg-orange-800/40',
        Icon: <CircleOff data-icon="inline-start" />,
      };
    case 'PENDING':
      return {
        label: 'Pendiente',
        color:
          'text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-muted',
        Icon: <Circle data-icon="inline-start" />,
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

export const OrderFinancialStatusBadge = ({ status }: Props) => {
  return (
    <Badge className={cn(getStatusConfig(status).color)}>
      {getStatusConfig(status).Icon}
      {getStatusConfig(status).label}
    </Badge>
  );
};
