export type ClimateZone = 'north' | 'moderate' | 'south';

export interface WinterStoresInputs {
  climateZone: ClimateZone;
  colonyStrength: 'strong' | 'average' | 'weak';
  currentStoresLbs: number;
  hiveCount: number;
}

export interface WinterStoresResult {
  requiredPerHiveLbs: number;
  requiredPerHiveKg: number;
  deficitPerHiveLbs: number;
  deficitPerHiveKg: number;
  totalRequiredLbs: number;
  totalDeficitLbs: number;
  syrupGallonsNeeded: number;
  sugarLbsNeeded: number;
  status: 'surplus' | 'adequate' | 'deficit' | 'critical';
  statusMessage: string;
}

const STORES_LBS: Record<ClimateZone, number> = {
  north: 80,
  moderate: 60,
  south: 40,
};

const STRENGTH_MODIFIER: Record<string, number> = {
  strong: 1.1,
  average: 1.0,
  weak: 0.85,
};

export function calculateWinterStores(inputs: WinterStoresInputs): WinterStoresResult {
  const { climateZone, colonyStrength, currentStoresLbs, hiveCount } = inputs;

  const base = STORES_LBS[climateZone];
  const modifier = STRENGTH_MODIFIER[colonyStrength];
  const requiredPerHiveLbs = Math.round(base * modifier);
  const requiredPerHiveKg = Math.round(requiredPerHiveLbs * 0.453592 * 10) / 10;

  const deficitPerHiveLbs = Math.max(0, requiredPerHiveLbs - currentStoresLbs);
  const deficitPerHiveKg = Math.round(deficitPerHiveLbs * 0.453592 * 10) / 10;

  const totalRequiredLbs = requiredPerHiveLbs * hiveCount;
  const totalDeficitLbs = deficitPerHiveLbs * hiveCount;

  // 2:1 syrup: ~7 lbs sugar per gallon of syrup, bees convert ~80% to stores
  const syrupGallonsNeeded = totalDeficitLbs > 0 ? Math.ceil(totalDeficitLbs / (7 * 0.8)) : 0;
  const sugarLbsNeeded = syrupGallonsNeeded > 0 ? Math.ceil(syrupGallonsNeeded * 7 * (2 / 3)) : 0;

  let status: WinterStoresResult['status'];
  let statusMessage: string;
  const ratio = currentStoresLbs / requiredPerHiveLbs;

  if (ratio >= 1.1) {
    status = 'surplus';
    statusMessage = 'Colonies have more than enough stores for winter. No feeding needed.';
  } else if (ratio >= 0.9) {
    status = 'adequate';
    statusMessage = 'Stores are close to target. Monitor weight and consider light supplemental feeding.';
  } else if (ratio >= 0.6) {
    status = 'deficit';
    statusMessage = 'Stores are below target. Feed 2:1 syrup urgently while bees can still process it.';
  } else {
    status = 'critical';
    statusMessage = 'Stores are critically low. Emergency feeding required. Consider fondant or sugar boards if temperatures are too low for syrup.';
  }

  return {
    requiredPerHiveLbs,
    requiredPerHiveKg,
    deficitPerHiveLbs,
    deficitPerHiveKg,
    totalRequiredLbs,
    totalDeficitLbs,
    syrupGallonsNeeded,
    sugarLbsNeeded,
    status,
    statusMessage,
  };
}
