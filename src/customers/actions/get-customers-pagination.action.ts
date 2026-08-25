import { laHermandadApi } from "@/api/la-hermandad-api";
import { sleep } from "@/lib/sleep";
import type { CustomersResponse } from "../interfaces/customers-response.interface";

interface Options {
  page?: number;
  limit?: number;
  q?: string;

  sort?: string;
  direction?: string;
}

export const getCustomersPaginationAction = async (
  options: Options,
): Promise<CustomersResponse> => {
  await sleep(1500);

  const { page = 1, limit = 10, q, sort, direction } = options;

  try {
    const { data } = await laHermandadApi.get<CustomersResponse>("/customers", {
      params: {
        page,
        limit,
        q,
        sort,
        direction,
      },
    });

    return data;
  } catch (error) {
    console.log({ error });

    throw new Error("Error getting customers", { cause: error });
  }
};
