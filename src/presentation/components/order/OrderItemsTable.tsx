import { Image, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Formatter } from '@/utils/formatter';

import type { CartItem } from '@/presentation/store/cart.store';

interface Props {
  cart: CartItem[];
  onUpdateQuantity: (item: CartItem, quantity: number) => void;
  onRemoveProduct: (item: CartItem) => void;
}

export const OrderItemsTable = ({
  cart,
  onUpdateQuantity,
  onRemoveProduct,
}: Props) => {
  return (
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
              onChange={(e) => onUpdateQuantity(item, Number(e.target.value))}
            />
            <span>{Formatter.currency(+item.price * item.quantity)}</span>
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
  );
};
