export interface Inputs { startBees: number; startBrood: number; weeksToProject: number; monthlyGrowthRate: number; }
export interface Result { weeks: Array<{ week: number; bees: number; brood: number }>; finalBees: number; peakWeek: number; }
export function calculate(i: Inputs): Result {
  const weeks: Result['weeks'] = [];
  let bees = i.startBees; let brood = i.startBrood;
  const weekly = i.monthlyGrowthRate / 100 / 4;
  for (let w = 0; w <= i.weeksToProject; w++) {
    weeks.push({ week: w, bees: Math.round(bees), brood: Math.round(brood) });
    bees = Math.min(60000, bees * (1 + weekly));
    brood = Math.min(15000, brood * (1 + weekly * 0.8));
  }
  return { weeks, finalBees: weeks[weeks.length - 1].bees, peakWeek: i.weeksToProject };
}
