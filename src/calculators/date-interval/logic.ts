export interface DateIntervalInputs {
  mode: 'between' | 'add' | 'subtract';
  startDate: string; // ISO date
  endDate: string;   // ISO date (for 'between' mode)
  daysToAdd: number; // for 'add'/'subtract' mode
}

export interface DateIntervalResult {
  // 'between' mode
  totalDays: number;
  totalWeeks: number;
  remainderDays: number;
  calendarMonths: number;

  // 'add'/'subtract' mode
  resultDate: Date | null;
  resultDateFormatted: string;

  // beekeeping context
  beekeepingContext: string;
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86400000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.abs(Math.floor((utcB - utcA) / msPerDay));
}

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDateStr(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getBeekeepingContext(days: number): string {
  if (days === 3) return '3 days - egg hatches into larva';
  if (days >= 5 && days <= 6) return '~5-6 days - larval cell capped';
  if (days === 12) return '12 days - queen cell capped (from egg)';
  if (days === 16) return '16 days - queen emerges from cell (from egg)';
  if (days === 21) return '21 days - worker bee emerges (from egg)';
  if (days === 24) return '24 days - drone emerges (from egg)';
  if (days >= 28 && days <= 35) return '~4-5 weeks - new queen should be laying';
  if (days >= 42 && days <= 45) return '~6 weeks - Apivar treatment duration';
  if (days >= 56 && days <= 63) return '~8-9 weeks - typical brood break + treatment cycle';
  if (days >= 90 && days <= 100) return '~3 months - typical queen introduction to confirmed laying';
  return '';
}

export function calculateDateInterval(inputs: DateIntervalInputs): DateIntervalResult {
  const { mode, startDate, endDate, daysToAdd } = inputs;

  if (mode === 'between') {
    const a = new Date(startDate + 'T12:00:00');
    const b = new Date(endDate + 'T12:00:00');
    const totalDays = daysBetween(a, b);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainderDays = totalDays % 7;

    // Approximate calendar months
    const monthDiff = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    const calendarMonths = Math.abs(monthDiff);

    return {
      totalDays,
      totalWeeks,
      remainderDays,
      calendarMonths,
      resultDate: null,
      resultDateFormatted: '',
      beekeepingContext: getBeekeepingContext(totalDays),
    };
  }

  // add or subtract
  const start = new Date(startDate + 'T12:00:00');
  const offset = mode === 'subtract' ? -daysToAdd : daysToAdd;
  const resultDate = addDaysToDate(start, offset);

  return {
    totalDays: daysToAdd,
    totalWeeks: Math.floor(daysToAdd / 7),
    remainderDays: daysToAdd % 7,
    calendarMonths: 0,
    resultDate,
    resultDateFormatted: formatDateStr(resultDate),
    beekeepingContext: getBeekeepingContext(daysToAdd),
  };
}

export const QUICK_INTERVALS = [
  { label: 'Egg → hatch (3d)', days: 3 },
  { label: 'Egg → worker (21d)', days: 21 },
  { label: 'Egg → queen (16d)', days: 16 },
  { label: 'Egg → drone (24d)', days: 24 },
  { label: 'Queen → laying (28d)', days: 28 },
  { label: 'Apivar duration (42d)', days: 42 },
];
