export interface Inputs { equipmentSet: 'small' | 'medium' | 'large' | 'commercial'; }
export interface Result { sqFtNeeded: number; cubicFtNeeded: number; shelfingLinearFt: number; note: string; }
export function calculate(i: Inputs): Result {
  const areas: Record<string, number> = { small: 80, medium: 150, large: 300, commercial: 800 };
  const sq = areas[i.equipmentSet];
  return { sqFtNeeded: sq, cubicFtNeeded: sq * 8, shelfingLinearFt: Math.round(sq * 0.4), note: 'Include access paths and climate control for wax products.' };
}
