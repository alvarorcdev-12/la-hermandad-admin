import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { ProductsDBResponse } from '@/infrastructure/interfaces/products-response.interface';

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
): Promise<ProductsDBResponse> => {
  // await sleep(1500);

  try {
    const { page, limit, q, status, sort, direction } = options;

    const { data } = await laHermandadApi.get<ProductsDBResponse>('/products', {
      params: {
        page,
        limit,
        q,
        status: status?.toUpperCase(),
        sort,
        direction,
      },
    });
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error getting products pagination', { cause: error });
  }
};
