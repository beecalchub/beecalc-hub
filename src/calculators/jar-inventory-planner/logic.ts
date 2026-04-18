export interface JarPlannerInputs {
  expectedHoneyLbs: number;
  jarSizes: Array<{ sizeOz: number; percent: number }>;
  extraJarPercent: number;
}

export interface JarPlannerLine {
  sizeOz: number;
  jarCount: number;
  lidCount: number;
  labelCount: number;
  honeyUsedLbs: number;
}

export interface JarPlannerResult {
  lines: JarPlannerLine[];
  totalJars: number;
  totalLids: number;
  totalLabels: number;
  honeyAccountedLbs: number;
}

export function calculateJarInventory(inputs: JarPlannerInputs): JarPlannerResult {
  const { expectedHoneyLbs, jarSizes, extraJarPercent } = inputs;
  const totalOz = expectedHoneyLbs * 16;

  const lines: JarPlannerLine[] = jarSizes.map((js) => {
    const ozForThisSize = totalOz * (js.percent / 100);
    const baseJars = Math.ceil(ozForThisSize / js.sizeOz);
    const jarCount = Math.ceil(baseJars * (1 + extraJarPercent / 100));
    const honeyUsedLbs = Math.round((baseJars * js.sizeOz) / 16 * 10) / 10;
    return { sizeOz: js.sizeOz, jarCount, lidCount: jarCount, labelCount: jarCount, honeyUsedLbs };
  });

  const totalJars = lines.reduce((s, l) => s + l.jarCount, 0);
  const totalLids = totalJars;
  const totalLabels = totalJars;
  const honeyAccountedLbs = lines.reduce((s, l) => s + l.honeyUsedLbs, 0);

  return { lines, totalJars, totalLids, totalLabels, honeyAccountedLbs: Math.round(honeyAccountedLbs * 10) / 10 };
}
