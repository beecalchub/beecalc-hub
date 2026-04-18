export interface Inputs { strongHiveBrood: number; strongHiveBees: number; weakHiveBrood: number; weakHiveBees: number; }
export interface Result { transferBrood: number; transferBees: number; newStrongBrood: number; newWeakBrood: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const broodDiff = i.strongHiveBrood - i.weakHiveBrood;
  const beesDiff = i.strongHiveBees - i.weakHiveBees;
  const transferBrood = Math.floor(broodDiff / 2);
  const transferBees = Math.floor(beesDiff / 2);
  const rec = transferBrood <= 0 ? 'Hives are balanced - no transfer needed.' : transferBrood === 1 ? 'Move 1 frame of capped brood from strong to weak hive.' : `Move ${transferBrood} frames of capped brood (with adhering bees) from strong to weak.`;
  return { transferBrood: Math.max(0, transferBrood), transferBees: Math.max(0, transferBees), newStrongBrood: i.strongHiveBrood - transferBrood, newWeakBrood: i.weakHiveBrood + transferBrood, recommendation: rec };
}
