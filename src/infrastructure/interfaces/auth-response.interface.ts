export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  storeName: string;
  firstName: string;
  lastName: string | null;
  name: string;
  initials: string[];
  avatar: string | null;
  email: string;
  isActive: boolean;
  isShopOwner: boolean;
  phone: string | null;
  role: string;
  createdAt: Date;
}
