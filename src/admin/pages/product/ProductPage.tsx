import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Archive, ChevronDown, Tag, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { ProductForm } from './ui/ProductForm';
import { useProduct } from '@/products/hooks/useProduct';
import { ProductStatusBadge } from '@/products/components/ProductStatusBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { CustomConfirmDialog } from '@/shared/components/CustomConfirmDialog';
import type { Product } from '@/products/interfaces/product.interface';
import { useCategories } from '@/categories/hooks/useCategories';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    mutation,
    deleteProduct,
  } = useProduct(id || '');

  const { data, isLoading: isCategoriesLoading } = useCategories();

  const title =
    id === 'new' ? 'Agregar producto' : (product?.title ?? 'Editar producto');

  const handleSubmit = async (
    productLike: Partial<Product> & { categoryId: string | null },
  ) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Producto guardado');
        navigate(`/admin/products/${data.id}`, { replace: true });
      },
      onError(error) {
        console.log(error);
        toast.error('Error al guardar producto');
      },
    });
  };

  const handleDeleteProduct = async (id: string) => {
    const isDeleted = await deleteProduct(id);
    if (!isDeleted) {
      toast.error('Error al eliminar el producto');
      return;
    }
    setOpen(false);
    navigate('/admin/products');
    toast.success('Producto eliminado');
  };

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading || isCategoriesLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AdminTitle title={title} Icon={Tag} prevHref="/admin/products" />
            {id !== 'new' && <ProductStatusBadge status={product.status} />}
          </div>
          {id !== 'new' && (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                Más acciones
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52" align="center">
                <DropdownMenuItem>
                  <Archive /> Archivar producto
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setOpen(true)}
                >
                  <Trash /> Eliminar producto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="mt-3">
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            isPending={mutation.isPending}
            categories={data?.results || []}
          />
        </div>
      </div>
      <CustomConfirmDialog
        className="sm:max-w-xl"
        open={open}
        onOpenChange={setOpen}
        title={`¿Eliminar ${product.title}?`}
        description={`Si eliminas ${product.title}, esto no se puede deshacer.`}
        onAction={() => handleDeleteProduct(product.id)}
        actionText="Eliminar producto"
      />
    </>
  );
};

export default ProductPage;
