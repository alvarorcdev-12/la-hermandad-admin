import { Link } from 'react-router';
import { Plus, Tags } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { CategoriesTable } from '@/presentation/components/categories/CategoriesTable';
import { DebouncedSearchInput } from '@/presentation/components/shared/DebouncedSearchInput';
import {
  SortDropdownMenu,
  type SortOption,
} from '@/presentation/components/shared/SortDropdownMenu';

import { useCategoriesPagination } from '@/presentation/hooks/categories/useCategoriesPagination';

const categoriesSortOptions: SortOption[] = [
  {
    label: 'Nombre de la categoría',
    sort: 'name',
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

const CategoriesPage = () => {
  const {
    data,
    isLoading,
    querySort,
    queryDirection,
    handleSortChange,
    handleQueryChange,
  } = useCategoriesPagination();

  return (
    <>
      <div className="flex items-center justify-between">
        <AdminTitle title="Categorías" Icon={Tags} />
        <Link
          to="/admin/categories/new"
          className={buttonVariants({ size: 'sm' })}
        >
          <Plus /> Agregar categoría
        </Link>
      </div>
      <div className="mt-4">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              {/* SearchInput */}
              <DebouncedSearchInput
                className="max-w-sm"
                placeholder="Buscar categoría"
                onQueryChange={handleQueryChange}
              />
              {/* Sort */}
              <SortDropdownMenu
                options={categoriesSortOptions}
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
              <CategoriesTable categories={data?.results || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoriesPage;
