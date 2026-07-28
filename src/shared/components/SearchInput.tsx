import { Search } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useEffect, useState, type KeyboardEvent } from 'react';

interface Props {
  className?: string;
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
}

export const SearchInput = ({
  className,
  placeholder = 'Buscar...',
  query = '',
  onQueryChange,
}: Props) => {
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQueryChange(value);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, onQueryChange]);

  const handleSearch = () => {
    onQueryChange(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};
