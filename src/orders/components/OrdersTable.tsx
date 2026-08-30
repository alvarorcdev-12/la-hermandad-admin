import { Link } from "react-router";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderFinancialStatusBadge } from "./OrderFinancialStatusBadge";
import { OrderStatusBadge } from "./OrderStatusBadge";

import { Formatter } from "@/lib/formatter";
import type { Order } from "../interfaces/order.interface";

interface Props {
  orders: Order[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-10">
            <Checkbox />
          </TableHead>
          <TableHead className="text-muted-foreground">Pedido</TableHead>
          <TableHead className="text-muted-foreground">Fecha</TableHead>
          <TableHead className="text-muted-foreground">Cliente</TableHead>
          <TableHead className="text-muted-foreground text-end">
            Total
          </TableHead>
          <TableHead className="text-muted-foreground pl-10">
            Estado de pago
          </TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground">Items</TableHead>
          <TableHead className="text-muted-foreground">
            Método de pago
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Link
                className="font-medium leading-none hover:underline"
                to={`/orders/${order.id}`}
              >
                {order.name}
              </Link>
            </TableCell>
            <TableCell className="capitalize">
              {Formatter.dateTime(order.createdAt)}
            </TableCell>
            <TableCell>
              <span>
                {order.customer?.firstName} {order.customer?.lastName}
              </span>
            </TableCell>
            <TableCell className="text-end">
              {Formatter.currency(order.totalPrice)}
            </TableCell>
            <TableCell className="pl-10">
              <OrderFinancialStatusBadge status={order.financialStatus} />
            </TableCell>
            <TableCell>
              <OrderStatusBadge status={order.status} />
            </TableCell>
            <TableCell>
              <span>{order.itemCount} Items</span>
            </TableCell>
            <TableCell>
              <span>{"QR"}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
