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

// interface Props {
//   customers: Customer[];
// }

export const OrdersTable = () => {
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
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            <Link
              className="font-medium leading-none hover:underline"
              to="/orders/1231"
            >
              #1001
            </Link>
          </TableCell>
          <TableCell className="capitalize">
            {Formatter.dateTime(new Date())}
          </TableCell>
          <TableCell>
            <span>Juan Carlos Perez</span>
          </TableCell>
          <TableCell className="text-end">
            {Formatter.currency("120.00")}
          </TableCell>
          <TableCell className="pl-10">
            <OrderFinancialStatusBadge status="PAID" />
          </TableCell>
          <TableCell>
            <OrderStatusBadge status="CLOSED" />
          </TableCell>
          <TableCell>
            <span>3 Items</span>
          </TableCell>
          <TableCell>
            <span>QR</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            <Link
              className="font-medium leading-none hover:underline"
              to="/orders/1231"
            >
              #1002
            </Link>
          </TableCell>
          <TableCell className="capitalize">
            {Formatter.dateTime(new Date())}
          </TableCell>
          <TableCell>
            <span>Alvaro Sanchez</span>
          </TableCell>
          <TableCell className="text-end">
            {Formatter.currency("120.00")}
          </TableCell>
          <TableCell className="pl-10">
            <OrderFinancialStatusBadge status="PARTIALLY_PAID" />
          </TableCell>
          <TableCell>
            <OrderStatusBadge status="OPEN" />
          </TableCell>
          <TableCell>
            <span>5 Items</span>
          </TableCell>
          <TableCell>
            <span>QR</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
