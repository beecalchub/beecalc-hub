export interface Inputs { totalHives: number; workers: number; tasksPerDay: 'light' | 'moderate' | 'heavy'; }
export interface Result { hivesPerWorkerPerDay: number; daysToComplete: number; laborHoursTotal: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const rates: Record<string, number> = { light: 40, moderate: 25, heavy: 15 };
  const perWorker = rates[i.tasksPerDay];
  const days = Math.ceil(i.totalHives / (i.workers * perWorker));
  const hours = days * i.workers * 8;
  const rec = i.workers < 2 ? 'Add a second worker for safety and efficiency.' : days > 10 ? 'Consider adding workers to reduce timeline.' : 'Crew size appropriate for workload.';
  return { hivesPerWorkerPerDay: perWorker, daysToComplete: days, laborHoursTotal: hours, recommendation: rec };
}
