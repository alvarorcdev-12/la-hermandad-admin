import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ChevronDown, Tags, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { CustomConfirmDialog } from '@/presentation/components/shared/CustomConfirmDialog';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';
import { CategoryForm } from './ui/CategoryForm';

import { useCategory } from '@/presentation/hooks/category/useCategory';

import type { Category } from '@/domain/entities/category.entity';

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    isError,
    mutation,
  } = useCategory(id || '');

  const [openDialog, setOpenDialog] = useState(false);

  const isCreating = id === 'new';

  const title = isCreating
    ? 'Agregar categoría'
    : category?.name || 'Editar categoría';

  const handleSubmit = async (categoryForm: Partial<Category>) => {
    await mutation.mutateAsync(categoryForm, {
      onSuccess: (category) => {
        toast.add({
          type: 'success',
          title: 'Categoría guardada',
        });
        navigate(`/admin/categories/${category.id}`, { replace: true });
      },
      onError: () => {
        toast.add({
          type: 'error',
          title: 'Error al guardar categoría',
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/categories" replace />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!category) {
    return <Navigate to="/admin/categories" replace />;
  }

  return (
    <>
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-between">
          <AdminTitle title={title} Icon={Tags} prevHref="/admin/categories" />
          {!isCreating && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="sm">
                    Más acciones
                    <ChevronDown />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-48" align="center">
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  <Trash /> Eliminar categoría
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="mt-4">
          <CategoryForm
            category={category}
            isPending={mutation.isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <CustomConfirmDialog
        className="sm:max-w-xl"
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={`¿Eliminar ${category.name}?`}
        description={`Si eliminas ${category.name}, esto no se puede deshacer.`}
        onAction={() => {}}
        actionText="Eliminar categoría"
      />
    </>
  );
};

export default CategoryPage;
