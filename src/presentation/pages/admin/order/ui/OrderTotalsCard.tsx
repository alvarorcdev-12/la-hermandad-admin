import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Formatter } from '@/utils/formatter';

interface Props {
  subtotalPrice: number;
  totalPrice: number;
  itemsCount: number;
}

export const OrderTotalsCard = ({
  subtotalPrice,
  totalPrice,
  itemsCount,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pago</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 border rounded-lg p-4">
          {/* subtotalPrice */}
          <div>
            <span className="w-44 inline-block">Subtotal</span>
            <span className="text-left">{itemsCount} artículos</span>
          </div>
          <span className="text-right">
            {Formatter.currency(subtotalPrice)}
          </span>
          {/* Descuento? */}
          <div>
            <span className="w-44 inline-block text-muted-foreground">
              {/* <span className="w-44 inline-block text-blue-600 dark:text-blue-400"> */}
              Agregar descuento
            </span>
            <span className="text-left text-muted-foreground">__</span>
          </div>
          <span className="text-right text-muted-foreground">
            {Formatter.currency(0)}
          </span>
          {/* Impuestos? */}
          <div>
            <span className="w-44 inline-block text-muted-foreground">
              {/* <span className="w-44 inline-block text-blue-600 dark:text-blue-400"> */}
              Impuesto estimado
            </span>
            <span className="text-left text-muted-foreground">__</span>
          </div>
          <span className="text-right text-muted-foreground">
            {Formatter.currency(0)}
          </span>
          {/* Total */}
          <div>
            <span className="font-semibold">Total</span>
          </div>
          <span className="text-right font-semibold">
            {Formatter.currency(totalPrice)}
          </span>
        </div>
        <div className="flex items-center justify-end gap-3 mt-3">
          <Button size="sm" variant="outline" type="button">
            Recibo
          </Button>
          <Button size="sm" type="button">
            Marcar como pagado
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
