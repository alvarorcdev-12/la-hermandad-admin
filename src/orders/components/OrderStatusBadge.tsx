import { Circle, CircleCheck, CircleX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: string;
}

export const OrderStatusBadge = ({ status }: Props) => {
  const statusConfig = {
    OPEN: {
      label: "Abierto",
      color:
        "text-amber-800 bg-amber-200 dark:text-amber-200 dark:bg-amber-800/40",
      Icon: <Circle data-icon="inline-start" />,
    },
    CLOSED: {
      label: "Cerrado",
      color:
        "text-neutral-800 bg-neutral-200 dark:text-neutral-200 dark:bg-muted",
      Icon: <CircleCheck data-icon="inline-start" />,
    },
    CANCELLED: {
      label: "Cancelado",
      color: "text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800/40",
      Icon: <CircleX data-icon="inline-start" />,
    },
  };

  return (
    <Badge className={cn(statusConfig[status].color)}>
      {statusConfig[status].Icon}
      {statusConfig[status].label}
    </Badge>
  );
};
