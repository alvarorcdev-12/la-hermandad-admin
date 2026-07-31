import { useState } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { CircleQuestionMark } from 'lucide-react';

interface Props {
  className?: string;
  currencySymbol?: string;
  placeholder?: string;
  isError: boolean;
  value: string | null;
  helpText?: string;
  onValueChange?: (value: string) => void;
  onValueBlur?: () => void;
}

export const PriceInput = ({
  className,
  currencySymbol = 'Bs',
  helpText,
  isError,
  placeholder = '0.00',
  value,
  onValueChange,
  onValueBlur,
}: Props) => {
  const [displayValue, setDisplayValue] = useState(
    value ? Number(value).toFixed(2) : null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    onValueChange?.(inputValue);
  };

  const handleBlur = () => {
    if (!displayValue) return;

    const number = Number(displayValue);
    if (isNaN(number)) return;

    const formatted = number.toFixed(2);
    setDisplayValue(formatted);
    onValueChange?.(formatted);
    onValueBlur?.();
  };

  return (
    <InputGroup className={className}>
      <InputGroupAddon>{currencySymbol}</InputGroupAddon>
      {helpText && (
        <InputGroupAddon align="inline-end">
          <HoverCard>
            <HoverCardTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                type="button"
                className="text-muted-foreground"
              >
                <CircleQuestionMark />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>{helpText}</HoverCardContent>
          </HoverCard>
        </InputGroupAddon>
      )}
      <InputGroupInput
        value={displayValue || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-invalid={isError}
      />
    </InputGroup>
  );
};
