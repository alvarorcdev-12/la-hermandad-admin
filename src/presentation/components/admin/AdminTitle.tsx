import { useNavigate } from 'react-router';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  Icon: LucideIcon;
  prevHref?: string;
}

export const AdminTitle = ({ title, Icon, prevHref }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      {prevHref ? (
        <>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(prevHref)}
          >
            <Icon className="size-4" />
          </Button>
          <ChevronRight className="size-3 text-muted-foreground mr-1" />
        </>
      ) : (
        <Button variant="ghost" size="icon-sm" className="mr-0.5 cursor-text">
          <Icon className="size-4" />
        </Button>
      )}

      <h1 className="font-semibold text-xl select-none">{title}</h1>
    </div>
  );
};
