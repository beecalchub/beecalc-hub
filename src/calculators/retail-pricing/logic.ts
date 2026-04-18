export interface RetailPricingInputs {
  costPerLb: number;
  jarSizeOz: number;
  targetMarginPercent: number;
  localAvgPrice: number;
}

export interface RetailPricingResult {
  costPerJar: number;
  suggestedPrice: number;
  marginAtSuggested: number;
  priceAtLocalAvg: number;
  marginAtLocalAvg: number;
  pricePerOz: number;
}

export function calculateRetailPricing(inputs: RetailPricingInputs): RetailPricingResult {
  const { costPerLb, jarSizeOz, targetMarginPercent, localAvgPrice } = inputs;
  const costPerOz = costPerLb / 16;
  const costPerJar = Math.round(costPerOz * jarSizeOz * 100) / 100;
  const suggestedPrice = Math.round((costPerJar / (1 - targetMarginPercent / 100)) * 100) / 100;
  const marginAtSuggested = targetMarginPercent;
  const marginAtLocalAvg = localAvgPrice > 0 ? Math.round(((localAvgPrice - costPerJar) / localAvgPrice) * 10000) / 100 : 0;
  const pricePerOz = suggestedPrice > 0 ? Math.round((suggestedPrice / jarSizeOz) * 100) / 100 : 0;

  return { costPerJar, suggestedPrice, marginAtSuggested, priceAtLocalAvg: localAvgPrice, marginAtLocalAvg, pricePerOz };
}
