export interface Inputs { hives: number; servicesLevel: 'basic' | 'full' | 'premium'; distance: number; durationDays: number; }
export interface Result { baseQuote: number; travelFee: number; serviceFee: number; totalQuote: number; depositSuggested: number; }
export function calculate(i: Inputs): Result {
  const rates: Record<string, number> = { basic: 150, full: 250, premium: 400 };
  const base = i.hives * rates[i.servicesLevel];
  const travel = Math.round(i.distance * 2.5 * 100) / 100;
  const service = Math.round(i.durationDays * 100 * 100) / 100;
  const total = base + travel + service;
  return { baseQuote: base, travelFee: travel, serviceFee: service, totalQuote: Math.round(total * 100) / 100, depositSuggested: Math.round(total * 0.3 * 100) / 100 };
}
