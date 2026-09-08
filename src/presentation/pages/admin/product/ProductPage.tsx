import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Archive, ChevronDown, Tag, Trash } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { ProductForm } from './ui/ProductForm';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';
import { ProductStatusBadge } from '@/presentation/components/products/ProductStatusBadge';

import { useCategories } from '@/presentation/hooks/categories/useCategories';
import { useProduct } from '@/presentation/hooks/product/useProduct';

import { CustomConfirmDialog } from '@/presentation/components/shared/CustomConfirmDialog';

import type { Product } from '@/domain/entities/product.entity';

type ProductAction = 'archived' | 'delete';

const getActionConfig = (action: ProductAction, productTitle: string) => {
  switch (action) {
    case 'archived':
      return {
        title: `¿Archivar ${productTitle}?`,
        description: `Si archivas ${productTitle}, no podrás verlo en la tienda.`,
        actionText: 'Archivar producto',
      };
    case 'delete':
      return {
        title: `¿Eliminar ${productTitle}?`,
        description: `Si eliminas ${productTitle}, esto no se puede deshacer.`,
        actionText: 'Eliminar producto',
      };
  }
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ProductAction>('delete');

  const isCreating = id === 'new';

  const {
    data: product,
    isLoading,
    isError,
    mutation,
    deleteMutation,
  } = useProduct(id || '');

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

  const handleConfirmAction = async () => {
    try {
      if (selectedAction === 'archived') {
        // Lógica para archivar (ej: mutation.mutateAsync({ status: 'ARCHIVED' }))
        console.log('Archivando...');
        return;
      }

      const isDeleted = await deleteMutation.mutateAsync();
      if (!isDeleted) {
        toast.add({
          type: 'error',
          title: 'Error al eliminar el producto',
        });
        return;
      }
      setOpenDialog(false);
      toast.add({
        type: 'success',
        title: 'Producto eliminado',
      });
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      toast.add({ type: 'error', title: 'Ocurrió un error.' });
    }
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

  const dialogConfig = getActionConfig(selectedAction, product.title);

  return (
    <>
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AdminTitle title={title} Icon={Tag} prevHref="/admin/products" />
            {!isCreating && <ProductStatusBadge status={product.status} />}
          </div>
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
                onClick={() => {
                  setSelectedAction('archived');
                  setOpenDialog(true);
                }}
              >
                <Archive /> Archivar producto
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  setSelectedAction('delete');
                  setOpenDialog(true);
                }}
              >
                <Trash /> Eliminar producto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <CustomConfirmDialog
        className="sm:max-w-xl"
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={dialogConfig.title}
        description={dialogConfig.description}
        onAction={handleConfirmAction}
        actionText={dialogConfig.actionText}
      />
    </>
  );
};

export default ProductPage;
