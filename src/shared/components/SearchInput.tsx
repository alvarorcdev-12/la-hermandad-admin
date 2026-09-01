import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

interface Props {
  className?: string;
  placeholder?: string;

  onQueryChange: (query: string) => void;
}

export const SearchInput = ({
  className,
  placeholder = 'Buscar',
  onQueryChange,
}: Props) => {
  const isFirstRender = useRef(true);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      onQueryChange(query);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQueryChange]);

  const handleSearch = () => {
    onQueryChange(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};
