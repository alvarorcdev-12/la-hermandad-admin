import { laHermandadApi } from '@/api/la-hermandad-api';
import type { Category } from '../interfaces/category.interface';

const emptyCategory: Category = {
  id: 'new',
  storeId: '',
  name: '',
  description: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getCategoryByIdAction = async (id: string): Promise<Category> => {
  if (!id) {
    throw new Error('Category id is required');
  }
  if (id === 'new') {
    return emptyCategory;
  }
  try {
    const { data } = await laHermandadApi<Category>(`/categories/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error getting category by id', { cause: error });
  }
};
