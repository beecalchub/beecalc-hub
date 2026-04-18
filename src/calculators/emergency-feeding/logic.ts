export interface EmergencyFeedingInputs {
  framesOfBees: number;
  currentStoresLbs: number;
  outsideTempF: number;
  daysUntilForage: number;
}

export interface EmergencyFeedingResult {
  isEmergency: boolean;
  daysOfStoresRemaining: number;
  method: string;
  methodReason: string;
  amountNeeded: string;
  instructions: string[];
  urgency: 'none' | 'watch' | 'feed-soon' | 'feed-now';
}

export function calculateEmergencyFeeding(inputs: EmergencyFeedingInputs): EmergencyFeedingResult {
  const { framesOfBees, currentStoresLbs, outsideTempF, daysUntilForage } = inputs;
  const dailyConsumption = framesOfBees * 0.12;
  const daysOfStoresRemaining = dailyConsumption > 0 ? Math.floor(currentStoresLbs / dailyConsumption) : 999;
  const isEmergency = daysOfStoresRemaining < daysUntilForage;

  let urgency: EmergencyFeedingResult['urgency'];
  if (daysOfStoresRemaining > daysUntilForage + 14) urgency = 'none';
  else if (daysOfStoresRemaining > daysUntilForage) urgency = 'watch';
  else if (daysOfStoresRemaining > 7) urgency = 'feed-soon';
  else urgency = 'feed-now';

  let method: string, methodReason: string, amountNeeded: string;
  const instructions: string[] = [];

  if (outsideTempF < 40) {
    method = 'Dry sugar or fondant (sugar board)';
    methodReason = 'Too cold for bees to process liquid syrup - they need solid feed they can nibble.';
    amountNeeded = `${Math.ceil(framesOfBees * 0.5)} lbs of dry sugar or fondant`;
    instructions.push('Place dry white sugar directly on newspaper on top bars over the cluster.',
      'Or use a pre-made fondant board / sugar board.',
      'Add a shim or empty super to make room for the feed.',
      'Check every 2 weeks and add more if consumed.');
  } else if (outsideTempF < 55) {
    method = 'Thick syrup (2:1) or fondant';
    methodReason = 'Cool but bees can still process thick syrup. Fondant also works.';
    amountNeeded = `${Math.ceil(framesOfBees * 0.3)} lbs sugar as 2:1 syrup or fondant`;
    instructions.push('Mix 2:1 sugar syrup (2 parts sugar to 1 part water by weight).',
      'Use a top feeder or baggie feeder directly over the cluster.',
      'Feed in evening to reduce robbing risk.',
      'Fondant is also excellent in this temperature range.');
  } else {
    method = '1:1 sugar syrup';
    methodReason = 'Warm enough for bees to readily take and process liquid syrup.';
    amountNeeded = `${Math.ceil(framesOfBees * 0.25)} gallons of 1:1 syrup`;
    instructions.push('Mix 1:1 sugar syrup (equal parts sugar and water by weight).',
      'Use entrance feeder, top feeder, or frame feeder.',
      'Refill every 2–3 days until stores are adequate.',
      'Feed in the evening to minimize robbing.');
  }

  return { isEmergency, daysOfStoresRemaining, method, methodReason, amountNeeded, instructions, urgency };
}
