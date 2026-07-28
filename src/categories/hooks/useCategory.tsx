import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategoryByIdAction } from '../actions/get-category-by-id.action';
import { createUpdateCategoryAction } from '../actions/create-update-category.action';
import type { Category } from '../interfaces/category.interface';

export const useCategory = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['category', { id: id }],
    queryFn: () => getCategoryByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateCategoryAction,
    onSuccess: (data: Category) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({
        queryKey: ['category', { id: data.id }],
      });
      queryClient.setQueryData(['category', { id: data.id }], data);
    },
  });

  return {
    // Properties
    ...query,
    mutation,
  };
};
