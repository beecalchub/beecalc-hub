export interface JarPriceInputs {
  jarSizeOz: number; costPerJar: number; costOfHoneyPerLb: number;
  labelAndLidCost: number; sellingVenue: 'farmers-market' | 'retail-store' | 'online' | 'friends';
  region: 'urban' | 'suburban' | 'rural'; isRawUnfiltered: boolean;
  isVarietal: boolean; isOrganic: boolean;
}
export interface JarPriceResult {
  costPerJar: number; suggestedPrice: number; priceRange: { min: number; max: number };
  profitPerJar: number; profitMarginPercent: number;
  pricePerOz: number; pricePerLb: number;
  positioning: string; tips: string[];
}
export function calculateJarPrice(inputs: JarPriceInputs): JarPriceResult {
  const { jarSizeOz, costPerJar, costOfHoneyPerLb, labelAndLidCost, sellingVenue, region, isRawUnfiltered, isVarietal, isOrganic } = inputs;

  const honeyWeightLbs = jarSizeOz / 16 * 1.42; // honey is denser than water
  const honeyCost = honeyWeightLbs * costOfHoneyPerLb;
  const totalCost = costPerJar + honeyCost + labelAndLidCost;

  // Base price per oz by venue
  const basePricePerOz: Record<string, number> = { 'farmers-market': 0.70, 'retail-store': 0.55, 'online': 0.80, 'friends': 0.50 };
  const regionMult: Record<string, number> = { urban: 1.2, suburban: 1.0, rural: 0.85 };

  let pricePerOz = basePricePerOz[sellingVenue] * regionMult[region];
  if (isRawUnfiltered) pricePerOz *= 1.15;
  if (isVarietal) pricePerOz *= 1.25;
  if (isOrganic) pricePerOz *= 1.3;

  const suggestedPrice = Math.round(jarSizeOz * pricePerOz * 4) / 4; // round to nearest $0.25
  const minPrice = Math.round(suggestedPrice * 0.8 * 4) / 4;
  const maxPrice = Math.round(suggestedPrice * 1.2 * 4) / 4;

  const profitPerJar = Math.round((suggestedPrice - totalCost) * 100) / 100;
  const profitMarginPercent = suggestedPrice > 0 ? Math.round((profitPerJar / suggestedPrice) * 1000) / 10 : 0;

  const premiums: string[] = [];
  if (isRawUnfiltered) premiums.push('raw/unfiltered');
  if (isVarietal) premiums.push('varietal/single-source');
  if (isOrganic) premiums.push('organic');
  const positioning = premiums.length > 0 ? `Premium positioning: ${premiums.join(', ')}. Customers will pay more for these qualities.` : 'Standard local honey. Compete on freshness and community connection.';

  const tips: string[] = [];
  if (sellingVenue === 'farmers-market') tips.push('Offer samples - tasting sells honey better than anything else.');
  if (sellingVenue === 'retail-store') tips.push('Stores typically take 30-40% margin. Your wholesale price should be ~60% of retail.');
  if (sellingVenue === 'online') tips.push('Factor in shipping costs - honey is heavy. Consider flat-rate boxes.');
  tips.push('Attractive labels significantly increase perceived value.');
  if (profitMarginPercent < 30) tips.push('Your margin is thin. Consider raising prices or reducing costs.');

  return { costPerJar: Math.round(totalCost * 100) / 100, suggestedPrice, priceRange: { min: minPrice, max: maxPrice }, profitPerJar, profitMarginPercent, pricePerOz: Math.round(pricePerOz * 100) / 100, pricePerLb: Math.round(pricePerOz * 16 * 100) / 100, positioning, tips };
}
