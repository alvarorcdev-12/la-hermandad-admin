import { useQuery } from '@tanstack/react-query';
import { getCategoriesPaginationAction } from '@/actions/categories/get-categories-pagination.action';

interface Options {
  page: number;
  limit: number;
  q?: string;
  sort?: string;
  direction?: string;
}

export const useCategories = (options: Options) => {
  const { page, limit, q, sort, direction } = options;

  const query = useQuery({
    queryKey: ['categories', { page, limit, q, sort, direction }],
    queryFn: () =>
      getCategoriesPaginationAction({ page, limit, q, sort, direction }),
    staleTime: 1000 * 60 * 5, // 5 minutes,
  });

  return {
    ...query,
  };
};
