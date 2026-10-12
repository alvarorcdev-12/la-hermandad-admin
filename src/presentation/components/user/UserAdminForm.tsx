import { useForm } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const UserAdminForm = () => {
  const {
    register,
    formState: { errors },
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
    },
  });

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
            })}
            type="text"
            placeholder="Correo electrónico"
          />
        </Field>
        <Field>
          <Input
            {...register('phone')}
            type="text"
            placeholder="Teléfono (opcional)"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Input
            {...register('password')}
            type="text"
            placeholder="Contraseña"
          />
        </Field>
        <Field>
          <Input
            {...register('confirmPassword')}
            type="text"
            placeholder="Confirmar contraseña"
          />
        </Field>
      </div>
    </>
  );
};
