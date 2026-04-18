export interface JarLabelInputs {
  jarSizes: Array<{ sizeOz: number; quantity: number }>;
  labelTypes: number; // different label designs
  extraPercent: number;
  sheetsPerRoll: number;
  labelsPerSheet: number;
}

export interface JarLabelResult {
  totalJars: number;
  totalLabels: number;
  labelsWithExtra: number;
  sheetsNeeded: number;
  rollsNeeded: number;
  perSize: Array<{ sizeOz: number; jars: number; labels: number }>;
}

export function calculateJarLabels(inputs: JarLabelInputs): JarLabelResult {
  const { jarSizes, labelTypes, extraPercent, sheetsPerRoll, labelsPerSheet } = inputs;

  const perSize = jarSizes.map((js) => ({
    sizeOz: js.sizeOz,
    jars: js.quantity,
    labels: js.quantity * Math.max(1, labelTypes), // front + back or variants
  }));

  const totalJars = perSize.reduce((s, p) => s + p.jars, 0);
  const totalLabels = perSize.reduce((s, p) => s + p.labels, 0);
  const labelsWithExtra = Math.ceil(totalLabels * (1 + extraPercent / 100));
  const sheetsNeeded = labelsPerSheet > 0 ? Math.ceil(labelsWithExtra / labelsPerSheet) : 0;
  const rollsNeeded = sheetsPerRoll > 0 ? Math.ceil(sheetsNeeded / sheetsPerRoll) : 0;

  return { totalJars, totalLabels, labelsWithExtra, sheetsNeeded, rollsNeeded, perSize };
}
