export interface Inputs { season: 'spring' | 'summer' | 'fall' | 'winter'; experienceLevel: 'beginner' | 'intermediate' | 'expert'; colonyIssues: boolean; }
export interface Result { intervalDays: number; recommendation: string; checklist: string[]; }
export function calculate(i: Inputs): Result {
  const base: Record<string, number> = { spring: 10, summer: 14, fall: 14, winter: 30 };
  let days = base[i.season];
  if (i.experienceLevel === 'beginner') days -= 3;
  if (i.colonyIssues) days = Math.max(5, days - 4);
  const rec = days <= 7 ? 'Weekly inspections needed.' : days <= 14 ? 'Bi-weekly inspections work well.' : days <= 21 ? 'Every 2-3 weeks.' : 'Monthly winter checks only.';
  const list: Record<string, string[]> = {
    spring: ['Queen status and eggs', 'Brood pattern', 'Food stores', 'Swarm cells', 'Disease signs'],
    summer: ['Honey super fill level', 'Queen performance', 'Mite check', 'Water availability'],
    fall: ['Winter stores adequacy', 'Mite count (critical)', 'Queen quality', 'Disease signs'],
    winter: ['Hive weight (heft)', 'Entrance clear', 'Signs of life', 'No disturbance'],
  };
  return { intervalDays: days, recommendation: rec, checklist: list[i.season] };
}
