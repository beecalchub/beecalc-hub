export interface SettlingTankInputs { totalHoneyLbs: number; settlingDays: number; batchesPerSeason: number; }
export interface SettlingTankResult { volumeGallons: number; volumeLiters: number; recommendedTankGallons: number; tankHeightInches: number; tankDiameterInches: number; tips: string[]; }
export function calculateSettlingTank(inputs: SettlingTankInputs): SettlingTankResult {
  const { totalHoneyLbs, settlingDays, batchesPerSeason } = inputs;
  const honeyPerBatch = totalHoneyLbs / Math.max(1, batchesPerSeason);
  const volumeGallons = Math.round((honeyPerBatch / 12) * 10) / 10; // 12 lbs/gal
  const headspace = 1.15; // 15% headspace
  const neededGallons = volumeGallons * headspace;
  const standardTanks = [5, 10, 15, 20, 30, 55, 110];
  const recommendedTankGallons = standardTanks.find(t => t >= neededGallons) || Math.ceil(neededGallons / 5) * 5;
  // Approximate dimensions for a cylindrical tank
  const radiusSq = (recommendedTankGallons * 231) / (Math.PI * 24); // assume 24" tall
  const diameter = Math.round(Math.sqrt(radiusSq) * 2 * 10) / 10;
  const tips = [`Let honey settle ${settlingDays}+ days for air bubbles to rise.`, 'Use a honey gate at the bottom for clean bottling.', 'Keep tank covered to prevent moisture absorption.', 'Ideal temperature for settling: 80–90°F (27–32°C).'];
  return { volumeGallons, volumeLiters: Math.round(volumeGallons * 3.785 * 10) / 10, recommendedTankGallons, tankHeightInches: 24, tankDiameterInches: diameter, tips };
}
