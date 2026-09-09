import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { CustomersDBResponse } from '@/infrastructure/interfaces/customers-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;

  sort?: string;
  direction?: string;
}

export const getCustomersPaginationAction = async (
  options: Options,
): Promise<CustomersDBResponse> => {
  const { page = 1, limit = 10, q, sort, direction } = options;

  try {
    const { data } = await laHermandadApi.get<CustomersDBResponse>(
      '/customers',
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

    throw new Error('Error getting customers', { cause: error });
  }
};
