import { useForm, useWatch } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/auth/password-input';

import type { CreateUserPayload } from '@/infrastructure/interfaces/payload/create-user-payload.interface';

interface FormInput extends CreateUserPayload {
  confirmPassword?: string;
}

interface Props {
  onSubmit: (
    payload: Partial<CreateUserPayload & { confirmPassword: string }>,
  ) => Promise<void>;
}

export const UserAdminForm = ({ onSubmit }: Props) => {
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      confirmPassword: '',
      email: '',
      password: '',
      phone: '',
      role: 'MANAGER',
    },
  });

  const password = useWatch({ control, name: 'password' });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Input
            {...register('firstName', { required: 'El nombre es requerido' })}
            type="text"
            placeholder="Nombre"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.firstName.message}
            </p>
          )}
        </Field>
        <Field>
          <Input
            {...register('lastName', { required: 'El apellido es requerido' })}
            type="text"
            placeholder="Apellidos"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.lastName.message}
            </p>
          )}
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Input
            {...register('email', {
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'El formato del correo electrónico no es válido',
              },
            })}
            type="text"
            placeholder="Correo electrónico"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.email.message}
            </p>
          )}
        </Field>
        <Field>
          <Input
            {...register('phone', {
              pattern: {
                value: /^\d{1,10}$/,
                message: 'Solo se permiten números (máximo 10 dígitos)',
              },
            })}
            type="text"
            placeholder="Teléfono (opcional)"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.phone.message}
            </p>
          )}
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <PasswordInput
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
            placeholder="Contraseña"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Field>
          <PasswordInput
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'La contraseña no coinciden',
            })}
            placeholder="Confirmar contraseña"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>
      </div>
      <Field orientation="horizontal" className="justify-end">
        <Button size="sm" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Field>
    </>
  );
};
