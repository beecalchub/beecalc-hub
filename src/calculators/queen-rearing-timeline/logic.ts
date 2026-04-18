export interface QueenTimelineInputs {
  graftDate: string; // ISO date string
  method: 'graft' | 'walk-away' | 'emergency';
}

export interface TimelineMilestone {
  day: number;
  date: Date;
  event: string;
  description: string;
  critical: boolean;
}

export interface QueenTimelineResult {
  milestones: TimelineMilestone[];
  totalDays: number;
  earliestLayingDate: Date;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function calculateQueenTimeline(inputs: QueenTimelineInputs): QueenTimelineResult {
  const graft = new Date(inputs.graftDate + 'T12:00:00');

  if (inputs.method === 'graft') {
    const milestones: TimelineMilestone[] = [
      { day: 0, date: graft, event: 'Graft Day', description: 'Transfer larvae into queen cups. Use larvae <24 hours old.', critical: true },
      { day: 1, date: addDays(graft, 1), event: 'Check Acceptance', description: 'Inspect cell builder for accepted grafts. Remove rejected cups.', critical: true },
      { day: 3, date: addDays(graft, 3), event: 'Larvae Fed (Day 3)', description: 'Queen larvae are being fed royal jelly by nurse bees.', critical: false },
      { day: 5, date: addDays(graft, 5), event: 'Cells Capped', description: 'Queen cells should be sealed/capped by now.', critical: true },
      { day: 8, date: addDays(graft, 8), event: 'Transfer to Mating Nucs', description: 'Move capped cells to mating nucs or incubator. Handle gently!', critical: true },
      { day: 10, date: addDays(graft, 10), event: 'Emergence Expected', description: 'Virgin queens emerge from cells (day 10-12 from graft).', critical: true },
      { day: 12, date: addDays(graft, 12), event: 'Emergence Window Closes', description: 'All queens should have emerged by now. Remove any unhatched cells.', critical: false },
      { day: 16, date: addDays(graft, 16), event: 'Mating Flights Begin', description: 'Virgin queens begin orientation and mating flights (weather dependent).', critical: true },
      { day: 20, date: addDays(graft, 20), event: 'Mating Window', description: 'Queens should mate within ~2 weeks of emergence. Check weather.', critical: false },
      { day: 24, date: addDays(graft, 24), event: 'Check for Eggs', description: 'Look for eggs in mating nuc. Queen should be laying by now.', critical: true },
      { day: 28, date: addDays(graft, 28), event: 'Confirm Laying Pattern', description: 'Evaluate brood pattern. Good queens show solid, compact pattern.', critical: true },
      { day: 35, date: addDays(graft, 35), event: 'Ready for Introduction', description: 'Mated, laying queens can be introduced to queenless colonies.', critical: false },
    ];
    return { milestones, totalDays: 35, earliestLayingDate: addDays(graft, 24) };
  }

  // Walk-away split: from the time eggs/young larvae are left queenless
  const milestones: TimelineMilestone[] = [
    { day: 0, date: graft, event: 'Split Made / Queen Removed', description: 'Colony made queenless. Bees will start emergency cells from young larvae.', critical: true },
    { day: 1, date: addDays(graft, 1), event: 'Emergency Cells Started', description: 'Workers begin building queen cells around suitable larvae.', critical: false },
    { day: 8, date: addDays(graft, 8), event: 'Cells Capped', description: 'Emergency queen cells sealed.', critical: false },
    { day: 14, date: addDays(graft, 14), event: 'Queen Emerges', description: 'First virgin queen emerges (~16 days from egg, ~12 from when cell started).', critical: true },
    { day: 20, date: addDays(graft, 20), event: 'Mating Flights', description: 'Virgin queen takes mating flights.', critical: true },
    { day: 28, date: addDays(graft, 28), event: 'Check for Eggs', description: 'Look for eggs. Allow up to 4 weeks from split.', critical: true },
    { day: 35, date: addDays(graft, 35), event: 'Confirm Laying', description: 'Brood pattern established. Colony re-queened.', critical: false },
  ];

  return { milestones, totalDays: 35, earliestLayingDate: addDays(graft, 28) };
}
