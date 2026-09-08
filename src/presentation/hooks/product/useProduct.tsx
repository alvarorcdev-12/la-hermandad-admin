import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getProductByIdAction } from '@/actions/products/get-product-by-id.action';
import { createUpdateProductAction } from '@/actions/products/create-update-product.action';

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['product', { id }],
      });
    },
  });
  return {
    ...query,
    mutation,
  };
};
