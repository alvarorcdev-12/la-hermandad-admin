import { laHermandadApi } from '@/api/la-hermandad-api';
import { sleep } from '@/lib/sleep';
import type { ProductsResponse } from '../interfaces/products-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  sort?: string;
  direction?: string;
}

export const getProductsPaginationAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  await sleep(1500);

  try {
    const { page, limit, q, status, sort, direction } = options;

    const { data } = await laHermandadApi.get<ProductsResponse>('/products', {
      params: {
        page,
        limit,
        q,
        status,
        sort,
        direction,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
