import { useState } from 'react';
import { Image, TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DebouncedSearchInput } from '../shared/DebouncedSearchInput';

import { cn } from '@/lib/utils';

import { Formatter } from '@/utils/formatter';

import { useProducts } from '@/presentation/hooks/products/useProducts';

import type { CartItem } from '@/presentation/store/cart.store';
import type { Product } from '@/domain/entities/product.entity';

const items = [
  { label: 'Todo', value: null },
  { label: 'Activo', value: 'ACTIVE' },
  { label: 'Borrador', value: 'DRAFT' },
  { label: 'Archivado', value: 'ARCHIVED' },
];

interface Props {
  open: boolean;
  alreadySelectedIds: string[];
  onAddItems: (items: CartItem[]) => void;
  onOpenChange: (open: boolean) => void;
}

export const ProductPickerDialog = ({
  open,
  alreadySelectedIds,
  onAddItems,
  onOpenChange,
}: Props) => {
  const [status, setStatus] = useState<'ACTIVE' | 'DRAFT' | 'ARCHIVED' | null>(
    null,
  );

  const [search, setSearch] = useState<string>('');

  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);

  const { data, isLoading } = useProducts({
    page: 1,
    limit: 10,
    status: status ?? undefined,
    q: search,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleToggleProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((item) => item.productId === product.id);
      if (exists) {
        return prev.filter((item) => item.productId !== product.id);
      }

      const cartItem: CartItem = {
        price: product.price,
        productId: product.id,
        quantity: 1,
        title: product.title,
      };

      return [...prev, cartItem];
    });
  };

  const handleAdd = () => {
    onAddItems(selectedProducts);
    onOpenChange(false);
    setSearch('');
    setStatus(null);
    setSelectedProducts([]);
  };

  const products = data?.results || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="pt-4 px-4">
          <DialogTitle>Seleccionar productos</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 px-4">
          <DebouncedSearchInput
            className="w-full"
            placeholder="Buscar productos"
            onQueryChange={handleSearch}
          />
          {/* FIlter por estado */}
          <Select
            items={items}
            value={status}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Buscar por</SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="border-t min-h-110">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-muted-foreground text-xs pl-4">
                  Producto
                </TableHead>
                <TableHead className="text-muted-foreground text-xs text-right">
                  Disponible
                </TableHead>
                <TableHead className="text-muted-foreground text-xs text-right pr-4">
                  Precio
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !data && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
                    <div className="flex items-center justify-center">
                      <Spinner />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && data?.results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
                    <div className="flex items-center justify-center">
                      <p className="text-muted-foreground">
                        No se encontraron productos
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {products.map((product) => {
                const isAlreadyInOrder = alreadySelectedIds.includes(
                  product.id,
                );
                const isSelectedLocally = selectedProducts.some(
                  (item) => item.productId === product.id,
                );

                const isChecked = isAlreadyInOrder || isSelectedLocally;
                return (
                  <TableRow
                    key={product.id}
                    className={cn(
                      isAlreadyInOrder
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-muted/50',
                      isSelectedLocally && 'bg-muted/50',
                    )}
                    onClick={() =>
                      !isAlreadyInOrder && handleToggleProduct(product)
                    }
                  >
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={isChecked}
                          disabled={isAlreadyInOrder}
                        />
                        <div className="flex items-center justify-center rounded-sm border w-9 h-9 dark:bg-muted">
                          <Image className="text-muted-foreground size-4" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p
                            className={`font-medium select-none leading-none ${isAlreadyInOrder ? 'text-muted-foreground' : ''}`}
                          >
                            {product.title}
                          </p>
                          {isAlreadyInOrder && (
                            <p className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">
                              Artículo ya agregado
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {product.inventoryQuantity < 5 && (
                          <TriangleAlert className="text-yellow-600 dark:text-yellow-400 size-4" />
                        )}
                        <span>{product.inventoryQuantity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      {Formatter.currency(product.price)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="m-0">
          <div className="flex flex-1 items-center justify-between">
            <Button variant="outline" disabled={selectedProducts.length === 0}>
              {selectedProducts.length}/500 productos seleccionados
            </Button>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  setSearch('');
                  setStatus(null);
                  setSelectedProducts([]);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAdd}
                disabled={selectedProducts.length === 0}
              >
                Agregar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
