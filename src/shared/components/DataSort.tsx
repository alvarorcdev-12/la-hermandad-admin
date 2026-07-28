import { useSearchParams } from 'react-router';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface SortOption {
  label: string;

  sort: string;

  directions: {
    value: 'asc' | 'desc';

    label: string;
  }[];
}

interface Props {
  options: SortOption[];
}

export const DataSort = ({ options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const querySort = searchParams.get('sort') ?? 'createdAt';
  const queryDirection = searchParams.get('direction') ?? 'desc';

  const handleSortChange = (sort: string, direction: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    params.set('direction', direction);

    setSearchParams(params);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="icon-sm" variant="outline" />}>
        <ArrowUpDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-auto p-2">
        {options.map((op) => (
          <DropdownMenuCheckboxItem
            key={op.sort}
            checked={querySort === op.sort}
            onCheckedChange={() => handleSortChange(op.sort, 'desc')}
            className={querySort === op.sort ? 'font-bold' : ''}
          >
            {op.label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        {options
          .filter((item) => item.sort === querySort)
          .map((filter) =>
            filter.directions.map((direction) => (
              <DropdownMenuCheckboxItem
                key={direction.value}
                checked={queryDirection === direction.value}
                className={
                  queryDirection === direction.value ? 'font-bold' : ''
                }
                onCheckedChange={() =>
                  handleSortChange(querySort, direction.value)
                }
              >
                {direction.label}
              </DropdownMenuCheckboxItem>
            )),
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
