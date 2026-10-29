// oxlint-disable no-unused-vars
import { laHermandadApi } from '@/infrastructure/api/la-hermandad-api';

import type { User } from '@/domain/entities/user.entity';
import type { UserDB } from '@/infrastructure/interfaces/auth-response.interface';

const cleanBody = (userForm: Partial<User & { posPin: string }>) => {
  const {
    avatar,
    createdAt,
    id,
    initials,
    isActive,
    isShopOwner,
    role,
    posPin,
    phone,
    name,
    ...rest
  } = userForm;
  const phoneTransform = userForm.phone
    ? userForm.phone.startsWith('+591')
      ? userForm.phone
      : `+591${userForm.phone}`
    : null;

  return {
    id,
    ...rest,
    email: rest.email ? rest.email : null,
    posPin,
    phone: phoneTransform,
  };
};

export const updateUserAction = async (
  userForm: Partial<User & { posPin: string }>,
) => {
  const { id, ...body } = cleanBody(userForm);

  try {
    const { data } = await laHermandadApi.patch<UserDB>(`/users/${id}`, body);

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error('Error en actualizar usuario');
  }
};
