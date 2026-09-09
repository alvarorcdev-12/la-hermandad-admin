import { useQuery } from '@tanstack/react-query';

import { getCustomersPaginationAction } from '@/actions/customers/get-customers-pagination.action';

interface Options {
  page: number;
  limit: number;
  q?: string;
  sort?: string;
  direction?: string;
}

export const useCustomers = (options: Options) => {
  const { page = 1, limit = 10, sort, direction, q } = options;

  const query = useQuery({
    queryKey: ['customers', { page, limit, sort, direction, q }],
    queryFn: () =>
      getCustomersPaginationAction({
        page,
        limit,
        sort,
        direction,
        q,
      }),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return {
    ...query,
  };
};
