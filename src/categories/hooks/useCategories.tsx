import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesPaginationAction } from '../actions/get-categories-pagination.action';

export const useCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const q = searchParams.get('q') || undefined;
  const sort = searchParams.get('sort') || undefined;
  const direction = searchParams.get('direction') || undefined;

  const query = useQuery({
    queryKey: ['customers', { page, limit, q, sort, direction }],
    queryFn: () =>
      getCategoriesPaginationAction({
        page: Number(page),
        limit: Number(limit),
        q,
        sort,
        direction,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const handleSearchCategory = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query && query.length > 0) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    setSearchParams(params);
  };

  return {
    // Properties
    ...query,
    q,

    // Methods
    handleSearchCategory,
  };
};
