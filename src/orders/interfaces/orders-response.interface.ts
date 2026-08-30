import type { Order } from "./order.interface";

export interface OrdersResponse {
  meta: Meta;
  results: Order[];
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
