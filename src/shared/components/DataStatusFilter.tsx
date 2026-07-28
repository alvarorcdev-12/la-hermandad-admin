import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';

interface Props {
  options: { value: string | undefined; label: string }[];
}

export const DataStatusFilter = ({ options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryStatus = searchParams.get('status') ?? undefined;

  const handleStatusChange = (status: string | undefined) => {
    if (status) {
      setSearchParams({ status });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex items-center gap-2">
      {options.map((option) => (
        <Button
          key={option.label}
          size="sm"
          variant={queryStatus === option.value ? 'secondary' : 'ghost'}
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
