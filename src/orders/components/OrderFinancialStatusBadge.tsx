import { CircleDollarSign, CircleOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: string;
}

export const OrderFinancialStatusBadge = ({ status }: Props) => {
  const statusConfig = {
    PAID: {
      label: "Pagado",
      color:
        "text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700/30",
      Icon: <CircleDollarSign data-icon="inline-start" />,
    },
    PARTIALLY_PAID: {
      label: "Pago parcial",
      color:
        "text-orange-800 bg-orange-200 dark:text-orange-200 dark:bg-orange-800/40",
      Icon: <CircleOff data-icon="inline-start" />,
    },
    PENDING: {
      label: "Pendiente",
      color:
        "text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-muted",
      Icon: <CircleOff data-icon="inline-start" />,
    },
  };

  return (
    <Badge className={cn(statusConfig[status].color)}>
      {statusConfig[status].Icon}
      {statusConfig[status].label}
    </Badge>
  );
};
