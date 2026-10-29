import { useForm } from 'react-hook-form';

import { Clipboard, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/auth/password-input';
import { toast } from '@/components/ui/toast';

import { generatePosPinAction } from '@/actions/users/generate-pos-pin.action';

import type { User } from '@/domain/entities/user.entity';

interface Props {
  className?: string;
  open: boolean;

  user: User;
  posPin: string;

  onOpenChange: (value: boolean) => void;
}

interface FormInputs extends User {
  posPin?: string;
}

export const UserFormDialog = ({
  className,
  open,
  user,
  posPin,
  onOpenChange,
}: Props) => {
  const { register, reset, setValue } = useForm<FormInputs>({
    defaultValues: { ...user, posPin },
  });

  const onGeneratePosPin = async () => {
    const { pin } = await generatePosPinAction();
    setValue('posPin', pin);
    toast.add({
      type: 'success',
      title: 'PIN generado',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  type="text"
                  {...register('firstName', {
                    required: 'El nombre es requerido',
                  })}
                />
              </Field>
              <Field>
                <FieldLabel>Apellido</FieldLabel>
                <Input
                  type="text"
                  {...register('lastName', {
                    required: 'El apellido es requerido',
                  })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Correo electrónico (opcional)</FieldLabel>
                <Input type="text" {...register('email')} />
              </Field>
              <Field>
                <FieldLabel>Numero de teléfono (opcional)</FieldLabel>
                <Input type="text" {...register('phone')} />
              </Field>
            </div>
            <Field>
              <FieldLabel>PIN de Punto de Venta</FieldLabel>
              <div className="flex items-center gap-2">
                <PasswordInput {...register('posPin')} />
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={onGeneratePosPin}
                  >
                    <RotateCw />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Clipboard />
                  </Button>
                </div>
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            {/* <DialogClose render={} /> */}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Listo</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
