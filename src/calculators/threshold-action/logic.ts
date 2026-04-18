export type Season = 'early-spring' | 'late-spring' | 'summer' | 'late-summer' | 'fall';

export interface ThresholdInputs {
  mitesPerHundred: number;
  season: Season;
  hasSupersOn: boolean;
  broodPresent: boolean;
  queenRightConfirmed: boolean;
  daysUntilFlow: number;
}

export interface ThresholdResult {
  threshold: number;
  aboveThreshold: boolean;
  urgency: 'none' | 'monitor' | 'plan' | 'treat-soon' | 'treat-now';
  urgencyLabel: string;
  recommendation: string;
  treatmentOptions: Array<{ name: string; suitable: boolean; reason: string }>;
  timeframeMessage: string;
}

const THRESHOLDS: Record<Season, number> = {
  'early-spring': 1,
  'late-spring': 2,
  'summer': 2,
  'late-summer': 2,
  'fall': 3,
};

export function calculateThreshold(inputs: ThresholdInputs): ThresholdResult {
  const { mitesPerHundred, season, hasSupersOn, broodPresent, daysUntilFlow } = inputs;
  const threshold = THRESHOLDS[season];
  const aboveThreshold = mitesPerHundred >= threshold;

  let urgency: ThresholdResult['urgency'];
  let urgencyLabel: string;
  let recommendation: string;

  const ratio = mitesPerHundred / threshold;

  if (mitesPerHundred < threshold * 0.5) {
    urgency = 'none';
    urgencyLabel = 'No action needed';
    recommendation = 'Mite levels are well below threshold. Continue regular monitoring every 4 weeks.';
  } else if (mitesPerHundred < threshold) {
    urgency = 'monitor';
    urgencyLabel = 'Monitor closely';
    recommendation = 'Mite levels are approaching threshold. Re-test in 2 weeks. Prepare treatment supplies.';
  } else if (ratio < 1.5) {
    urgency = 'plan';
    urgencyLabel = 'Plan treatment';
    recommendation = 'Mite levels have reached threshold. Plan and begin treatment within the next 1–2 weeks.';
  } else if (ratio < 2.5) {
    urgency = 'treat-soon';
    urgencyLabel = 'Treat soon';
    recommendation = 'Mite levels are significantly above threshold. Treat within the next 7 days to prevent colony damage.';
  } else {
    urgency = 'treat-now';
    urgencyLabel = 'Treat immediately';
    recommendation = 'Critical mite levels. Begin treatment today. Colony health and survival are at serious risk.';
  }

  const treatmentOptions = [
    {
      name: 'Oxalic acid vaporization (OAV)',
      suitable: !hasSupersOn,
      reason: hasSupersOn ? 'Remove supers before treating' : broodPresent ? 'Use 3-round protocol with brood' : 'Single treatment effective when broodless',
    },
    {
      name: 'Formic acid (MAQS / Formic Pro)',
      suitable: !hasSupersOn || true, // Can be used with supers in some jurisdictions
      reason: 'Can be used with honey supers in some regions. Check local label.',
    },
    {
      name: 'Apivar (amitraz strips)',
      suitable: !hasSupersOn && daysUntilFlow > 42,
      reason: !hasSupersOn && daysUntilFlow > 42 ? '42-day treatment, no supers' : 'Needs 42+ days and no supers',
    },
    {
      name: 'Apiguard (thymol)',
      suitable: !hasSupersOn,
      reason: hasSupersOn ? 'Remove supers first' : 'Temperature must be above 59°F (15°C)',
    },
    {
      name: 'Drone brood removal',
      suitable: broodPresent && urgency !== 'treat-now',
      reason: broodPresent ? 'Supplemental method - reduces mites 10–20%' : 'Requires drone brood to be present',
    },
  ];

  let timeframeMessage: string;
  if (daysUntilFlow <= 14) {
    timeframeMessage = 'Honey flow is imminent. Fast-acting treatments like OAV or formic acid are preferred.';
  } else if (daysUntilFlow <= 42) {
    timeframeMessage = 'Flow approaching within 6 weeks. Choose a treatment that completes before supers go on.';
  } else {
    timeframeMessage = 'Sufficient time before flow for any treatment method.';
  }

  return { threshold, aboveThreshold, urgency, urgencyLabel, recommendation, treatmentOptions, timeframeMessage };
}
