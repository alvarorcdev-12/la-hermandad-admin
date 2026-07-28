import { Link } from 'react-router';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Formatter } from '@/lib/formatter';
import type { Category } from '../interfaces/category.interface';

interface Props {
  categories: Category[];
}

export const CategoriesTable = ({ categories }: Props) => {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-10">
            <Checkbox />
          </TableHead>
          <TableHead className="text-muted-foreground">
            Nombre de la categoría
          </TableHead>
          <TableHead className="text-muted-foreground">Productos</TableHead>
          <TableHead className="text-muted-foreground">Creación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Link
                className="font-medium leading-none capitalize hover:underline"
                to={`/admin/customers/${category.id}`}
              >
                {category.name}
              </Link>
            </TableCell>
            <TableCell>1</TableCell>
            <TableCell>{Formatter.dateTime(category.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
