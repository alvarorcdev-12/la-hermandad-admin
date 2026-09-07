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
  querySort: string;
  queryDirection: string;
  onSortChange: (sort: string, direction: string) => void;
}

export const SortDropdownMenu = ({
  options,
  querySort,
  queryDirection,
  onSortChange,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon-sm" variant="outline">
            <ArrowUpDown />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-auto p-2">
        {options.map((op) => (
          <DropdownMenuCheckboxItem
            key={op.sort}
            checked={querySort === op.sort}
            onCheckedChange={() => onSortChange(op.sort, 'desc')}
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
                onCheckedChange={() => onSortChange(querySort, direction.value)}
              >
                {direction.label}
              </DropdownMenuCheckboxItem>
            )),
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
