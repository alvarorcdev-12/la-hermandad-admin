import { laHermandadApi } from '@/api/la-hermandad-api';
import { sleep } from '@/lib/sleep';
import type { CategoriesResponse } from '../interfaces/categories-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;

  sort?: string;
  direction?: string;
}

export const getCategoriesPaginationAction = async (
  options: Options,
): Promise<CategoriesResponse> => {
  await sleep(1500);

  try {
    const { page, limit, q, sort, direction } = options;

    const { data } = await laHermandadApi.get<CategoriesResponse>(
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
    throw error;
  }
};
