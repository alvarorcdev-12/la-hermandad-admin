import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  className?: string;
  actionText?: string;
  onAction: () => void;
}

export const CustomConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  actionText = 'Confirmar',
  className,
  onAction,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" size="sm">
                Cancelar
              </Button>
            }
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onAction}
          >
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
