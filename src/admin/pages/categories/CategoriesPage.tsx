import { Link } from 'react-router';
import { Plus, Tags } from 'lucide-react';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CategoriesTable } from '@/categories/components/CategoriesTable';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { DataEmptyState } from '@/shared/components/DataEmptyState';
import { DataSort, type SortOption } from '@/shared/components/DataSort';
import { SearchInput } from '@/shared/components/SearchInput';
import { useCategories } from '@/categories/hooks/useCategories';

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
  const { data, isLoading, q: query, handleSearchCategory } = useCategories();

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
      <div className="mt-3">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="p-2 flex items-center justify-between border-b">
              <SearchInput
                className="max-w-xs"
                placeholder="Buscar categoría"
                query={query}
                onQueryChange={handleSearchCategory}
              />

              <DataSort options={categoriesSortOptions} />
            </div>
            {/* TODO: Mejorar el isLoading */}
            {isLoading ? (
              <div className="flex items-center justify-center h-24">
                <Spinner />
              </div>
            ) : data?.results && data.results.length > 0 ? (
              <CategoriesTable categories={data.results || []} />
            ) : (
              <DataEmptyState title="No se encontraron categorías" />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoriesPage;
