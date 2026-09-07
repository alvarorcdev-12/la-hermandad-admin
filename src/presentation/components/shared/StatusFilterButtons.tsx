import { Button } from '@/components/ui/button';

interface Props {
  options: { label: string; value: string }[];
  currentStatus?: string;
  onStatusChange: (status: string | undefined) => void;
}

export const StatusFilterButtons = ({
  options,
  currentStatus,
  onStatusChange,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      {options.map((option) => (
        <Button
          key={option.label}
          size="sm"
          variant={currentStatus === option.value ? 'secondary' : 'ghost'}
          onClick={() => onStatusChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
