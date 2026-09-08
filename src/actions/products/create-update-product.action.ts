// import { sleep } from "@/lib/sleep";
import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { ProductDB } from '@/infrastructure/interfaces/products-response.interface';
import type { Product } from '@/domain/entities/product.entity';

export const createUpdateProductAction = async (
  productForm: Partial<Product> & { categoryId: string | null },
): Promise<Product> => {
  // await sleep(1500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, category, createdAt, updatedAt, ...rest } = productForm;

  const isCrating = id === 'new';

  const costPrice = rest.costPrice ? Number(rest.costPrice) : null;
  const compareAtPrice = rest.compareAtPrice
    ? Number(rest.compareAtPrice)
    : null;
  const price = Number(rest.price);
  rest.inventoryQuantity = Number(rest.inventoryQuantity || 0);

  try {
    const { data } = await laHermandadApi<ProductDB>({
      url: isCrating ? '/products' : `/products/${id}`,
      method: isCrating ? 'POST' : 'PATCH',
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
    throw new Error('Error saving product', { cause: error });
  }
};
