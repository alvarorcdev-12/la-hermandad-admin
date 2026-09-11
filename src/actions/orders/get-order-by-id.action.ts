import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { OrderDB } from '@/infrastructure/interfaces/orders-response.interface';

export const getOrderByIdAction = async (id: string) => {
  try {
    const { data } = await laHermandadApi.get<OrderDB>(`/orders/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting order by id: ${id}`);
  }
};
