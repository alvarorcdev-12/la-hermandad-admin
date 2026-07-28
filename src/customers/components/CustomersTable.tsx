import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Customer } from '../interfaces/customer.interface';
import { Formatter } from '@/lib/formatter';
import { Link } from 'react-router';

interface Props {
  customers: Customer[];
}

export const CustomersTable = ({ customers }: Props) => {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-10">
            <Checkbox />
          </TableHead>
          <TableHead className="text-muted-foreground">
            Nombre del cliente
          </TableHead>
          <TableHead className="text-muted-foreground">Teléfono</TableHead>
          <TableHead className="text-muted-foreground">
            Fecha de creación
          </TableHead>
          <TableHead className="text-muted-foreground">Pedidos</TableHead>
          <TableHead className="text-muted-foreground">
            Importe gastado
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Link
                className="font-medium leading-none hover:underline"
                to={`/admin/customers/${customer.id}`}
              >
                {customer.displayName}
              </Link>
            </TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>
              <span>{Formatter.dateTime(customer.createdAt)}</span>
            </TableCell>
            <TableCell>{customer.numberOfOrders}</TableCell>
            <TableCell>
              <span>{Formatter.currency(customer.amountSpent)}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
