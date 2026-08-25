import { laHermandadApi } from "@/api/la-hermandad-api";
import { sleep } from "@/lib/sleep";

import type { Product } from "../interfaces/product.interface";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { categoryId: string | null },
): Promise<Product> => {
  await sleep(1500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, category, createdAt, updatedAt, ...rest } = productLike;

  const isCrating = id === "new";

  const costPrice = rest.costPrice ? Number(rest.costPrice) : null;
  const compareAtPrice = rest.compareAtPrice
    ? Number(rest.compareAtPrice)
    : null;
  const price = Number(rest.price);
  rest.inventoryQuantity = Number(rest.inventoryQuantity || 0);

  try {
    const { data } = await laHermandadApi<Product>({
      url: isCrating ? "/products" : `/products/${id}`,
      method: isCrating ? "POST" : "PATCH",
      data: {
        ...rest,
        costPrice,
        compareAtPrice,
        price,
      },
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error("Error saving product", { cause: error });
  }
};
