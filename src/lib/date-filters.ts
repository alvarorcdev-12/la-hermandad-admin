import type { DateRange } from "react-day-picker";

export interface ApiDateRange {
  startDate?: string;
  endDate?: string;
}

export const mapDateRangeToApiParams = (range?: DateRange): ApiDateRange => {
  if (!range || !range.from) {
    // Si no hay rango, devolvemos un objeto vacío.
    // Tu backend ya sabe que si llega vacío, debe usar "Hoy" por defecto.
    return {};
  }

  // 1. Fecha de inicio (00:00:00.000)
  const startDate = new Date(range.from);
  startDate.setHours(0, 0, 0, 0);

  // 2. Fecha de fin (23:59:59.999)
  // Si el usuario solo selecciona un día (from sin to), usamos 'from' como fin
  const endDateRaw = range.to || range.from;
  const endDate = new Date(endDateRaw);
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};
