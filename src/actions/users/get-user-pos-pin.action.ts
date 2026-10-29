import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

export const getUserPosPinAction = async (id: string) => {
  try {
    const { data } = await laHermandadApi.get<{ pin: string }>(
      `/users/${id}/pos-pin`,
    );
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(`Erro en obtener el PIN del usuario con el ID: ${id}`);
  }
};
