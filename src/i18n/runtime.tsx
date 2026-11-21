'use client';

import React, { createContext, useContext, useMemo } from 'react';

// Dictionary passed from the server page to the client for ONE calculator page.
export interface CalcDict {
  exact: Record<string, string>;
  tpl: Array<[string, string]>; // [english template with {0}.., russian template]
}

export type Translator = ((s: string) => string) & { unit: (unit: string, value: unknown) => string };

const identity: Translator = Object.assign((s: string) => s, { unit: (unit: string) => unit });
const I18nContext = createContext<Translator>(identity);

const MONTHS: Record<string, [string, string]> = {
  jan: ['янв.', 'января'], feb: ['февр.', 'февраля'], mar: ['марта', 'марта'], apr: ['апр.', 'апреля'],
  may: ['мая', 'мая'], jun: ['июня', 'июня'], jul: ['июля', 'июля'], aug: ['авг.', 'августа'],
  sep: ['сент.', 'сентября'], oct: ['окт.', 'октября'], nov: ['нояб.', 'ноября'], dec: ['дек.', 'декабря'],
};
const DAYS: Record<string, [string, string]> = {
  mon: ['пн', 'понедельник'], tue: ['вт', 'вторник'], wed: ['ср', 'среда'], thu: ['чт', 'четверг'],
  fri: ['пт', 'пятница'], sat: ['сб', 'суббота'], sun: ['вс', 'воскресенье'],
};
const DATE_RE =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun)([a-z]*),\s+)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)([a-z]*)\.?\s+(\d{1,2})(?:,\s+(\d{4}))?$/;

function translateDate(s: string): string | null {
  const m = DATE_RE.exec(s);
  if (!m) return null;
  const [, wd, wdRest, mon, monRest, day, year] = m;
  const long = (monRest && monRest.length > 0 && mon !== 'May') || (wdRest && wdRest.length > 0);
  const month = MONTHS[mon.toLowerCase()][long ? 1 : 0];
  let out = `${day} ${month}`;
  if (year) out += ` ${year}${long ? ' г.' : ''}`;
  if (wd) out = `${DAYS[wd.toLowerCase()][wdRest ? 1 : 0]}, ${out}`;
  return out;
}

// Russian plural forms. Dictionary values may be "@pl:one|few|many" (e.g. "@pl:рамка|рамки|рамок").
const PL = '@pl:';
function pluralForm(forms: string[], numText: string | null): string {
  if (forms.length < 3) return forms[forms.length - 1];
  if (numText === null) return forms[2];
  const m = /(\d[\d\s,]*)(?:\.(\d+))?\s*$/.exec(numText.trim());
  if (!m) return forms[2];
  if (m[2] !== undefined) return forms[1]; // decimals: "2.5 рамки"
  const n = parseInt(m[1].replace(/[\s,]/g, ''), 10);
  if (isNaN(n)) return forms[2];
  const n100 = n % 100;
  const n10 = n % 10;
  if (n100 >= 11 && n100 <= 14) return forms[2];
  if (n10 === 1) return forms[0];
  if (n10 >= 2 && n10 <= 4) return forms[1];
  return forms[2];
}
function resolvePl(value: string, numText: string | null): string {
  return value.startsWith(PL) ? pluralForm(value.slice(PL.length).split('|'), numText) : value;
}

const TIME_RE = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/;
function translateTime(s: string): string | null {
  const m = TIME_RE.exec(s);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (m[3] === 'PM') h += 12;
  return `${h}:${m[2]}`;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface CompiledTpl {
  re: RegExp;
  order: number[]; // placeholder index for each capture group
  ru: string;
  weight: number;
  hasLetters: boolean;
}

function compileTpl(en: string, ru: string): CompiledTpl {
  const parts = en.split(/\{(\d+)\}/);
  let src = '^';
  const order: number[] = [];
  let staticText = '';
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      staticText += parts[i];
      src += escapeRe(parts[i]).replace(/ /g, '\\s+');
    } else {
      order.push(parseInt(parts[i], 10));
      src += '([\\s\\S]*?)';
    }
  }
  src += '$';
  return {
    re: new RegExp(src),
    order,
    ru,
    weight: staticText.length,
    hasLetters: /[A-Za-zА-Яа-я]/.test(staticText),
  };
}

const NUM_PREFIX = /^([~≈<>≤≥+\-−$×x]*\s?\d[\d,.\s]*%?\+?)(\s+)(\S[\s\S]*)$/;
const SEPARATORS = [' - ', ' – ', ' — ', ': ', ' / ', '; ', ' • ', ' · ', ', ', ' → ', ' + '];

