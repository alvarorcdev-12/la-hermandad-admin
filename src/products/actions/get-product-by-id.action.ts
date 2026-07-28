import { laHermandadApi } from '@/api/la-hermandad-api';
import type { Product } from '../interfaces/product.interface';

const emptyProduct: Product & { categoryId: string | null } = {
  id: 'new',
  title: '',
  description: null,
  price: '',
  trackInventory: true,
  inventoryQuantity: 0,
  sku: null,
  status: 'ACTIVE',
  category: null,
  compareAtPrice: null,
  costPrice: null,
  categoryId: null,
};

export const getProductByIdAction = async (id: string): Promise<Product> => {
  if (!id) throw new Error('Id is required');
  if (id === 'new') return emptyProduct;

  try {
    const { data } = await laHermandadApi.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al obtener el producto ${id}`);
  }
};
