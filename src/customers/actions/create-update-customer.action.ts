import { laHermandadApi } from '@/api/la-hermandad-api';
import { sleep } from '@/lib/sleep';

import type { Customer } from '../interfaces/customer.interface';

export const createUpdateCustomerAction = async (
  productLike: Partial<Customer>,
): Promise<Customer> => {
  await sleep(1500);

  const {
    id,
    displayName,
    amountSpent,
    canDelete,
    createdAt,
    lastOrder,
    numberOfOrders,
    ...rest
  } = productLike;

  const isCrating = id === 'new';

  if (rest.phone) {
    rest.phone = rest.phone.startsWith('+') ? rest.phone : `+591${rest.phone}`;
  }

  try {
    const { data } = await laHermandadApi<Customer>({
      url: isCrating ? '/customers' : `/customers/${id}`,
      method: isCrating ? 'POST' : 'PATCH',
      data: {
        ...rest,
      },
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error saving product');
  }
};
