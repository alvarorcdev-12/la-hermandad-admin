import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Clipboard, RotateCw } from 'lucide-react';

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const UserFormDialog = ({ className, open, onOpenChange }: Props) => {
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
                <Input type="text" />
              </Field>
              <Field>
                <FieldLabel>Apellido</FieldLabel>
                <Input type="text" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Correo electrónico (opcional)</FieldLabel>
                <Input type="text" />
              </Field>
              <Field>
                <FieldLabel>Numero de teléfono (opcional)</FieldLabel>
                <Input type="text" />
              </Field>
            </div>
            <Field>
              <FieldLabel>PIN de Punto de Venta</FieldLabel>
              <div className="flex items-center gap-2">
                <Input type="password" />
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="outline">
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
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">Listo</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
