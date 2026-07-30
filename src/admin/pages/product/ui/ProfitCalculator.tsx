import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  costPrice: string | null;
  price?: string;
  register: UseFormRegisterReturn<'costPrice'>;
}
export const ProfitCalculator = ({ costPrice, price, register }: Props) => {
  const benefitPrice =
    price && costPrice ? Number(price) - Number(costPrice) : null;
  const margin = benefitPrice
    ? ((Number(price) - Number(costPrice)) / Number(price)) * 100
    : null;

  const isPositiveBenefit = benefitPrice ? benefitPrice >= 0 : false;

  const textColor = benefitPrice
    ? isPositiveBenefit
      ? 'text-emerald-700 dark:text-emerald-400'
      : 'text-destructive'
    : '';

  const formatCurrency = (val: number | null) =>
    val !== null ? `Bs ${val > 0 ? '+' : ''}${val.toFixed(2)}` : '--';

  const formatPercent = (val: number | null) =>
    val !== null ? `${val > 0 ? '+' : ''}${val.toFixed(1)}%` : '--';
  return (
    <div className="flex items-center gap-2">
      <div className="border border-input px-2 py-0.5 rounded-lg">
        <div className="flex items-center gap-2">
          <span>Costo</span>
          <InputGroup className="max-w-24">
            <InputGroupAddon>Bs</InputGroupAddon>
            <InputGroupInput
              type="number"
              placeholder="0.00"
              {...register}
              min={0}
              step={0.01}
            />
          </InputGroup>
        </div>
      </div>
      <div className="border p-2 rounded-lg">
        <div className="flex items-center gap-4">
          <span>Beneficio</span>
          <span className={textColor}>{formatCurrency(benefitPrice)}</span>
        </div>
      </div>
      <div className="border p-2 rounded-lg">
        <div className="flex items-center gap-4">
          <span>Margen</span>
          <span className={textColor}>{formatPercent(margin)}</span>
        </div>
      </div>
    </div>
  );
};
