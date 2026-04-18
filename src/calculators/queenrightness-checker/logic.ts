export interface Inputs { eggsFound: boolean; youngLarvae: boolean; queenSeen: boolean; workerLayers: boolean; daysSinceLastCheck: number; }
export interface Result { queenright: boolean; confidence: string; diagnosis: string; nextSteps: string[]; }
export function calculate(i: Inputs): Result {
  if (i.eggsFound && i.queenSeen) return { queenright: true, confidence: 'Certain', diagnosis: 'Colony is definitely queenright.', nextSteps: ['Continue regular inspections every 2 weeks.'] };
  if (i.eggsFound || i.youngLarvae) return { queenright: true, confidence: 'High', diagnosis: 'Eggs/young larvae present means a queen was laying within 3 days.', nextSteps: ['Look harder for the queen next inspection.', 'Mark her if not already marked.'] };
  if (i.workerLayers) return { queenright: false, confidence: 'Certain', diagnosis: 'Laying workers detected - colony has been queenless too long.', nextSteps: ['Shake all bees 50+ feet from hive location.', 'Introduce caged queen or combine with queenright hive.', 'Difficult to save - consider combining.'] };
  if (!i.eggsFound && !i.youngLarvae && i.daysSinceLastCheck > 7) return { queenright: false, confidence: 'High', diagnosis: 'No eggs or young larvae - likely queenless.', nextSteps: ['Add a frame of eggs from another hive.', 'If they build queen cells, they are queenless.', 'Requeen within a week.'] };
  return { queenright: false, confidence: 'Uncertain', diagnosis: 'Insufficient evidence. Check again in 3-5 days.', nextSteps: ['Recheck for eggs in 3-5 days.', 'Add frame of open brood as test.'] };
}
