import { Navigate, useNavigate, useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Tag } from 'lucide-react';

import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { toast } from '@/components/ui/toast';
import { ProductStatusBadge } from '@/presentation/components/products/ProductStatusBadge';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';
import { ProductForm } from './ui/ProductForm';
import { getProductByIdAction } from '@/actions/products/get-product-by-id.action';
import { createUpdateProductAction } from '@/actions/products/create-update-product.action';

import type { Product } from '@/domain/entities/product.entity';

const ProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
  });

  const handleSubmit = async (
    productForm: Partial<Product> & { categoryId: string | null },
  ) => {
    await mutation.mutateAsync(productForm, {
      onSuccess: (data) => {
        toast.add({
          type: 'success',
          title: 'Producto guardado.',
          positionerProps: {
            align: 'center',
            side: 'bottom',
          },
        });
        navigate(`/admin/products/${data.id}`, { replace: true });
      },
      onError: (err) => {
        console.error(err);
        toast.add({
          type: 'error',
          title: 'Error al guardar producto.',
          positionerProps: {
            align: 'center',
            side: 'bottom',
          },
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products" replace />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AdminTitle
            title="Agregar producto"
            Icon={Tag}
            prevHref="/admin/products"
          />
          <ProductStatusBadge status="ACTIVE" />
        </div>
      </div>
      <div className="mt-4">
        <ProductForm
          product={product}
          categories={[]}
          isPending={false}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProductPage;
