import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import { sleep } from '@/utils/sleep';

import type { OrdersStatsResponse } from '@/infrastructure/interfaces/orders-stats-response.interface';

export const getOrdersStatsAction = async (
  startDate?: string,
  endDate?: string,
) => {
  await sleep(1500);

  const { data } = await laHermandadApi.get<OrdersStatsResponse>(
    '/orders/stats',
    {
      params: {
        startDate,
        endDate,
      },
    },
  );

  return data;
};
