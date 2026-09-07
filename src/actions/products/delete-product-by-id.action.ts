import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { ProductDB } from '@/infrastructure/interfaces/products-response.interface';

export const deleteProductByIdAction = async (id: string): Promise<boolean> => {
  try {
    await laHermandadApi.delete<ProductDB>(`/products/${id}`);
    return true;
  } catch (error) {
    console.log({ error });
    throw new Error('Error deleting the product');
  }
};
