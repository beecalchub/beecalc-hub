export interface Inputs { lastInspectionDays: number; weatherFavorable: boolean; colonyHealthy: boolean; swarmSeason: boolean; }
export interface Result { shouldInspect: boolean; priority: string; recommendation: string; checklist: string[]; }
export function calculate(i: Inputs): Result {
  const urgent = i.lastInspectionDays > 14 || (i.swarmSeason && i.lastInspectionDays > 7);
  const should = urgent && i.weatherFavorable;
  const priority = urgent ? 'High' : i.lastInspectionDays > 10 ? 'Medium' : 'Low';
  const rec = should ? 'Inspect within 2 days.' : urgent ? 'Wait for better weather.' : 'Inspect in normal schedule.';
  const list: string[] = [];
  if (i.swarmSeason) list.push('Check for swarm cells');
  if (!i.colonyHealthy) list.push('Evaluate health signs');
  list.push('Verify queen presence and eggs');
  list.push('Assess food stores');
  return { shouldInspect: should, priority, recommendation: rec, checklist: list };
}
