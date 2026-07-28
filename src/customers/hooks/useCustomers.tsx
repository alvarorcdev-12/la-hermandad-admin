import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getCustomersPaginationAction } from '../actions/get-customers-pagination.action';

export const useCustomers = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const q = searchParams.get('q') || undefined;
  const sort = searchParams.get('sort') || undefined;
  const direction = searchParams.get('direction') || undefined;

  const query = useQuery({
    queryKey: ['customers', { page, limit, q, sort, direction }],
    queryFn: () =>
      getCustomersPaginationAction({
        page: Number(page),
        limit: Number(limit),
        q,
        sort,
        direction,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    ...query,
    q,
  };
};
