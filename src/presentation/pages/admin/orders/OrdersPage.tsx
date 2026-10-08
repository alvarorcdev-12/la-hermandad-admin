import { Link } from 'react-router';
import { Inbox, Plus } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { OrdersTable } from '@/presentation/components/orders/OrdersTable';
import { DebouncedSearchInput } from '@/presentation/components/shared/DebouncedSearchInput';
import {
  SortDropdownMenu,
  type SortOption,
} from '@/presentation/components/shared/SortDropdownMenu';
import { StatusFilterButtons } from '@/presentation/components/shared/StatusFilterButtons';

import { useOrders } from '@/presentation/hooks/orders/useOrders';
import { OrderStats } from '@/presentation/components/orders/OrderStats';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { mapDateRangeToApiParams } from '@/utils/date-filters';
import { getOrdersStatsAction } from '@/actions/orders/get-orders-stats.action';

import type { DateRange } from 'react-day-picker';

const ordersSortOptions: SortOption[] = [
  {
    label: 'Numero del pedido',
    sort: 'orderNumber',
    directions: [
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
    ],
  },
  {
    label: 'Precio',
    sort: 'totalPrice',
    directions: [
      { value: 'asc', label: 'Ascendente' },
      { value: 'desc', label: 'Descendente' },
    ],
  },
  {
    label: 'Creado',
    sort: 'createdAt',
    directions: [
      { value: 'asc', label: 'Más antiguo primero' },
      { value: 'desc', label: 'Más reciente primero' },
    ],
  },
  {
    label: 'Actualizado',
    sort: 'updatedAt',
    directions: [
      { value: 'asc', label: 'Más antiguo primero' },
      { value: 'desc', label: 'Más reciente primero' },
    ],
  },
];

const OrdersPage = () => {
  const {
    data: orders,
    isLoading,
    queryStatus,
    querySort,
    queryDirection,
    handleStatusChange,
    handleQueryChange,
    handleSortChange,
  } = useOrders();

  const [date, setDate] = useState<DateRange | undefined>();

  const dateParams = mapDateRangeToApiParams(date);

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['orders-stats', dateParams],
    queryFn: () =>
      getOrdersStatsAction(dateParams.startDate, dateParams.endDate),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <AdminTitle title="Pedidos" Icon={Inbox} />
        <Link to="/admin/orders/new" className={buttonVariants({ size: 'sm' })}>
          <Plus /> Crear pedido
        </Link>
      </div>

      <div className="mt-4">
        <OrderStats
          stats={stats}
          isLoading={isLoadingStats}
          date={date}
          onDateChange={setDate}
        />
      </div>

      <div className="mt-4">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              <StatusFilterButtons
                options={[
                  { label: 'Todos', value: undefined },
                  { label: 'Abierto', value: 'open' },
                  { label: 'Cerrado', value: 'closed' },
                  { label: 'Cancelado', value: 'cancelled' },
                ]}
                currentStatus={queryStatus}
                onStatusChange={handleStatusChange}
              />
              <div className="flex items-center gap-2">
                {/* SearchInput */}
                <DebouncedSearchInput
                  placeholder="Buscar pedido"
                  onQueryChange={handleQueryChange}
                />
                {/* Sort */}
                <SortDropdownMenu
                  options={ordersSortOptions}
                  querySort={querySort}
                  queryDirection={queryDirection}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <Spinner />
              </div>
            ) : (
              <OrdersTable orders={orders || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrdersPage;
