import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { Category } from '@/categories/interfaces/category.interface';

interface Props {
  category: Category;
  isPending?: boolean;

  onSubmit: (category: Partial<Category>) => void;
}

export const CategoryForm = ({ category, isPending, onSubmit }: Props) => {
  return (
    <form>
      <div className="space-y-4">
        <Card>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Nombre de categoría</FieldLabel>
                <Input type="text" placeholder="Bebidas" />
              </Field>
              <Field>
                <FieldLabel>Descripción</FieldLabel>
                <Textarea
                  placeholder="Descripción"
                  className="min-h-32 max-h-32"
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <div className="flex items-center gap-2 justify-end mt-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </div>
    </form>
  );
};
