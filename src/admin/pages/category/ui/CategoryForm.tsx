import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { Category } from '@/categories/interfaces/category.interface';


interface Props {
  category: Category;
  isPending: boolean;

  onSubmit: (categoryLike: Partial<Category>) => Promise<void>;
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
      <div className="space-y-4">
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
        <div className="flex items-center gap-2 justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => window.history.back()}
          >
            Cancelar
          </Button>
          {/* <Link
            to="/admin/categories"
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancelar
          </Link> */}
          <Button type="submit" disabled={isPending}>
            Guardar
          </Button>
        </div>
      </div>
    </form>
  );
};
