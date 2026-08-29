import { Calendar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const OrderStats = () => {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* Stats Data selector*/}
          <div className="flex items-center p-4 w-1/2 gap-2">
            <Calendar className="size-4" />
            <p className="text-sm font-medium">Hoy</p>
          </div>
          <div className="border-r border-l p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Pedidos
            </p>
            <p className="font-medium text-sm mt-2">0</p>
          </div>
          <div className="border-r p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Productos
            </p>
            <p className="font-medium text-sm mt-2">0</p>
          </div>
          <div className="border-r p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Ventas
            </p>
            <p className="font-medium text-sm mt-2">0</p>
          </div>
          <div className="border-r p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Completados
            </p>
            <p className="font-medium text-sm mt-2">0</p>
          </div>
          <div className="p-4 w-full">
            <p className="font-medium text-sm underline decoration-dashed underline-offset-4">
              Cancelados
            </p>
            <p className="font-medium text-sm mt-2">0</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
