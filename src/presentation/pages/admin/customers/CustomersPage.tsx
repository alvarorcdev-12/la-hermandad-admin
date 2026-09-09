import { Link } from 'react-router';
import { Plus, User } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { DebouncedSearchInput } from '@/presentation/components/shared/DebouncedSearchInput';
import {
  SortDropdownMenu,
  type SortOption,
} from '@/presentation/components/shared/SortDropdownMenu';
import { CustomersTable } from '@/presentation/components/customers/CustomersTable';

import { useCustomersPagination } from '@/presentation/hooks/customers/useCustomersPagination';

const customersSortOptions: SortOption[] = [
  {
    label: 'Nombre del cliente',
    sort: 'firstName',
    directions: [
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
    ],
  },
  {
    label: 'Apellido del cliente',
    sort: 'lastName',
    directions: [
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
    ],
  },
  {
    label: 'Email',
    sort: 'email',
    directions: [
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
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

const CustomersPage = () => {
  const {
    data,
    isLoading,
    querySort,
    queryDirection,
    handleSortChange,
    handleQueryChange,
  } = useCustomersPagination();

  return (
    <>
      <div className="flex items-center justify-between">
        <AdminTitle title="Clientes" Icon={User} />
        <Link
          to="/admin/customers/new"
          className={buttonVariants({ size: 'sm' })}
        >
          <Plus /> Agregar cliente
        </Link>
      </div>
      <div className="mt-4">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              {/* SearchInput */}
              <DebouncedSearchInput
                className="max-w-sm"
                placeholder="Buscar cliente"
                onQueryChange={handleQueryChange}
              />
              {/* Sort */}
              <SortDropdownMenu
                options={customersSortOptions}
                querySort={querySort}
                queryDirection={queryDirection}
                onSortChange={handleSortChange}
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <Spinner />
              </div>
            ) : (
              <CustomersTable customers={data?.results || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomersPage;
