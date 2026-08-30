import { isToday, isYesterday, isSameDay, subDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";

export const getRangeLabel = (range: DateRange | undefined): string => {
  // Si no hay rango seleccionado, por defecto mostramos "Hoy"
  if (!range || !range.from) {
    return "Hoy";
  }

  const { from, to } = range;
  // Si el usuario solo selecciona un día, 'to' será undefined. Lo igualamos a 'from'.
  const end = to || from;

  // 1. Si es exactamente el día de hoy
  if (isToday(from) && isToday(end)) {
    return "Hoy";
  }

  // 2. Si es exactamente el día de ayer
  if (isYesterday(from) && isYesterday(end)) {
    return "Ayer";
  }

  // 3. Si el rango abarca los últimos 7 días (incluyendo hoy)
  const sevenDaysAgo = subDays(new Date(), 6);
  if (isSameDay(from, sevenDaysAgo) && isToday(end)) {
    return "Últimos 7 días";
  }

  // 4. Si el rango abarca los últimos 30 días (incluyendo hoy)
  const thirtyDaysAgo = subDays(new Date(), 29);
  if (isSameDay(from, thirtyDaysAgo) && isToday(end)) {
    return "Últimos 30 días";
  }

  // 5. Si es un rango personalizado o un día específico
  const formatStr = "dd MMM yyyy"; // Ej: 27 ago 2026
  if (isSameDay(from, end)) {
    // Si es un solo día seleccionado que no es hoy ni ayer
    return format(from, formatStr);
  }

  // Si son dos días distintos (ej: 27 ago 2026 - 29 ago 2026)
  return `${format(from, formatStr)} - ${format(end, formatStr)}`;
};
