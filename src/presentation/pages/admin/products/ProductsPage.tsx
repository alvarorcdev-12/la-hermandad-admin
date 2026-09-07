import { Link } from 'react-router';
import { Plus, Tag } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { DebouncedSearchInput } from '@/presentation/components/shared/DebouncedSearchInput';
import { ProductsTable } from '@/presentation/components/products/ProductsTable';
import {
  SortDropdownMenu,
  type SortOption,
} from '@/presentation/components/shared/SortDropdownMenu';
import { StatusFilterButtons } from '@/presentation/components/shared/StatusFilterButtons';

import { useProductsPagination } from '@/presentation/hooks/products/useProductsPagination';

const productsSortOptions: SortOption[] = [
  {
    label: 'Nombre del producto',
    sort: 'title',
    directions: [
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
    ],
  },
  {
    label: 'Inventario',
    sort: 'inventoryQuantity',
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

const ProductsPage = () => {
  const {
    data,
    isLoading,
    queryStatus,
    querySort,
    queryDirection,
    handleStatusChange,
    handleQueryChange,
    handleSortChange,
  } = useProductsPagination();
  return (
    <>
      <div className="flex items-center justify-between">
        <AdminTitle title="Productos" Icon={Tag} />
        <Link
          to="/admin/products/new"
          className={buttonVariants({ size: 'sm' })}
        >
          <Plus /> Agregar producto
        </Link>
      </div>
      <div className="mt-4">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              <StatusFilterButtons
                options={[
                  { label: 'Todos', value: undefined },
                  { label: 'Activos', value: 'active' },
                  { label: 'Borrador', value: 'draft' },
                  { label: 'Archivado', value: 'archived' },
                ]}
                currentStatus={queryStatus}
                onStatusChange={handleStatusChange}
              />
              <div className="flex items-center gap-2">
                {/* SearchInput */}
                <DebouncedSearchInput
                  placeholder="Buscar producto"
                  onQueryChange={handleQueryChange}
                />
                {/* Sort */}
                <SortDropdownMenu
                  options={productsSortOptions}
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
              <ProductsTable products={data?.results || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsPage;
