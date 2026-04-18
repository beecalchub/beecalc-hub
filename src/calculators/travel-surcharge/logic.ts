export interface Inputs { milesEachWay: number; baseRatePerMile: number; fuelPricePerGallon: number; truckMpg: number; }
export interface Result { roundTripMiles: number; fuelCost: number; totalSurcharge: number; perMile: number; }
export function calculate(i: Inputs): Result {
  const miles = i.milesEachWay * 2;
  const fuel = Math.round(miles / i.truckMpg * i.fuelPricePerGallon * 100) / 100;
  const surcharge = Math.round((miles * i.baseRatePerMile + fuel) * 100) / 100;
  return { roundTripMiles: miles, fuelCost: fuel, totalSurcharge: surcharge, perMile: miles > 0 ? Math.round(surcharge / miles * 100) / 100 : 0 };
}
