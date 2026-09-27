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

  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export const FormDialog = ({
  trigger,
  className,
  title,
  description,
  children,
  onSubmit,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={onSubmit}>
          {children}
          <DialogFooter>
            <DialogClose
              render={
                <Button size="sm" variant="outline">
                  Cancelar
                </Button>
              }
            />
            <DialogClose
              render={
                <Button size="sm" type="submit">
                  Listo
                </Button>
              }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
