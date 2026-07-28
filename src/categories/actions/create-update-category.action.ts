import { laHermandadApi } from '@/api/la-hermandad-api';
import type { Category } from '../interfaces/category.interface';

export const createUpdateCategoryAction = async (
  categoryLike: Partial<Category>,
): Promise<Category> => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, storeId, createdAt, updatedAt, ...rest } = categoryLike;

  const isCreating = id === 'new';

  try {
    const { data } = await laHermandadApi<Category>({
      url: isCreating ? '/categories' : `/categories/${id}`,
      method: isCreating ? 'POST' : 'PATCH',
      data: rest,
    });
    return data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
