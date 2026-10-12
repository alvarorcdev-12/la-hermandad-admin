import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

export const generatePosPinAction = async (): Promise<{ pin: string }> => {
  try {
    const { data } = await laHermandadApi.post<{ pin: string }>(
      '/users/generate-pin',
    );
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error en generar el POS PIN');
  }
};
