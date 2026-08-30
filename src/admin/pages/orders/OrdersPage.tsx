import { Link } from "react-router";
import { Inbox, Plus } from "lucide-react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataSort, type SortOption } from "@/shared/components/DataSort";
import { DataStatusFilter } from "@/shared/components/DataStatusFilter";
import { OrdersTable } from "@/orders/components/OrdersTable";
import { OrderStats } from "@/orders/components/OrderStats";
import { SearchInput } from "@/shared/components/SearchInput";

import { useOrdersPagination } from "@/orders/hooks/useOrdersPagination";

const ordersSortOptions: SortOption[] = [
  {
    label: "Número de pedido",
    sort: "orderNumber",
    directions: [
      { value: "asc", label: "Menor" },
      { value: "desc", label: "Mayor" },
    ],
  },
  {
    label: "Inventario",
    sort: "inventoryQuantity",
    directions: [
      { value: "asc", label: "Ascendente" },
      { value: "desc", label: "Descendente" },
    ],
  },
  {
    label: "Creado",
    sort: "createdAt",
    directions: [
      { value: "asc", label: "Más antiguo primero" },
      { value: "desc", label: "Más reciente primero" },
    ],
  },
  {
    label: "Actualizado",
    sort: "updatedAt",
    directions: [
      { value: "asc", label: "Más antiguo primero" },
      { value: "desc", label: "Más reciente primero" },
    ],
  },
];

const OrdersPage = () => {
  const { data, isLoading } = useOrdersPagination();

  return (
    <>
      <div className="flex items-center justify-between">
        <AdminTitle title="Pedidos" Icon={Inbox} />
        <Link
          to={"/admin/orders/new"}
          className={buttonVariants({ size: "sm" })}
        >
          <Plus />
          Crear pedido
        </Link>
      </div>
      {/* OrderStats */}
      <div className="mt-4">
        <OrderStats />
      </div>
      <div className="mt-6">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              <DataStatusFilter
                options={[
                  { value: undefined, label: "Todos" },
                  { value: "OPEN", label: "Abiertos" },
                  { value: "CLOSED", label: "Cerrados" },
                  { value: "CANCELLED", label: "Cancelados" },
                ]}
              />
              <div className="flex items-center gap-2">
                <SearchInput
                  className="max-w-xs"
                  placeholder="Buscar pedido"
                  // query={query}
                  // onQueryChange={handleSearchProduct}
                />

                <DataSort options={ordersSortOptions} />
              </div>
            </div>
            {/* OrdersTable */}
            <OrdersTable orders={data?.results || []} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrdersPage;
