import { laHermandadApi } from '@/api/la-hermandad-api';
import type { AuthResponse } from '../interfaces/auth-response.interface';

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const { data } =
      await laHermandadApi.get<AuthResponse>('/auth/check-status');
    return data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    throw new Error('Token expired or not valid');
  }
};
