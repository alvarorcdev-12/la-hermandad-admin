import { useSearchParams } from "react-router";
import useOrders from "./useOrders";

export const useOrdersPagination = () => {
  const [searchParams] = useSearchParams();

  const params = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    q: searchParams.get("q") || undefined,
    status: searchParams.get("status") || undefined,
    sort: searchParams.get("sort") || undefined,
    direction: searchParams.get("direction") || undefined,
  };

  return useOrders(params);
};
