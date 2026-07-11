export interface Inputs { startDate: string; currentFramesOfBees: number; targetFramesByFlow: number; flowStartDate: string; }
export interface Result { weeksUntilFlow: number; weeklyGrowthNeeded: number; feedRecommendation: string; }
export function calculate(i: Inputs): Result {
  const start = new Date(i.startDate); const flow = new Date(i.flowStartDate);
  if (isNaN(start.getTime()) || isNaN(flow.getTime())) return { weeksUntilFlow: 0, weeklyGrowthNeeded: 0, feedRecommendation: 'Enter valid dates to calculate.' };
  const days = Math.ceil((flow.getTime() - start.getTime()) / 86400000);
  const weeks = Math.max(1, Math.ceil(days / 7));
  const growth = Math.ceil((i.targetFramesByFlow - i.currentFramesOfBees) / weeks * 10) / 10;
  const rec = growth > 1.5 ? 'Aggressive feeding needed - 1:1 syrup daily plus pollen patties.' : growth > 0.8 ? 'Moderate feeding - 1:1 syrup twice weekly.' : 'Light supplementation - pollen patty only if natural pollen is low.';
  return { weeksUntilFlow: weeks, weeklyGrowthNeeded: growth, feedRecommendation: rec };
}
