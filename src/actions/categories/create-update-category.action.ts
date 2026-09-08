import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { Category } from '@/domain/entities/category.entity';
import type { CategoryDB } from '@/infrastructure/interfaces/categories-response.interface';

export const createUpdateCategoryAction = async (
  categoryForm: Partial<Category>,
): Promise<Category> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, createdAt, updatedAt, ...rest } = categoryForm;

  const isCreating = id === 'new';

  try {
    const { data } = await laHermandadApi<CategoryDB>({
      url: isCreating ? '/categories' : `/categories/${id}`,
      method: isCreating ? 'POST' : 'PATCH',
      data: rest,
    });
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error creating or updating category', { cause: error });
  }
};
