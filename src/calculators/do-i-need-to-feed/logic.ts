export interface DoINeedToFeedInputs {
  currentStoresLbs: number; framesOfBees: number; season: 'spring' | 'summer' | 'fall' | 'winter';
  daysUntilForage: number; hiveFeltWeight: 'very-light' | 'light' | 'medium' | 'heavy';
  flowActive: boolean;
}
export interface DoINeedToFeedResult {
  answer: 'yes' | 'probably' | 'monitor' | 'no';
  answerLabel: string; explanation: string;
  whatToFeed: string; howMuch: string; howOften: string;
  urgency: string;
}
export function calculateDoINeedToFeed(inputs: DoINeedToFeedInputs): DoINeedToFeedResult {
  const { currentStoresLbs, framesOfBees, season, daysUntilForage, hiveFeltWeight, flowActive } = inputs;
  const dailyConsumption = framesOfBees * 0.12;
  const daysOfStores = dailyConsumption > 0 ? currentStoresLbs / dailyConsumption : 999;

  let answer: DoINeedToFeedResult['answer'];
  let answerLabel: string, explanation: string, whatToFeed: string, howMuch: string, howOften: string, urgency: string;

  if (flowActive && currentStoresLbs > 10) {
    answer = 'no';
    answerLabel = 'No - nectar flow is active';
    explanation = 'Bees are bringing in their own food. No need to feed during an active flow.';
    whatToFeed = 'Nothing - let them forage'; howMuch = 'N/A'; howOften = 'N/A'; urgency = 'None';
  } else if (daysOfStores < 7) {
    answer = 'yes';
    answerLabel = 'Yes - feed immediately';
    explanation = `Stores will last only ~${Math.round(daysOfStores)} days. This colony is at risk of starvation.`;
    urgency = 'Urgent - feed today';
    if (season === 'winter') { whatToFeed = 'Fondant or dry sugar (too cold for syrup)'; howMuch = `${Math.ceil(framesOfBees * 0.5)} lbs`; howOften = 'Check weekly'; }
    else { whatToFeed = season === 'fall' ? '2:1 sugar syrup' : '1:1 sugar syrup'; howMuch = `${Math.ceil(framesOfBees * 0.3)} gallons`; howOften = 'Refill every 2-3 days'; }
  } else if (daysOfStores < daysUntilForage || hiveFeltWeight === 'very-light') {
    answer = 'probably';
    answerLabel = 'Probably - stores are getting low';
    explanation = `Stores may not last until forage is available (~${daysUntilForage} days away). Better to feed now than risk starvation.`;
    urgency = 'Soon - within the next few days';
    whatToFeed = season === 'fall' ? '2:1 sugar syrup' : season === 'winter' ? 'Fondant or sugar board' : '1:1 sugar syrup';
    howMuch = `${Math.ceil(framesOfBees * 0.2)} gallons`; howOften = 'Refill when empty (check every 3-5 days)';
  } else if (daysOfStores < daysUntilForage + 14 || hiveFeltWeight === 'light') {
    answer = 'monitor';
    answerLabel = 'Monitor - check again in a week';
    explanation = 'Stores are adequate for now but could become tight. Heft the hive again in 7 days.';
    urgency = 'Not urgent - recheck in 7 days';
    whatToFeed = 'Have 1:1 syrup ready just in case'; howMuch = 'Prepare 1 gallon per hive'; howOften = 'Only if hive gets lighter';
  } else {
    answer = 'no';
    answerLabel = 'No - stores are sufficient';
    explanation = `Colony has ~${Math.round(daysOfStores)} days of stores. They should be fine until natural forage is available.`;
    urgency = 'None'; whatToFeed = 'Nothing needed'; howMuch = 'N/A'; howOften = 'Regular inspections';
  }

  return { answer, answerLabel, explanation, whatToFeed, howMuch, howOften, urgency };
}
