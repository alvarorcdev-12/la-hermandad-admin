import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { ProductDB } from '@/infrastructure/interfaces/products-response.interface';
import type { Product } from '@/domain/entities/product.entity';

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
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getProductByIdAction = async (id: string): Promise<Product> => {
  if (!id) throw new Error('Id is required');
  if (id === 'new') return emptyProduct;

  try {
    const { data } = await laHermandadApi.get<ProductDB>(`/products/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting product with ID: ${id}`);
  }
};