export function buildTranslator(dict: CalcDict): Translator {
  const exact = dict.exact;
  const compiled = dict.tpl.map(([en, ru]) => compileTpl(en, ru)).sort((a, b) => b.weight - a.weight);
  const withLetters = compiled.filter((c) => c.hasLetters);
  const plain = compiled.filter((c) => !c.hasLetters);
  const cache = new Map<string, string>();

  function applyTpl(list: CompiledTpl[], core: string, depth: number): string | null {
    for (const c of list) {
      const m = c.re.exec(core);
      if (!m) continue;
      const holes: Record<number, string> = {};
      c.order.forEach((idx, g) => {
        holes[idx] = tr(m[g + 1], depth + 1);
      });
      return c.ru
        .replace(/\{(\d+)\|([^{}]*)\}/g, (_, n, forms) => {
          const h = holes[n] !== undefined ? holes[n] : '';
          return `${h} ${pluralForm(String(forms).split('|'), h)}`;
        })
        .replace(/\{(\d+)\}/g, (_, n) => (holes[n] !== undefined ? holes[n] : ''));
    }
    return null;
  }

  function trCore(core: string, depth: number): string {
    const hit = exact[core];
    if (hit !== undefined) return resolvePl(hit, null);
    if (depth > 4) return core;

    const d = translateDate(core) || translateTime(core);
    if (d) return d;

    const t1 = applyTpl(withLetters, core, depth);
    if (t1 !== null) return t1;

    const np = NUM_PREFIX.exec(core);
    if (np) {
      const unitHit = exact[np[3]];
      if (unitHit !== undefined) return np[1] + np[2] + resolvePl(unitHit, np[1]);
      const rest = tr(np[3], depth + 1);
      if (rest !== np[3]) return np[1] + np[2] + rest;
    }

    // "Something (detail)" -> translate both parts
    const par = /^([^()]+?)\s*\(([^()]+)\)$/.exec(core);
    if (par) {
      const a = tr(par[1], depth + 1);
      const b = tr(par[2], depth + 1);
      if (a !== par[1] || b !== par[2]) return `${a} (${b})`;
    }

    for (const sep of SEPARATORS) {
      const i = core.indexOf(sep);
      if (i > 0 && i < core.length - sep.length) {
        const left = core.slice(0, i);
        const right = core.slice(i + sep.length);
        const a = tr(left, depth + 1);
        const b = tr(right, depth + 1);
        if (a !== left || b !== right) return a + sep + b;
      }
    }

    const t2 = applyTpl(plain, core, depth);
    if (t2 !== null) return t2;

    return core;
  }

  function tr(s: string, depth: number): string {
    if (!s || !/[A-Za-z]/.test(s)) return s;
    const cached = cache.get(s);
    if (cached !== undefined) return cached;
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    if (!m || !m[2]) return s;
    const core = m[2].replace(/\s+/g, ' ');
    const out = m[1] + trCore(core, depth) + m[3];
    if (cache.size < 5000) cache.set(s, out);
    return out;
  }

  // Unit shown next to a separate number (e.g. ResultRow): pick the right Russian plural form
  function unit(u: string, value: unknown): string {
    const key = u.trim().replace(/\s+/g, ' ');
    const hit = exact[key];
    if (hit !== undefined && hit.startsWith(PL)) {
      const numText = typeof value === 'number' ? String(value) : typeof value === 'string' ? value : null;
      return resolvePl(hit, numText);
    }
    return tr(u, 0);
  }

  return Object.assign((s: string) => tr(s, 0), { unit });
}

export function I18nProvider({ dict, children }: { dict: CalcDict; children: React.ReactNode }) {
  const translator = useMemo(() => buildTranslator(dict), [dict]);
  return <I18nContext.Provider value={translator}>{children}</I18nContext.Provider>;
}

// Hook: returns a function that translates strings and passes everything else through untouched.
export function useT(): (<V>(v: V) => V) & { unit: (unit: string, value: unknown) => string } {
  const translator = useContext(I18nContext);
  return useMemo(
    () =>
      Object.assign(
        function t<V>(v: V): V {
          return (typeof v === 'string' ? translator(v) : v) as V;
        },
        { unit: translator.unit }
      ),
    [translator]
  );
}

// Component form for JSX: <T v="Text" /> or <T v={expr} />
export function T({ v }: { v: React.ReactNode }) {
  const translator = useContext(I18nContext);
  return <>{typeof v === 'string' ? translator(v) : v}</>;
}
