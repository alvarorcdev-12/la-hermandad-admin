import { useQuery } from '@tanstack/react-query';

import { getUsersPaginationAction } from '@/actions/users/get-users-pagination.action';
interface Options {
  page: number;
  limit: number;
  q?: string;
  sort?: string;
  direction?: string;
}

export const useUsers = (options: Options) => {
  const { page = 1, limit = 10, sort, direction, q } = options;
  const query = useQuery({
    queryKey: ['users', { page, limit, sort, direction, q }],
    queryFn: () =>
      getUsersPaginationAction({ page, limit, direction, q, sort }),
  });

  return {
    ...query,
  };
};
