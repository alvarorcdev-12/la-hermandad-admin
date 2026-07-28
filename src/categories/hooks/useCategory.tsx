import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategoryByIdAction } from '../actions/get-category-by-id.action';

export const useCategory = (id: string) => {
  // const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['category', { id: id }],
    queryFn: () => getCategoryByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    // Properties
    ...query
  }
};
