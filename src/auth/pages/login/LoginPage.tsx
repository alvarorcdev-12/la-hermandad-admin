import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { AlertCircle, CircleX } from 'lucide-react';

import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/auth/store/auth.store';

interface FormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);
  const [isShowCredentialError, setIsShowCredentialError] = useState(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const remember = useWatch({
    control,
    name: 'remember',
  });

  const errorList = Object.entries(errors);

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);

    const ok = await login(data.email, data.password);

    if (ok) {
      navigate('/admin');
      return;
    }
    setIsLoading(false);
    setIsShowCredentialError(true);

    setTimeout(() => {
      setIsShowCredentialError(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Bienvenido de nuevo
        </h1>
        <p className="text-muted-foreground">
          Introduce tus credenciales para acceder a tu cuenta
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

      {isShowCredentialError && (
        <div
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex gap-3">
            <CircleX className="h-5 w-5 text-destructive shrink-0 mt-0.5" />

            <div className="space-y-1">
              <p
                id="error-summary-title"
                className="font-medium text-destructive"
              >
                Correo o/y contraseña no válidos
              </p>
              <p className="text-sm text-destructive/90">
                Por favor, intente iniciar sesión nuevamente.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            {...register('email', {
              required: 'El correo electrónico es obligatorio.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'El correo electrónico no es válido.',
              },
            })}
            type="email"
            placeholder="john@example.com"
            className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
            autoComplete="email"
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </div>
          <PasswordInput
            id="password"
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
            name="password"
            className="h-12 bg-input border-border transition-all duration-200 focus:scale-[1.01]"
            placeholder="Introduce tu contraseña"
            autoComplete="current-password"
            disabled={isLoading}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p
              id="password-error"
              className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            name="remember"
            checked={remember}
            onCheckedChange={() => setValue('remember', !remember)}
            className="transition-all duration-200"
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal cursor-pointer"
          >
            Recuérdeme durante 30 días
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner data-icon="inline-start" />{' '}
              <span>Iniciando sesión...</span>
            </>
          ) : (
            'Iniciar sesión'
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{' '}
        <Link
          to="/auth/register"
          className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Registrarse
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
