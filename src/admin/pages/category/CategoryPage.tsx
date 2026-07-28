import { Tags } from 'lucide-react';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CategoryForm } from './ui/CategoryForm';
import { Navigate, useParams } from 'react-router';
import { useCategory } from '@/categories/hooks/useCategory';
import type { Category } from '@/categories/interfaces/category.interface';

const CategoryPage = () => {
  const { id } = useParams();

  const { data: category, isLoading, isError } = useCategory(id || '');

  const handleSubmit = (category: Partial<Category>) => {
    console.log('handleSubmit', category);
  };

  if (isError) {
    return <Navigate to="/admin/categories" replace />;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!category) {
    return <Navigate to="/admin/categories" replace />;
  }

  return (
    <div className="max-w-3xl w-full mx-auto">
      <AdminTitle
        title="Nueva categoría"
        Icon={Tags}
        prevHref="/admin/categories"
      />
      <div className="mt-3">
        <CategoryForm category={category} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CategoryPage;
