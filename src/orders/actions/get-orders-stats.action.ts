import { laHermandadApi } from "@/api/la-hermandad-api";
import type { OrdersStats } from "../interfaces/orders-stats.interface";
import { sleep } from "@/lib/sleep";

export const getOrdersStatsAction = async (
  startDate?: string,
  endDate?: string,
) => {
  await sleep(1500);

  const { data } = await laHermandadApi.get<OrdersStats>("/orders/stats", {
    params: {
      startDate,
      endDate,
    },
  });

  return data;
};
