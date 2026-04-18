export interface Inputs { deadBeesEntrance: boolean; unusualSmell: boolean; discoloredBrood: boolean; chalkMummies: boolean; deformedWings: boolean; kWingBees: boolean; }
export interface Result { riskScore: number; level: string; suspected: string[]; actions: string[]; }
export function calculate(i: Inputs): Result {
  const checks = [
    { on: i.deadBeesEntrance, pts: 10, suspect: 'Possible poisoning or heavy dieoff' },
    { on: i.unusualSmell, pts: 25, suspect: 'AFB suspected (foul odor)' },
    { on: i.discoloredBrood, pts: 20, suspect: 'AFB or EFB' },
    { on: i.chalkMummies, pts: 10, suspect: 'Chalkbrood' },
    { on: i.deformedWings, pts: 20, suspect: 'Deformed Wing Virus (DWV) - high mite load' },
    { on: i.kWingBees, pts: 15, suspect: 'Tracheal mites or viral infection' },
  ];
  const score = checks.filter(c => c.on).reduce((s, c) => s + c.pts, 0);
  const level = score >= 40 ? 'Critical' : score >= 20 ? 'Concerning' : score > 0 ? 'Minor' : 'Healthy';
  const suspected = checks.filter(c => c.on).map(c => c.suspect);
  const actions: string[] = [];
  if (i.unusualSmell || i.discoloredBrood) actions.push('Contact state apiarist immediately - possible reportable disease.');
  if (i.deformedWings) actions.push('Treat for varroa mites within 48 hours.');
  if (i.chalkMummies) actions.push('Improve ventilation, requeen if persistent.');
  if (score === 0) actions.push('Colony appears healthy. Continue regular inspections.');
  return { riskScore: score, level, suspected, actions };
}
