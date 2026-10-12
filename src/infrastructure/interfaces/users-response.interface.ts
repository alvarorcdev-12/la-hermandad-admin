export interface UsersResponse {
  meta: Meta;
  results: UserDB[];
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UserDB {
  id: string;
  name: string;
  firstName: string;
  lastName: string | null;
  initials: string[];
  avatar: string | null;
  email: null | string;
  phone: string | null;
  isShopOwner: boolean;
  isActive: boolean;
  role: string;
  createdAt: Date;
}
