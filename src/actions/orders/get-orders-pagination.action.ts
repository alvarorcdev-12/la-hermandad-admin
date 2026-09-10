import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { OrdersDBResponse } from '@/infrastructure/interfaces/orders-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  sort?: string;
  direction?: string;
}

export const getOrdersPaginationAction = async (options: Options) => {
  const { page = 1, limit = 10, q, status, sort, direction } = options;
  try {
    const { data } = await laHermandadApi.get<OrdersDBResponse>('/orders', {
      params: {
        page,
        limit,
        ...(q && { q }),
        status: status ? status.toUpperCase() : status,
        ...(sort && { sort }),
        ...(direction && { direction }),
      },
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error getting orders', { cause: error });
  }
};
