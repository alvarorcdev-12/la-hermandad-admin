import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { DateRange } from "react-day-picker";
import type { OrdersStats } from "../interfaces/orders-stats.interface";
import { Formatter } from "@/lib/formatter";
import { getRangeLabel } from "@/lib/get-range-label";

interface Props {
  stats?: OrdersStats;
  isLoading: boolean;

  date: DateRange;
  onDateChange: (date: DateRange) => void;
}

export const OrderStats = ({ date, stats, isLoading, onDateChange }: Props) => {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* Stats Data selector*/}
          <div className="flex items-center p-4 w-1/2 gap-2">
            {/* <Calendar className="size-4" />
            <p className="text-sm font-medium">Hoy</p> */}
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="ghost" className="gap-3">
                    <CalendarIcon />
                    {getRangeLabel(date)}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={onDateChange}
                  // numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="border-r border-l p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Pedidos
            </p>
            <p className="font-medium text-sm mt-2">{stats?.orders}</p>
          </div>
          <div className="border-r p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Productos vendidos
            </p>
            <p className="font-medium text-sm mt-2">{stats?.items || 0}</p>
          </div>
          <div className="border-r p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Ventas
            </p>
            <p className="font-medium text-sm mt-2">
              {Formatter.currency(stats?.sales || "0")}
            </p>
          </div>
          <div className="border-r p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Completados
            </p>
            <p className="font-medium text-sm mt-2">
              {stats?.closedOrders || 0}
            </p>
          </div>
          <div className="p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Cancelados
            </p>
            <p className="font-medium text-sm mt-2">
              {stats?.cancelledOrders || 0}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
