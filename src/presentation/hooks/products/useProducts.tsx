import { useQuery } from '@tanstack/react-query';

import { getProductsPaginationAction } from '@/actions/products/get-products-pagination.action';

interface Options {
  page: number;
  limit: number;
  status?: string;
  sort?: string;
  direction?: string;
  q?: string;
}

export const useProducts = (options: Options) => {
  const { page, limit, status, sort, direction, q } = options;
  const query = useQuery({
    queryKey: [
      'products',
      {
        page: page,
        limit: limit,
        status: status,
        sort: sort,
        direction: direction,
        q: q,
      },
    ],
    queryFn: () =>
      getProductsPaginationAction({
        page: page,
        limit: limit,
        status: status,
        sort: sort,
        direction: direction,
        q: q,
      }),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    ...query,
  };
};
