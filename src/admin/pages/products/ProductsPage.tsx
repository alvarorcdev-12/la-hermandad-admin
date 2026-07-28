import { Link, useSearchParams } from 'react-router';
import { Plus, Tag } from 'lucide-react';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataStatusFilter } from '@/shared/components/DataStatusFilter';
import { DataSort, type SortOption } from '@/shared/components/DataSort';
import { ProductsTable } from '@/products/components/ProductsTable';
import { SearchInput } from '@/shared/components/SearchInput';
import { useProducts } from '@/products/hooks/useProducts';
import { DataEmptyState } from '@/shared/components/DataEmptyState';
import { Spinner } from '@/components/ui/spinner';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useProducts();

  const query = searchParams.get('q') || '';

  const handleSearchProduct = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query && query.length > 0) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    setSearchParams(params);
  };

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
      <div className="mt-3">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              <DataStatusFilter
                options={[
                  { value: undefined, label: 'Todos' },
                  { value: 'ACTIVE', label: 'Activos' },
                  { value: 'DRAFT', label: 'Borrador' },
                  { value: 'ARCHIVED', label: 'Archivados' },
                ]}
              />
              <div className="flex items-center gap-2">
                <SearchInput
                  className="max-w-xs"
                  placeholder="Buscar producto"
                  query={query}
                  onQueryChange={handleSearchProduct}
                />

                <DataSort options={productsSortOptions} />
              </div>
            </div>
            {/* TODO: Mejorar el isLoading */}
            {isLoading ? (
              <div className="flex items-center justify-center h-24">
                <Spinner />
              </div>
            ) : data?.results && data.results.length > 0 ? (
              <ProductsTable products={data?.results || []} />
            ) : (
              <DataEmptyState title="No se encontraron productos" />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsPage;
