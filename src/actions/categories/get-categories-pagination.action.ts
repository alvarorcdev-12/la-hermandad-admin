import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { CategoriesDBResponse } from '@/infrastructure/interfaces/categories-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
  direction?: string;
}

export const getCategoriesPaginationAction = async (
  options: Options,
): Promise<CategoriesDBResponse> => {
  // await sleep(1500);

  try {
    const { page, limit, q, sort, direction } = options;

    const { data } = await laHermandadApi.get<CategoriesDBResponse>(
      '/categories',
      {
        params: {
          page,
          limit,
          q,
          sort,
          direction,
        },
      },
    );
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error getting categories', { cause: error });
  }
};
