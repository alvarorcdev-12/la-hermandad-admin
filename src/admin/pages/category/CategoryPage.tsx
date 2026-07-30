import { Navigate, useNavigate, useParams } from 'react-router';
import { Tags } from 'lucide-react';
import { toast } from 'sonner';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CategoryForm } from './ui/CategoryForm';
import { useCategory } from '@/categories/hooks/useCategory';
import type { Category } from '@/categories/interfaces/category.interface';

const CategoryPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    isError,
    mutation,
  } = useCategory(id || '');

  const title = id === 'new' ? 'Nueva categoría' : category?.name || 'Editar categoría';

  const handleSubmit = async (categoryLike: Partial<Category>) => {
    await mutation.mutateAsync(categoryLike, {
      onSuccess: (data) => {
        navigate(`/admin/categories/${data.id}`, { replace: true });
        toast.success('Categoría guardada');
      },
      onError: (error) => {
        console.error('Error al crear/actualizar la categoría:', error);
        toast.error('Error al guardar la categoría');
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/categories" replace />;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!category) {
    return <Navigate to="/admin/categories" replace />;
  }

  return (
    <div className="max-w-3xl w-full mx-auto">
      <AdminTitle
        title={title}
        Icon={Tags}
        prevHref="/admin/categories"
      />
      <div className="mt-3">
        <CategoryForm
          category={category}
          onSubmit={handleSubmit}
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
