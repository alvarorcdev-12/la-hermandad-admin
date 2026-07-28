import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProductsPaginationAction } from '../actions/get-products-pagination.action';

export const useProducts = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const q = searchParams.get('q') || undefined;
  const status = searchParams.get('status') || undefined;
  const sort = searchParams.get('sort') || undefined;
  const direction = searchParams.get('direction') || undefined;

  const query = useQuery({
    queryKey: ['products', { page, limit, q, status, sort, direction }],
    queryFn: () =>
      getProductsPaginationAction({
        page: Number(page),
        limit: Number(limit),
        q,
        status,
        sort,
        direction,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    ...query,
  };
};
