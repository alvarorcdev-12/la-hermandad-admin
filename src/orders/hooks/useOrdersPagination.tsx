import { useSearchParams } from 'react-router';
import useOrders from './useOrders';
import { useCallback } from 'react';

export const useOrdersPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    q: searchParams.get('q') || undefined,
    status: searchParams.get('status') || undefined,
    sort: searchParams.get('sort') || undefined,
    direction: searchParams.get('direction') || undefined,
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

        return urlSearchParams;
      });
    },
    [setSearchParams],
  );

  return { ...useOrders(params), handleQueryChange };
};
