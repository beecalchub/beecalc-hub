export interface Inputs { emergeDate: string; latitudeDegrees: number; }
export interface Result { openingDay: string; closingDay: string; optimalDay: string; note: string; }
export function calc(iso: string, days: number): string { const d = new Date(iso); d.setDate(d.getDate() + days); return d.toISOString().split('T')[0]; }
export function calculate(i: Inputs): Result {
  const open = calc(i.emergeDate, 5);
  const close = calc(i.emergeDate, 28);
  const optimal = calc(i.emergeDate, 12);
  const note = i.latitudeDegrees > 45 ? 'Short mating season - weather windows are critical.' : i.latitudeDegrees > 35 ? 'Moderate mating conditions.' : 'Long mating season - flexibility in timing.';
  return { openingDay: open, closingDay: close, optimalDay: optimal, note };
}
