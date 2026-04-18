export interface BottlingInputs {
  totalHoneyLbs: number;
  jarSizeOz: number;
  overheadPercent: number;
}

export interface BottlingResult {
  totalHoneyOz: number;
  usableHoneyOz: number;
  jarCount: number;
  leftoverOz: number;
  honeyPerJarLbs: number;
  totalWeightLbs: number;
}

export const JAR_SIZES = [
  { value: 2, label: '2 oz (sampler)' },
  { value: 8, label: '8 oz (half pint)' },
  { value: 12, label: '12 oz' },
  { value: 16, label: '1 lb (16 oz)' },
  { value: 24, label: '1.5 lb (24 oz)' },
  { value: 32, label: '2 lb (32 oz)' },
  { value: 48, label: '3 lb (48 oz)' },
];

export function calculateBottling(inputs: BottlingInputs): BottlingResult {
  const { totalHoneyLbs, jarSizeOz, overheadPercent } = inputs;

  const totalHoneyOz = totalHoneyLbs * 16;
  const usableHoneyOz = totalHoneyOz * (1 - overheadPercent / 100);
  const jarCount = Math.floor(usableHoneyOz / jarSizeOz);
  const leftoverOz = Math.round((usableHoneyOz - jarCount * jarSizeOz) * 10) / 10;
  const honeyPerJarLbs = Math.round((jarSizeOz / 16) * 1000) / 1000;
  const totalWeightLbs = Math.round(jarCount * honeyPerJarLbs * 10) / 10;

  return { totalHoneyOz, usableHoneyOz: Math.round(usableHoneyOz * 10) / 10, jarCount, leftoverOz, honeyPerJarLbs, totalWeightLbs };
}
