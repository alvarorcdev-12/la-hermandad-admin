import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { CreateOrderPayload } from '@/infrastructure/interfaces/create-order-payload.interface';
import type { OrderDB } from '@/infrastructure/interfaces/orders-response.interface';

export const createOrderAction = async (payload: CreateOrderPayload) => {
  try {
    const { data } = await laHermandadApi.post<OrderDB>('/orders', payload);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error creating order', { cause: error });
  }
};
