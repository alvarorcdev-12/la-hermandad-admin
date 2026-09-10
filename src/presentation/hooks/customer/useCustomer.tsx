import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createUpdateCustomerAction } from '@/actions/customers/create-update-customer.action';
import { getCustomerByIdAction } from '@/actions/customers/get-customer-by-id.action';

import type { Customer } from '@/domain/entities/customer.entity';

export const useCustomer = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['customer', { id }],
    queryFn: () => getCustomerByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const mutation = useMutation({
    mutationFn: createUpdateCustomerAction,
    onSuccess: (customer: Customer) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({
        queryKey: ['customer', { id: customer.id }],
      });
    },
  });

  return {
    ...query,
    mutation,
  };
};
