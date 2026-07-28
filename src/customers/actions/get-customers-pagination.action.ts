import { laHermandadApi } from '@/api/la-hermandad-api';
import { sleep } from '@/lib/sleep';
import type { CustomersResponse } from '../interfaces/customers-response.action';
interface Options {
  page?: number;
  limit?: number;
  q?: string;

  sort?: string;
  direction?: string;
}

export const getCustomersPaginationAction = async (
  options: Options,
): Promise<CustomersResponse> => {
  await sleep(1500);

  try {
    const { page, limit, q, sort, direction } = options;

    const { data } = await laHermandadApi.get<CustomersResponse>('/customers', {
      params: {
        page,
        limit,
        q,

        sort,
        direction,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
