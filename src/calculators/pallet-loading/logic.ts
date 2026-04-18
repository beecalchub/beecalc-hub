export interface Inputs { hiveCount: number; hivesPerPallet: number; palletsPerTruck: number; }
export interface Result { palletsNeeded: number; trucksNeeded: number; hivesPerTruck: number; note: string; }
export function calculate(i: Inputs): Result {
  const pallets = Math.ceil(i.hiveCount / i.hivesPerPallet);
  const trucks = Math.ceil(pallets / i.palletsPerTruck);
  const hivesPerTruck = i.hivesPerPallet * i.palletsPerTruck;
  const note = i.hivesPerPallet === 4 ? 'Standard 4-way pallets are most common for commercial.' : i.hivesPerPallet === 6 ? '6-way pallets save space but require more coordination.' : '8-way pallets maximize density but are heavy.';
  return { palletsNeeded: pallets, trucksNeeded: trucks, hivesPerTruck, note };
}
