import { Navigate, useNavigate, useParams } from 'react-router';
import { Tag } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { ProductForm } from './ui/ProductForm';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';
import { ProductStatusBadge } from '@/presentation/components/products/ProductStatusBadge';

import { useCategories } from '@/presentation/hooks/categories/useCategories';
import { useProduct } from '@/presentation/hooks/product/useProduct';

import type { Product } from '@/domain/entities/product.entity';

const ProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const isCreating = id === 'new';

  const { data: product, isLoading, isError, mutation } = useProduct(id || '');

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories({ page: 1, limit: 20 });

  const title = isCreating
    ? 'Agregar producto'
    : product?.title || 'Editar producto';

  const handleSubmit = async (
    productForm: Partial<Product> & { categoryId: string | null },
  ) => {
    await mutation.mutateAsync(productForm, {
      onSuccess: (data) => {
        toast.add({
          type: 'success',
          title: 'Producto guardado.',
        });
        navigate(`/admin/products/${data.id}`, { replace: true });
      },
      onError: (err) => {
        console.error(err);
        toast.add({
          type: 'error',
          title: 'Error al guardar producto.',
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products" replace />;
  }

  if (isLoading || isLoadingCategories) {
    return <LoadingScreen />;
  }

  if (!product) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AdminTitle title={title} Icon={Tag} prevHref="/admin/products" />
          {!isCreating && <ProductStatusBadge status={product.status} />}
        </div>
      </div>
      <div className="mt-4">
        <ProductForm
          product={product}
          categories={categoriesData?.results || []}
          isPending={mutation.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProductPage;
