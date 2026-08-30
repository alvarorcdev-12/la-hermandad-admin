import { laHermandadApi } from "@/api/la-hermandad-api";
import type { OrdersResponse } from "../interfaces/orders-response.interface";

interface Options {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  sort?: string;
  direction?: string;
}

export const getOrdersPaginationPaginationAction = async (options: Options) => {
  const { page = 1, limit = 10, q, status, sort, direction } = options;
  try {
    const { data } = await laHermandadApi.get<OrdersResponse>("/orders", {
      params: {
        page,
        limit,
        ...(q && { q }),
        status,
        ...(sort && { sort }),
        ...(direction && { direction }),
      },
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error("Error getting orders", { cause: error });
  }
};
