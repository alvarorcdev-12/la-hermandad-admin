import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import { OrderMapper } from '@/infrastructure/mappers/order.mapper';

import type { Order } from '@/domain/entities/order.entity';
import type { OrderDB } from '@/infrastructure/interfaces/orders-response.interface';

export const getOrderByIdAction = async (id: string): Promise<Order> => {
  try {
    const { data } = await laHermandadApi.get<OrderDB>(`/orders/${id}`);

    return OrderMapper.orderDBToEntity(data);
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting order by id: ${id}`);
  }
};
