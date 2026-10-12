import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const UserPOSForm = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Input type="text" placeholder="Nombre" />
        </Field>
        <Field>
          <Input type="text" placeholder="Apellidos" />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <Input type="text" placeholder="Correo electrónico (opcional)" />
        </Field>
        <Field>
          <Input type="text" placeholder="Teléfono (opcional)" />
        </Field>
      </div>
    </>
  );
};
