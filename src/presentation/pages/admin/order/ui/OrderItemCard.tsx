import { useMemo, useState } from 'react';
import { Image, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProductPickerDialog } from '@/presentation/components/order/ProductPickerDialog';

import { Formatter } from '@/utils/formatter';

import type { CartItem } from '@/presentation/store/cart.store';

interface Props {
  onAddProducts?: (products: CartItem[]) => void;
  cart: CartItem[];
  onUpdateQuantity: (item: CartItem, quantity: number) => void;
  onRemoveProduct: (item: CartItem) => void;
}

export const OrderItemCard = ({
  onAddProducts,
  cart,
  onUpdateQuantity,
  onRemoveProduct,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const currentCartIds = useMemo(
    () => cart.map((item) => item.productId),
    [cart],
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardAction>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenDialog(true)}
            >
              <Plus />
              Agregar producto
            </Button>
          </CardAction>
        </CardHeader>
        {cart.length > 0 && (
          <CardContent>
            <div className="border rounded-md">
              {cart.map((item) => (
                <div
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                  key={item.productId}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-sm border w-9 h-9 dark:bg-muted">
                      <Image className="text-muted-foreground size-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p
                        // to={`/admin/products/${product.id}`}
                        className="font-medium leading-none hover:underline"
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-600 dark:text-blue-400">
                      {Formatter.currency(item.price)}
                    </span>
                    <Input
                      type="number"
                      min={1}
                      className="w-20"
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(item, Number(e.target.value))
                      }
                    />
                    <span>
                      {Formatter.currency(+item.price * item.quantity)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground"
                      onClick={() => onRemoveProduct(item)}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
      <ProductPickerDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        alreadySelectedIds={currentCartIds}
        onAddItems={onAddProducts}
      />
    </>
  );
};
