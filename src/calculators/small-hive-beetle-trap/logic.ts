export interface SHBTrapInputs { hiveCount: number; trapType: 'bottom-board' | 'between-frames' | 'entrance'; infestationLevel: 'low' | 'moderate' | 'heavy'; }
export interface SHBTrapResult { trapsPerHive: number; totalTraps: number; oilNeededOz: number; checkFrequencyDays: number; tips: string[]; }
export function calculateSHBTraps(inputs: SHBTrapInputs): SHBTrapResult {
  const { hiveCount, trapType, infestationLevel } = inputs;
  const trapsPerHive = trapType === 'bottom-board' ? 1 : trapType === 'between-frames' ? (infestationLevel === 'heavy' ? 3 : 2) : 1;
  const totalTraps = trapsPerHive * hiveCount;
  const oilPerTrap = trapType === 'bottom-board' ? 4 : trapType === 'between-frames' ? 1 : 2;
  const oilNeededOz = totalTraps * oilPerTrap;
  const checkDays = infestationLevel === 'heavy' ? 5 : infestationLevel === 'moderate' ? 7 : 14;
  const tips = ['Use food-grade vegetable oil or mineral oil in traps.', 'Place between-frame traps near brood area where beetles congregate.', 'Keep hives in full sun - SHB prefer shade.', 'Maintain strong colonies - weak hives are most vulnerable.'];
  if (infestationLevel === 'heavy') tips.push('Consider soil treatment around hive stands with beneficial nematodes.', 'Reduce entrances to limit beetle access.');
  return { trapsPerHive, totalTraps, oilNeededOz, checkFrequencyDays: checkDays, tips };
}
