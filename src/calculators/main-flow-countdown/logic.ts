export interface Inputs { flowStartDate: string; flowEndDate: string; todayDate: string; superCount: number; }
export interface Result { daysUntilFlow: number; daysOfFlow: number; phase: string; supersNeededNow: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const today = new Date(i.todayDate); const start = new Date(i.flowStartDate); const end = new Date(i.flowEndDate);
  if (isNaN(today.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) return { daysUntilFlow: 0, daysOfFlow: 0, phase: 'Enter valid dates', supersNeededNow: i.superCount, recommendation: 'Fill in all three dates to see the countdown.' };
  const daysUntil = Math.ceil((start.getTime() - today.getTime()) / 86400000);
  const daysOf = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  let phase = 'Before flow'; let supersNow = i.superCount;
  if (daysUntil <= 0 && today <= end) { phase = 'IN FLOW'; supersNow = i.superCount + 1; }
  else if (daysUntil < 14) { phase = 'Preparing'; }
  else if (today > end) { phase = 'Flow ended - harvest time'; supersNow = 0; }
  const rec = phase === 'IN FLOW' ? 'Add supers when 7 of 10 frames are full.' : phase === 'Preparing' ? 'Add first super before flow begins.' : phase === 'Before flow' ? 'Ensure colonies are strong, equipment ready.' : 'Remove and extract supers soon.';
  return { daysUntilFlow: daysUntil, daysOfFlow: daysOf, phase, supersNeededNow: supersNow, recommendation: rec };
}
