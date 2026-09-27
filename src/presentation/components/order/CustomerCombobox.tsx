import { CirclePlus, Search } from 'lucide-react';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { InputGroupAddon } from '@/components/ui/input-group';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import type { Customer } from '@/domain/entities/customer.entity';

interface Props {
  customers: Customer[];

  onCustomerChange: (customer: Customer | null) => void;
}

export function CustomerCombobox({ customers, onCustomerChange }: Props) {
  return (
    <Combobox items={customers} onValueChange={onCustomerChange}>
      <ComboboxInput placeholder="Buscar o crea un cliente">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent alignOffset={-28} className="w-60">
        <div className="w-full p-1">
          <Button className="w-full justify-start" variant="ghost">
            <CirclePlus className="size-3.5" />
            Crear un cliente
          </Button>
        </div>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(customer: Customer) => (
            <ComboboxItem key={customer.id} value={customer}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {customer.displayName}
                  </ItemTitle>
                  <ItemDescription>{customer.email}</ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
