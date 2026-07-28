export interface Product {
  id: string;
  title: string;
  description: null | string;
  sku: null | string;
  price: string;
  costPrice: null | string;
  compareAtPrice: null | string;
  trackInventory: boolean;
  inventoryQuantity: number;
  status: string;
  category: Category | null;
}

export interface Category {
  id: string;
  name: string;
}
