import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { CreateUserPayload } from '@/infrastructure/interfaces/payload/create-user-payload.interface';

interface Props {
  onSubmit: (payload: Partial<CreateUserPayload>) => Promise<void>;
}

export const UserPOSForm = ({ onSubmit }: Props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateUserPayload>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'CASHIER',
      posPin: '',
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Input
            {...register('firstName', { required: 'El nombre es obligatorio' })}
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
            {...register('lastName', {
              required: 'El apellido es obligatorio',
            })}
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
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'El formato del correo electrónico no es válido',
              },
            })}
            type="text"
            placeholder="Correo electrónico (opcional)"
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
      <Field orientation="horizontal" className="justify-end">
        <Button size="sm" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Field>
    </>
  );
};
