import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { Category } from '@/domain/entities/category.entity';
import type { CategoryDB } from '@/infrastructure/interfaces/categories-response.interface';

const emptyCategory: Category = {
  id: 'new',
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
    const { data } = await laHermandadApi<CategoryDB>(`/categories/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting category by id : ${id}`, { cause: error });
  }
};
