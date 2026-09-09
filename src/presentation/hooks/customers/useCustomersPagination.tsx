import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

import { useCustomers } from './useCustomers';

export const useCustomersPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const querySort = searchParams.get('sort') ?? 'createdAt';
  const queryDirection = searchParams.get('direction') ?? 'desc';
  const querySearch = searchParams.get('q') || undefined;

  const query = useCustomers({
    page: 1,
    limit: 10,
    sort: querySort,
    direction: queryDirection,
    q: querySearch,
  });

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
    ...query,
    querySort,
    queryDirection,
    querySearch,
    handleSortChange,
    handleQueryChange,
  };
};
