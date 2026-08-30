import { useQuery } from "@tanstack/react-query";
import { getOrdersPaginationPaginationAction } from "../actions/get-orders-pagination.action";

interface OrdersParams {
  page: number;
  limit: number;
  q?: string;
  status?: string;
  sort?: string;
  direction?: string;
}

const useOrders = ({
  page,
  limit,
  q,
  status,
  sort,
  direction,
}: OrdersParams) => {
  const query = useQuery({
    queryKey: ["orders", { page, limit, status, q, sort, direction }],
    queryFn: () =>
      getOrdersPaginationPaginationAction({
        page,
        limit,
        status,
        q,
        sort,
        direction,
      }),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
  };
};

export default useOrders;
