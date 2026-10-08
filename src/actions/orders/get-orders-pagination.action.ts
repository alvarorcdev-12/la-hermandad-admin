import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import { OrderMapper } from '@/infrastructure/mappers/order.mapper';

import type { Order } from '@/domain/entities/order.entity';
import type { OrdersDBResponse } from '@/infrastructure/interfaces/orders-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  sort?: string;
  direction?: string;
}

export const getOrdersPaginationAction = async (
  options: Options,
): Promise<Order[]> => {
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

    return OrderMapper.orderDBToEntityList(data.results);
  } catch (error) {
    console.log({ error });
    throw new Error('Error getting orders', { cause: error });
  }
};
