export interface Inputs { queensBreeding: number; droneColoniesNearby: number; dcaDistanceMiles: number; }
export interface Result { dronesEstimated: number; saturationRatio: number; adequate: boolean; recommendation: string; }
export function calculate(i: Inputs): Result {
  const dronesPerColony = 500;
  const drones = i.droneColoniesNearby * dronesPerColony;
  const dronesPerQueen = drones / Math.max(1, i.queensBreeding);
  const adequate = dronesPerQueen >= 500;
  const rec = adequate ? 'Adequate drone saturation for good mating.' : 'Consider adding drone-producing colonies or moving queens to a saturated DCA.';
  return { dronesEstimated: drones, saturationRatio: Math.round(dronesPerQueen), adequate, recommendation: rec };
}
