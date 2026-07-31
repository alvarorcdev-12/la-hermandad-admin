interface Props {
  costPrice: string | null;
  price?: string;
}
export const ProfitCalculator = ({ costPrice, price }: Props) => {
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
    val !== null && !isNaN(val)
      ? `Bs ${val > 0 ? '+' : ''}${val.toFixed(2)}`
      : '--';

  const formatPercent = (val: number | null) =>
    val !== null ? `${val > 0 ? '+' : ''}${val.toFixed(1)}%` : '--';
  return (
    <>
      <div className="border p-2 rounded-lg w-fit">
        <div className="flex items-center gap-4">
          <span>Beneficio</span>
          <span className={textColor}>{formatCurrency(benefitPrice)}</span>
        </div>
      </div>
      <div className="border p-2 rounded-lg w-fit">
        <div className="flex items-center gap-4">
          <span>Margen</span>
          <span className={textColor}>{formatPercent(margin)}</span>
        </div>
      </div>
    </>
  );
};
