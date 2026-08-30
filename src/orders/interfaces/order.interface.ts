export interface Order {
  id: string;
  number: number;
  name: string;
  itemCount: number;
  subtotalPrice: string;
  totalPrice: string;
  email: string | null;
  phone: string | null;
  financialStatus: string;
  status: string;
  cancelledAt: Date | null;
  cancelReason: string | null;
  closedAt: Date | null;
  paidAt: Date | null;
  createdAt: Date;
  updateAt: Date;
  items: Item[];
  customer: Customer;
}

export interface Customer {
  id: string;
  storeId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
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
