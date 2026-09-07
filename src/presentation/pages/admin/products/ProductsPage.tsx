import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
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

import { getProductsPaginationAction } from '@/actions/products/get-products-pagination.action';

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

  const queryStatus = searchParams.get('status') || undefined;
  const querySort = searchParams.get('sort') ?? 'createdAt';
  const queryDirection = searchParams.get('direction') ?? 'desc';
  const querySearch = searchParams.get('q') || undefined;

  const { data, isLoading } = useQuery({
    queryKey: [
      'products',
      {
        page: 1,
        limit: 10,
        status: queryStatus,
        sort: querySort,
        direction: queryDirection,
        q: querySearch,
      },
    ],
    queryFn: () =>
      getProductsPaginationAction({
        page: 1,
        limit: 10,
        status: queryStatus,
        sort: querySort,
        direction: queryDirection,
        q: querySearch,
      }),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const handleStatusChange = (status: string | undefined) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (status) {
        params.set('status', status);
      } else {
        params.delete('status');
      }

      params.set('page', '1');

      return params;
    });
  };

  const handleSortChange = (sort: string, direction: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set('sort', sort);
      params.set('direction', direction);

      params.set('page', '1');

      return params;
    });
  };

  const handleQueryChange = useCallback(
    (query: string) => {
      setSearchParams((prevParams) => {
        const urlSearchParams = new URLSearchParams(prevParams);

        const currentQ = urlSearchParams.get('q') || '';

        if (currentQ === query) {
          return prevParams;
        }

        if (query && query.length > 0) {
          urlSearchParams.set('q', query);
        } else {
          urlSearchParams.delete('q');
        }

        urlSearchParams.set('page', '1');

        return urlSearchParams;
      });
    },
    [setSearchParams],
  );

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
