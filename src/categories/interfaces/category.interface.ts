export interface Category {
  id: string;
  storeId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
