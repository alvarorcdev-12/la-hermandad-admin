import type { Product } from "./product.interface";

export interface ProductsResponse {
  meta: Meta;
  results: Product[];
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
