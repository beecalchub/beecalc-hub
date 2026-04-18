export type WashMethod = 'alcohol' | 'sugar-roll' | 'co2';

export interface VarroaInputs {
  method: WashMethod;
  mitesFound: number;
  beeSampleSize: number;
}

export interface VarroaResult {
  infestationPercent: number;
  mitesPerHundred: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  recommendation: string;
  thresholdSpring: number;
  thresholdLateSummer: number;
}

export function calculateVarroaRate(inputs: VarroaInputs): VarroaResult {
  const { mitesFound, beeSampleSize } = inputs;

  const infestationPercent = beeSampleSize > 0 ? (mitesFound / beeSampleSize) * 100 : 0;
  const mitesPerHundred = beeSampleSize > 0 ? (mitesFound / beeSampleSize) * 100 : 0;

  let riskLevel: VarroaResult['riskLevel'];
  let recommendation: string;

  if (infestationPercent < 1) {
    riskLevel = 'low';
    recommendation = 'Mite levels are low. Continue monitoring monthly. No treatment needed at this time.';
  } else if (infestationPercent < 2) {
    riskLevel = 'moderate';
    recommendation = 'Mite levels are moderate. Plan treatment within 2-4 weeks, especially if brood is present. Re-test in 2 weeks.';
  } else if (infestationPercent < 3) {
    riskLevel = 'high';
    recommendation = 'Mite levels are high. Treat promptly - within 1-2 weeks. Colony health is at risk. Choose an appropriate treatment for the season.';
  } else {
    riskLevel = 'critical';
    recommendation = 'Mite levels are critical. Treat immediately. Colony collapse is likely without intervention. Consider combining treatment methods.';
  }

  return {
    infestationPercent: Math.round(infestationPercent * 100) / 100,
    mitesPerHundred: Math.round(mitesPerHundred * 10) / 10,
    riskLevel,
    recommendation,
    thresholdSpring: 2,
    thresholdLateSummer: 3,
  };
}

export function getMethodInfo(method: WashMethod) {
  const info: Record<WashMethod, { label: string; typicalSample: number; accuracy: string }> = {
    alcohol: { label: 'Alcohol Wash', typicalSample: 300, accuracy: 'High (~90% detection)' },
    'sugar-roll': { label: 'Sugar Roll', typicalSample: 300, accuracy: 'Moderate (~70-80% detection)' },
    co2: { label: 'CO₂ Wash', typicalSample: 300, accuracy: 'High (~90% detection)' },
  };
  return info[method];
}
