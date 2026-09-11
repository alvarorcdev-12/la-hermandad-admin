import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { FormDialog } from '@/presentation/components/shared/FormDialog';

interface Props {
  note: string;
  setNote: (notes: string) => void;
}

export const OrderNotesCard = ({ note, setNote }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notas</CardTitle>
        <CardDescription>
          {note.length === 0 ? 'Sin notas' : note}
        </CardDescription>
        <CardAction>
          <FormDialog
            title="Agregar notas"
            className="sm:max-w-xl"
            trigger={
              <Button
                variant="ghost"
                type="button"
                size="icon-sm"
                className="text-muted-foreground"
              >
                <Pencil />
              </Button>
            }
          >
            <Field>
              <InputGroup>
                <InputGroupTextarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>{note.length}/5000</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Para dejar notas o comentarios sobre el pedido
              </FieldDescription>
            </Field>
          </FormDialog>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
