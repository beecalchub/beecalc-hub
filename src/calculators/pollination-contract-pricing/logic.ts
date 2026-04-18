export interface PollinationInputs {
  hiveCount: number;
  basePricePerHive: number;
  transportMiles: number;
  fuelCostPerMile: number;
  durationWeeks: number;
  managementVisits: number;
  visitCostPerHive: number;
}

export interface PollinationResult {
  hiveFees: number;
  transportCost: number;
  managementCost: number;
  totalContractPrice: number;
  pricePerHive: number;
  pricePerHivePerWeek: number;
}

export function calculatePollinationPricing(inputs: PollinationInputs): PollinationResult {
  const { hiveCount, basePricePerHive, transportMiles, fuelCostPerMile, durationWeeks, managementVisits, visitCostPerHive } = inputs;
  const hiveFees = hiveCount * basePricePerHive;
  const transportCost = Math.round(transportMiles * 2 * fuelCostPerMile * 100) / 100; // round trip
  const managementCost = managementVisits * visitCostPerHive * hiveCount;
  const totalContractPrice = Math.round((hiveFees + transportCost + managementCost) * 100) / 100;
  const pricePerHive = hiveCount > 0 ? Math.round((totalContractPrice / hiveCount) * 100) / 100 : 0;
  const pricePerHivePerWeek = (hiveCount > 0 && durationWeeks > 0) ? Math.round((totalContractPrice / hiveCount / durationWeeks) * 100) / 100 : 0;

  return { hiveFees, transportCost, managementCost, totalContractPrice, pricePerHive, pricePerHivePerWeek };
}
