import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Save, XIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';

import type { Category } from '@/domain/entities/category.entity';

interface Props {
  category: Category;
  isPending: boolean;

  onSubmit: (categoryForm: Partial<Category>) => Promise<void>;
}

export const CategoryForm = ({ category, isPending, onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Category>({
    defaultValues: category,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Nombre de categoría</FieldLabel>
              <Input
                type="text"
                placeholder="Bebidas"
                {...register('name', {
                  required: 'El nombre de la categoría es requerido',
                  minLength: {
                    value: 3,
                    message:
                      'El nombre de la categoría debe tener al menos 3 caracteres',
                  },
                })}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                  {errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel>Descripción</FieldLabel>
              <Textarea
                placeholder="Descripción"
                className="min-h-40 max-h-40"
                {...register('description')}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
      <div className="flex items-center justify-end gap-2 py-5">
        <Link
          to="/admin/categories"
          className={buttonVariants({ variant: 'outline' })}
          type="button"
        >
          <XIcon />
          Cancelar
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : <Save />}
          {isPending ? 'Guardando' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
