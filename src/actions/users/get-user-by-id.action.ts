import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { UserDB } from '@/infrastructure/interfaces/auth-response.interface';

export const getUserByIdAction = async (id: string) => {
  try {
    const { data } = await laHermandadApi.get<UserDB>(`/users/${id}`);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Erro en obtener usuario con el ID: ${id}`);
  }
};
