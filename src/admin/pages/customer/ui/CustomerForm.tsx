import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import type { Customer } from '@/customers/interfaces/customer.interface';

interface Props {
  customer: Customer;
  isPending: boolean;

  onSubmit: (customerLike: Partial<Customer>) => Promise<void>;
}

export const CustomerForm = ({ customer, isPending, onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Customer>({
    defaultValues: customer,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <Card>
            <CardContent>
              <FieldSet>
                <FieldLegend>Descripción general del cliente</FieldLegend>
                <FieldGroup>
                  <div className="grid md:grid-cols-2 gap-2">
                    <Field>
                      <FieldLabel htmlFor="firstName">Nombres</FieldLabel>
                      <Input
                        type="text"
                        id="firstName"
                        {...register('firstName', {
                          required: 'Nombres es requerido',
                          minLength: {
                            value: 2,
                            message: 'Nombres debe tener al menos 2 caracteres',
                          },
                        })}
                        aria-invalid={!!errors.firstName}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                      <Input
                        type="text"
                        id="lastName"
                        {...register('lastName', {
                          minLength: {
                            value: 3,
                            message:
                              'Apellido debe tener al menos 3 caracteres',
                          },
                        })}
                        aria-invalid={!!errors.lastName}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                    <Input
                      type="email"
                      id="email"
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Correo electrónico inválido',
                        },
                      })}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>+591</InputGroupAddon>
                      <InputGroupInput
                        type="text"
                        id="phone"
                        placeholder="0000 0000"
                        {...register('phone', {
                          pattern: {
                            value: /^[0-9]{8}$/,
                            message: 'Teléfono inválido',
                          },
                        })}
                        aria-invalid={!!errors.phone}
                      />
                    </InputGroup>
                    {errors.phone && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-4">
          <Card>
            <CardContent>
              <FieldSet>
                <div className="flex items-center justify-between">
                  <FieldLegend>Notas</FieldLegend>
                  <Button variant="ghost" size="icon-sm">
                    <Pencil />
                  </Button>
                </div>
                <FieldDescription>
                  La notas son privadas y no compartirán con el cliente
                </FieldDescription>
              </FieldSet>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-end mt-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
