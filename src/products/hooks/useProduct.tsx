import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "../interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { deleteProductByIdAction } from "../actions/delete-product-by-id.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["product", { id: id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      // queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });

  const deleteProduct = async (id: string): Promise<boolean> => {
    const isDeletingProduct = await deleteProductByIdAction(id);
    if (isDeletingProduct) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.removeQueries({
        queryKey: ["product", { id: id }],
      });

      return true;
    }
    return false;
  };

  return {
    // Properties
    ...query,
    mutation,

    // Methods
    deleteProduct,
  };
};
