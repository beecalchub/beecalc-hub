export interface Inputs { hivesToMove: number; truckCapacity: number; avgHiveWeight: number; tripMiles: number; }
export interface Result { loadsNeeded: number; totalWeight: number; drivingTimeHours: number; fuelCostEstimate: number; }
export function calculate(i: Inputs): Result {
  const loads = Math.ceil(i.hivesToMove / i.truckCapacity);
  const totalWeight = i.hivesToMove * i.avgHiveWeight;
  const fuel = Math.round(i.tripMiles * loads * 2 / 8 * 4 * 100) / 100;
  return { loadsNeeded: loads, totalWeight, drivingTimeHours: Math.round(i.tripMiles * loads * 2 / 50 * 10) / 10, fuelCostEstimate: fuel };
}
