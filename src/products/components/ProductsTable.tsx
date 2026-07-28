import { Link } from 'react-router';
import { Image } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductStatusBadge } from './ProductStatusBadge';
import type { Product } from '../interfaces/product.interface';

interface Props {
  products: Product[];
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-10">
            <Checkbox />
          </TableHead>
          <TableHead className="text-muted-foreground">Producto</TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground">Inventario</TableHead>
          <TableHead className="text-muted-foreground">Categoría</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-sm border w-9 h-9 dark:bg-muted">
                  <Image className="text-muted-foreground size-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="font-medium leading-none hover:underline"
                  >
                    {product.title}
                  </Link>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <ProductStatusBadge status={product.status} />
            </TableCell>
            <TableCell>
              <span>
                {!product.trackInventory
                  ? 'No se hace seguimiento del inventario'
                  : `${product.inventoryQuantity} en existencias`}
              </span>
            </TableCell>
            <TableCell>
              <span className="capitalize">
                {product.category?.name ?? 'Sin categoría'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
