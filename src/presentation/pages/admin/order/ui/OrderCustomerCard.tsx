import { Ellipsis } from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { Customer } from '@/domain/entities/customer.entity';
import { CustomerCombobox } from '@/presentation/components/order/CustomerCombobox';

interface Props {
  customers: Customer[];
  selectedCustomer?: Customer;
  setSelectedCustomer: (customer?: Customer) => void;
}

export const OrderCustomerCard = ({
  customers,
  selectedCustomer,
  setSelectedCustomer,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cliente</CardTitle>
        <CardAction>
          {!selectedCustomer ? (
            <></>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon-sm"
                    className="text-muted-foreground"
                  >
                    <Ellipsis />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-auto" align="start">
                <DropdownMenuItem>
                  Editar información de contacto
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setSelectedCustomer(undefined);
                  }}
                >
                  Eliminar cliente
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {selectedCustomer ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-blue-600 dark:text-blue-400">
                {selectedCustomer.displayName}
              </p>
              <p className="text-muted-foreground">
                {selectedCustomer.numberOfOrders === 0
                  ? 'Sin pedidos'
                  : `${selectedCustomer.numberOfOrders} pedidos realizados`}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Información de contacto</p>
              <p className="text-blue-600 dark:text-blue-400">
                {selectedCustomer.email}
              </p>
            </div>
          </div>
        ) : (
          <CustomerCombobox
            customers={customers}
            onCustomerChange={setSelectedCustomer}
          />
        )}
      </CardContent>
    </Card>
  );
};
