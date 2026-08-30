import { laHermandadApi } from "@/api/la-hermandad-api";
import type { OrdersStats } from "../interfaces/orders-stats.interface";

export const getOrdersStatsAction = async (
  startDate?: string,
  endDate?: string,
) => {
  const { data } = await laHermandadApi.get<OrdersStats>("/orders/stats", {
    params: {
      startDate,
      endDate,
    },
  });

  return data;
};
