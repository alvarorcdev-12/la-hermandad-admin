import { laHermandadApi } from '@/api/la-hermandad-api';
import type { Customer } from '../interfaces/customer.interface';
import { sleep } from '@/lib/sleep';

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
  await sleep(1500);

  if (id === 'new') {
    return emptyCustomer;
  }

  try {
    const { data } = await laHermandadApi.get<Customer>(`/customers/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting customer with id: ${id}`);
  }
};
