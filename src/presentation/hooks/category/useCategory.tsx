import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createUpdateCategoryAction } from '@/actions/categories/create-update-category.action';
import { getCategoryByIdAction } from '@/actions/categories/get-category-by-id.action';

export const useCategory = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['category', { id }],
    queryFn: () => getCategoryByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
    },
  });

  return {
    ...query,
    mutation,
  };
};
