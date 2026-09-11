import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  trigger: React.ReactElement;
  className?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormDialog = ({
  trigger,
  className,
  title,
  description,
  children,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose
            render={
              <Button size="sm" variant="outline">
                Cancelar
              </Button>
            }
          />
          <Button size="sm" type="button">
            Listo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
