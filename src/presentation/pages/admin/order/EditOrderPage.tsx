import { Link, Navigate, useParams } from 'react-router';
import { skipToken, useQuery } from '@tanstack/react-query';

import { getOrderByIdAction } from '@/actions/orders/get-order-by-id.action';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { ClipboardPen, XIcon } from 'lucide-react';
import { Formatter } from '@/utils/formatter';
import { OrderItemCard } from './ui/OrderItemCard';
import { OrderTotalsCard } from './ui/OrderTotalsCard';
import { OrderNotesCard } from './ui/OrderNotesCard';
import { useCustomers } from '@/presentation/hooks/customers/useCustomers';
import { Button, buttonVariants } from '@/components/ui/button';
import { OrderCustomerCard } from './ui/OrderCustomerCard';
import {  useState } from 'react';

import type { Customer } from '@/domain/entities/customer.entity';

const EditOrderPage = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', { id }],
    queryFn: id ? () => getOrderByIdAction(id) : skipToken,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data } = useCustomers({ page: 1, limit: 100 });

  const [localCustomer, setLocalCustomer] = useState<Customer | undefined>();

  if (isError) {
    return <Navigate to="/admin/orders" replace />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!order) {
    return <Navigate to="/admin/orders" replace />;
  }
  const selectedCustomer = localCustomer ?? order.customer;

  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <AdminTitle
            title={order.name}
            Icon={ClipboardPen}
            prevHref="/admin/orders"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Actualizado {Formatter.dateTime(order.updateAt)}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Columna Izquierda */}
            <div className="md:col-span-8 space-y-5">
              <OrderItemCard
                cart={order.items.map((i) => ({
                  productId: i.productId,
                  price: i.unitPrice,
                  quantity: i.quantity,
                  title: i.title,
                }))}
                onAddProducts={() => {}}
                onUpdateQuantity={() => {}}
                onRemoveProduct={() => {}}
              />
              <OrderTotalsCard
                subtotalPrice={order.subtotalPrice}
                totalPrice={order.totalPrice}
                itemsCount={order.itemCount}
              />
            </div>
            {/* Columna Derecha */}
            <div className="md:col-span-4 space-y-5">
              <OrderNotesCard note={''} setNote={() => {}} />
              <OrderCustomerCard
                customers={data?.results || []}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setLocalCustomer}
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
            <Button type="submit">
              Guardar
              {/* {mutation.isPending ? <Spinner /> : <Save />}
              {mutation.isPending ? 'Guardando' : 'Guardar'} */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderPage;
