import { getOrdersPaginationAction } from '@/actions/orders/get-orders-pagination.action';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryStatus = searchParams.get('status') || undefined;
  const querySort = searchParams.get('sort') ?? 'createdAt';
  const queryDirection = searchParams.get('direction') ?? 'desc';
  const querySearch = searchParams.get('q') || undefined;

  const query = useQuery({
    queryKey: [
      'orders',
      {
        page: 1,
        limit: 10,
        status: queryStatus,
        sort: querySort,
        direction: queryDirection,
        q: querySearch,
      },
    ],
    queryFn: () =>
      getOrdersPaginationAction({
        page: 1,
        limit: 10,
        status: queryStatus,
        sort: querySort,
        direction: queryDirection,
        q: querySearch,
      }),
  });

  const handleStatusChange = (status: string | undefined) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (status) {
        params.set('status', status);
      } else {
        params.delete('status');
      }

      params.set('page', '1');

      return params;
    });
  };

  const handleSortChange = (sort: string, direction: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set('sort', sort);
      params.set('direction', direction);

      params.set('page', '1');

      return params;
    });
  };

  const handleQueryChange = useCallback(
    (query: string) => {
      setSearchParams((prevParams) => {
        const urlSearchParams = new URLSearchParams(prevParams);

        const currentQ = urlSearchParams.get('q') || '';

        if (currentQ === query) {
          return prevParams;
        }

        if (query && query.length > 0) {
          urlSearchParams.set('q', query);
        } else {
          urlSearchParams.delete('q');
        }

        urlSearchParams.set('page', '1');

        return urlSearchParams;
      });
    },
    [setSearchParams],
  );

  return {
    // Properties
    ...query,
    queryStatus,
    querySort,
    queryDirection,
    // Methods
    handleStatusChange,
    handleSortChange,
    handleQueryChange,
  };
};
