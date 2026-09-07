import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

interface Props {
  onQueryChange: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const DebouncedSearchInput = ({
  onQueryChange,
  placeholder,
  className,
}: Props) => {
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
