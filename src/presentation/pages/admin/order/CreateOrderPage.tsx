import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardPen, Save, XIcon } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { Button, buttonVariants } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { OrderNotesCard } from './ui/OrderNotesCard';
import { OrderCustomerCard } from './ui/OrderCustomerCard';
import { OrderItemCard } from './ui/OrderItemCard';
import { OrderTotalsCard } from './ui/OrderTotalsCard';

import { useCustomers } from '@/presentation/hooks/customers/useCustomers';
import { useCartStore } from '@/presentation/store/cart.store';

import { createOrderAction } from '@/actions/orders/create-order.action';

import type { Customer } from '@/domain/entities/customer.entity';
import type { CreateOrderPayload } from '@/infrastructure/interfaces/create-order-payload.interface';

const CreateOrderPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useCustomers({ page: 1, limit: 100 });

  const cart = useCartStore((state) => state.cart);
  const isEmptyCart = useCartStore((state) => state.isEmpty);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);

  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);

  const [note, setNote] = useState('');

  const addMultipleProductsToCart = useCartStore(
    (state) => state.addMultipleProductsToCart,
  );

  const mutation = useMutation({
    mutationFn: createOrderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const { itemCount, totalPrice, subtotalPrice } = useMemo(() => {
    let itemCount = 0;
    let subtotalPrice = 0;

    for (const item of cart) {
      itemCount += item.quantity;
      subtotalPrice += item.quantity * Number(item.price);
    }

    const totalPrice = subtotalPrice;

    return { itemCount, totalPrice, subtotalPrice };
  }, [cart]);

  const customers = data?.results || [];

  const handleCreateOrder = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isEmptyCart()) return;
    if (!selectedCustomer) return;

    const payload: CreateOrderPayload = {
      customerId: selectedCustomer.id,
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    await mutation.mutateAsync(payload, {
      onSuccess: (data) => {
        toast.add({
          type: 'success',
          title: 'Pedido creado',
        });
        navigate(`/admin/orders/${data.id}`);
        clearCart();
        setSelectedCustomer(undefined);
        setNote('');
      },
      onError: () => {
        toast.add({
          type: 'error',
          title: 'Error al crear pedido',
        });
      },
    });
  };

  return (
    <div className="max-w-6xl w-full mx-auto">
      <AdminTitle
        title="Crear pedido"
        Icon={ClipboardPen}
        prevHref="/admin/orders"
      />
      <div className="mt-4">
        <form onSubmit={handleCreateOrder}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Columna Izquierda */}
            <div className="md:col-span-8 space-y-5">
              <OrderItemCard
                cart={cart}
                onAddProducts={addMultipleProductsToCart}
                onUpdateQuantity={updateQuantity}
                onRemoveProduct={removeProduct}
              />
              <OrderTotalsCard
                subtotalPrice={subtotalPrice}
                totalPrice={totalPrice}
                itemsCount={itemCount}
              />
            </div>
            {/* Columna Derecha */}
            <div className="md:col-span-4 space-y-5">
              <OrderNotesCard note={note} setNote={setNote} />
              <OrderCustomerCard
                customers={customers}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 py-5">
            <Link
              to="/admin/orders"
              className={buttonVariants({ variant: 'outline' })}
              type="button"
            >
              <XIcon />
              Cancelar
            </Link>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : <Save />}
              {mutation.isPending ? 'Guardando' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderPage;
