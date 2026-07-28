import { laHermandadApi } from '@/api/la-hermandad-api';
import type { Product } from '../interfaces/product.interface';

export const deleteProductByIdAction = async (id: string): Promise<boolean> => {
  try {
    await laHermandadApi.delete<Product>(`/products/${id}`);
    return true;
  } catch (error) {
    console.log({ error });
    throw new Error('Error deleting the product');
  }
};
