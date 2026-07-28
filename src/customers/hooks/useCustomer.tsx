import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCustomerByIdAction } from '../actions/get-customer-by-id.action';
import { createUpdateCustomerAction } from '../actions/create-update-customer.action';
import type { Customer } from '../interfaces/customer.interface';

export const useCustomer = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['customer', { id: id }],
    queryFn: () => getCustomerByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateCustomerAction,
    onSuccess: (customer: Customer) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({
        queryKey: ['customer', { id: customer.id }],
      });

      queryClient.setQueryData(['customer', { id: customer.id }], customer);
    },
  });

  return {
    ...query,
    mutation,
  };
};
