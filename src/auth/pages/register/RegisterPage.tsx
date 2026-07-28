import React from 'react';
import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, useWatch } from 'react-hook-form';
import { PasswordMatch } from '@/components/auth/password-match';
import { Spinner } from '@/components/ui/spinner';

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  const errorList = Object.entries(errors);

  const onSubmit = (data: FormInputs) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Crear una cuenta
        </h1>
        <p className="text-muted-foreground">
          Introduce tus datos a continuación para crear tu cuenta.
        </p>
      </div>

      {errorList.length > 0 && (
        <div
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p
                id="error-summary-title"
                className="font-medium text-destructive"
              >
                Por favor, corrija los siguientes errores:
              </p>
              <ul className="text-sm text-destructive/90 space-y-1">
                {errorList.map(([field, { message }]) => (
                  <li key={field}>
                    <a
                      href={`#${field}`}
                      className="underline underline-offset-2 hover:text-destructive"
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              {...register('firstName', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
              })}
              name="firstName"
              placeholder="John"
              className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
              disabled={isLoading}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              {...register('lastName', {
                required: 'El apellido es requerido',
                minLength: {
                  value: 3,
                  message: 'El apellido debe tener al menos 3 caracteres',
                },
              })}
              name="lastName"
              placeholder="Doe"
              className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
              disabled={isLoading}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            {...register('email', {
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'El correo electrónico es inválido',
              },
            })}
            name="email"
            type="email"
            placeholder="john@example.com"
            className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
            disabled={isLoading}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Crear una contraseña"
            className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
            disabled={isLoading}
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
            aria-invalid={!!errors.password}
          />
          {/* <PasswordStrength password={password} /> */}
          {errors.password && (
            <p
              id="password-error"
              className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            {...register('confirmPassword', {
              validate: {
                matchPassword: (value) =>
                  value === password || 'Las contraseñas no coinciden',
              },
            })}
            placeholder="Confirma tu contraseña"
            className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
            disabled={isLoading}
            aria-invalid={!!errors.confirmPassword}
          />
          <PasswordMatch
            password={password}
            confirmPassword={confirmPassword}
          />
          {/* {errors.confirmPassword && (
            <p
              id="confirmPassword-error"
              className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
            >
              {errors.confirmPassword.message}
            </p>
          )} */}
        </div>

        <Button
          type="submit"
          className="w-full h-12 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner data-icon="inline-start" />{' '}
              <span>Creando cuenta...</span>
            </>
          ) : (
            'Crear una cuenta'
          )}
        </Button>

        {/* <p className="text-xs text-center text-muted-foreground">
          By creating an account, you agree to our{' '}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </p> */}
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{' '}
        <Link
          to="/auth/login"
          className="text-foreground underline underline-offset-4 hover:text-primary"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
