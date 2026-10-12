import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { UsersResponse } from '@/infrastructure/interfaces/users-response.interface';

interface Options {
  page?: number;
  limit?: number;
  q?: string;

  sort?: string;
  direction?: string;
}

export const getUsersPaginationAction = async (options: Options) => {
  const { page, direction, limit, q, sort } = options;

  try {
    const { data } = await laHermandadApi.get<UsersResponse>('/users', {
      params: {
        page,
        limit,
        ...(q && { q }),
        ...(sort && { sort }),
        ...(direction && { direction }),
      },
    });
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error en obtener usuarios paginados');
  }
};
