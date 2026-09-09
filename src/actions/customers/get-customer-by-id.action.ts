import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { CustomerDB } from '@/infrastructure/interfaces/customers-response.interface';
import type { Customer } from '@/domain/entities/customer.entity';

const emptyCustomer: Customer = {
  id: 'new',
  displayName: '',
  firstName: '',
  lastName: null,
  email: null,
  phone: null,
  note: null,
  amountSpent: '0',
  lastOrder: null,
  numberOfOrders: 0,
  canDelete: false,
  createdAt: new Date(),
};

export const getCustomerByIdAction = async (id: string): Promise<Customer> => {
  if (id === 'new') {
    return emptyCustomer;
  }

  try {
    const { data } = await laHermandadApi.get<CustomerDB>(`/customers/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting customer with id: ${id}`, { cause: error });
  }
};
