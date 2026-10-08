export interface OrdersDBResponse {
  meta: Meta;
  results: OrderDB[];
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OrderDB {
  id: string;
  number: number;
  name: string;
  itemCount: number;
  subtotalPrice: string;
  totalPrice: string;
  email: string;
  phone: string;
  financialStatus: string;
  status: string;
  cancelledAt: Date | null;
  cancelReason: string | null;
  closedAt: Date | null;
  paidAt: Date | null;
  createdAt: Date;
  updateAt: Date;
  items: Item[];
  customer: Customer | null;
}

export interface Customer {
  id: string;
  storeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  sku: string | null;
}
