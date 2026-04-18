export interface ICalEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  allDay?: boolean;
}

function formatICalDate(date: Date, allDay: boolean = false): string {
  if (allDay) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  }
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}@beecalchub.com`;
}

export function generateICalString(events: ICalEvent[]): string {
  const now = formatICalDate(new Date());

  const eventStrings = events
    .map((event) => {
      const allDay = event.allDay !== false;
      const dtStart = allDay
        ? `DTSTART;VALUE=DATE:${formatICalDate(event.startDate, true)}`
        : `DTSTART:${formatICalDate(event.startDate)}`;

      let dtEnd = '';
      if (event.endDate) {
        dtEnd = allDay
          ? `DTEND;VALUE=DATE:${formatICalDate(event.endDate, true)}`
          : `DTEND:${formatICalDate(event.endDate)}`;
      }

      return [
        'BEGIN:VEVENT',
        `UID:${generateUID()}`,
        `DTSTAMP:${now}`,
        dtStart,
        dtEnd,
        `SUMMARY:${escapeICalText(event.title)}`,
        `DESCRIPTION:${escapeICalText(event.description)}`,
        'END:VEVENT',
      ]
        .filter(Boolean)
        .join('\r\n');
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BeeCalc Hub//Queen Rearing Timeline//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    eventStrings,
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICalFile(events: ICalEvent[], filename: string = 'queen-rearing-timeline.ics'): void {
  const icalString = generateICalString(events);
  const blob = new Blob([icalString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
