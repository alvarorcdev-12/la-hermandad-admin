import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';
import type { UserDB } from '@/infrastructure/interfaces/auth-response.interface';
import type { CreateUserPayload } from '@/infrastructure/interfaces/payload/create-user-payload.interface';

const cleanData = (
  payload: Partial<CreateUserPayload & { confirmPassword?: string }>,
) => {
  const { confirmPassword: _, email, password, posPin, phone } = payload;

  const phoneTransform = phone
    ? phone.startsWith('+591')
      ? phone
      : `+591${phone}`
    : null;

  return {
    ...payload,
    email: email ? email : null,
    password: password ? password : null,
    posPin: posPin ? posPin : null,
    phone: phoneTransform,
  };
};

export const createUserAction = async (
  payload: Partial<CreateUserPayload & { confirmPassword?: string }>,
): Promise<UserDB> => {
  try {
    const dataBody = cleanData(payload);

    const { data } = await laHermandadApi.post('/users', { ...dataBody });
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error en crear el staff usuario');
  }
};
