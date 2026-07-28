import { Link, useSearchParams } from 'react-router';
import { Plus, User } from 'lucide-react';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { DataSort, type SortOption } from '@/shared/components/DataSort';
import { CustomersTable } from '@/customers/components/CustomersTable';
import { SearchInput } from '@/shared/components/SearchInput';
import { useCustomers } from '@/customers/hooks/useCustomers';
import { Spinner } from '@/components/ui/spinner';
import { DataEmptyState } from '@/shared/components/DataEmptyState';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, q } = useCustomers();

  const handleSearchCustomer = (query: string) => {
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
        <AdminTitle title="Clientes" Icon={User} />
        <Link
          to="/admin/customers/new"
          className={buttonVariants({ size: 'sm' })}
        >
          <Plus /> Agregar cliente
        </Link>
      </div>
      <div className="mt-3">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex justify-between items-center gap-2 border-b">
              <SearchInput
                className="max-w-xs"
                placeholder="Buscar cliente"
                query={q}
                onQueryChange={handleSearchCustomer}
              />
              <DataSort options={customersSortOptions} />
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-24">
                <Spinner />
              </div>
            ) : data?.results && data.results.length > 0 ? (
              <CustomersTable customers={data?.results || []} />
            ) : (
              <DataEmptyState title="No se encontraron clientes" />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomersPage;
