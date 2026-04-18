export interface TreatmentTimingInputs { lastTreatmentDate: string; treatmentType: string; flowStartDate: string; superRemovalDays: number; }
export interface TreatmentTimingResult { nextTreatmentDate: string; daysUntilNext: number; supersOffBy: string; windowOpen: boolean; recommendation: string; schedule: Array<{ date: string; event: string }>; }
const TREATMENT_INTERVALS: Record<string, number> = { 'oav': 90, 'apivar': 180, 'formic-pro': 120, 'apiguard': 120, 'hopguard': 90 };
const TREATMENT_LABELS: Record<string, string> = { 'oav': 'OAV (Oxalic Acid)', 'apivar': 'Apivar', 'formic-pro': 'Formic Pro', 'apiguard': 'Apiguard', 'hopguard': 'HopGuard 3' };
export function getTreatmentOptions() { return Object.entries(TREATMENT_LABELS).map(([v, l]) => ({ value: v, label: l })); }
function addDays(d: string, n: number): string { const dt = new Date(d + 'T12:00:00'); dt.setDate(dt.getDate() + n); return dt.toISOString().split('T')[0]; }
function daysBetween(a: string, b: string): number { return Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000); }
function fmt(d: string): string { return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
export function calculateTreatmentTiming(inputs: TreatmentTimingInputs): TreatmentTimingResult {
  const { lastTreatmentDate, treatmentType, flowStartDate, superRemovalDays } = inputs;
  const interval = TREATMENT_INTERVALS[treatmentType] || 90;
  const nextDate = addDays(lastTreatmentDate, interval);
  const today = new Date().toISOString().split('T')[0];
  const daysUntilNext = daysBetween(today, nextDate);
  const supersOffBy = addDays(flowStartDate, -superRemovalDays);
  const windowOpen = daysBetween(today, supersOffBy) > 14;
  const schedule = [
    { date: fmt(today), event: 'Today - do mite wash if due' },
    { date: fmt(addDays(today, 14)), event: 'Mite wash check' },
    { date: fmt(supersOffBy), event: 'Remove supers for treatment' },
    { date: fmt(nextDate), event: `Next ${TREATMENT_LABELS[treatmentType] || treatmentType} treatment due` },
    { date: fmt(flowStartDate), event: 'Honey flow begins - supers on' },
  ].sort((a, b) => a.date.localeCompare(b.date));
  const recommendation = daysUntilNext <= 0 ? 'Treatment is overdue. Test mite levels and treat if above threshold.' : daysUntilNext <= 14 ? 'Treatment window approaching. Prepare supplies and plan timing.' : `Next treatment in ~${daysUntilNext} days. Continue monitoring.`;
  return { nextTreatmentDate: fmt(nextDate), daysUntilNext: Math.max(0, daysUntilNext), supersOffBy: fmt(supersOffBy), windowOpen, recommendation, schedule };
}
