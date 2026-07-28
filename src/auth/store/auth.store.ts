import { create } from 'zustand';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

import type { User } from '../interfaces/auth-response.interface';

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated';

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters
  fullName: () => string;
  email: () => string;
  isOwner: () => boolean;

  // Acciones
  login: (email: string, password: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',

  fullName: () => {
    const { user } = get();
    if (!user) return '';
    return `${user.firstName} ${user.lastName ?? ''}`;
  },
  email: () => {
    const { user } = get();
    if (!user) return '';
    return user.email;
  },

  isOwner: () => {
    const { user } = get();
    return user?.isShopOwner || false;
  },

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);

      set({ user: data.user, token: data.token, authStatus: 'authenticated' });

      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },
  checkAuthStatus: async () => {
    try {
      const data = await checkAuthAction();

      set({ user: data.user, token: data.token, authStatus: 'authenticated' });

      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },
}));
