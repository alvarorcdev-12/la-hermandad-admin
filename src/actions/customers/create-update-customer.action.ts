// oxlint-disable no-unused-vars
import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { CustomerDB } from '@/infrastructure/interfaces/customers-response.interface';
import type { Customer } from '@/domain/entities/customer.entity';

export const createUpdateCustomerAction = async (
  customerForm: Partial<Customer>,
): Promise<Customer> => {
  console.log('🚀 ~ createUpdateCustomerAction ~ customerForm:', customerForm);
  // await sleep(1500);

  const {
    id,
    displayName,
    amountSpent,
    canDelete,
    createdAt,
    lastOrder,
    numberOfOrders,
    ...rest
  } = customerForm;

  const isCrating = id === 'new';

  const phone = rest.phone
    ? rest.phone.startsWith('+')
      ? rest.phone
      : `+591${rest.phone}`
    : null;

  const email = rest.email ?? null;

  try {
    const { data } = await laHermandadApi<CustomerDB>({
      url: isCrating ? '/customers' : `/customers/${id}`,
      method: isCrating ? 'POST' : 'PATCH',
      data: {
        ...rest,
        phone,
        email,
      },
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error saving product', { cause: error });
  }
};
