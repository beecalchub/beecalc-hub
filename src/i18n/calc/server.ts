// Server-only: builds the small Russian dictionary for ONE calculator page.
// The full dictionary stays on the server; only the strings a page needs are sent to the browser.
import dict from './ru-dict.json';
import index from './ru-index.json';
import type { CalcDict } from '@/i18n/runtime';

type IndexEntry = { e: string[]; t: string[] };
const IDX = index as Record<string, IndexEntry>;
const EXACT = (dict as { exact: Record<string, string>; tpl: Record<string, string> }).exact;
const TPL = (dict as { exact: Record<string, string>; tpl: Record<string, string> }).tpl;

export function getRuCalcDict(slug: string): CalcDict {
  const exact: Record<string, string> = {};
  const tpl: Array<[string, string]> = [];
  const seenTpl = new Set<string>();
  for (const part of ['_common', slug]) {
    const entry = IDX[part];
    if (!entry) continue;
    for (const k of entry.e) if (EXACT[k] !== undefined) exact[k] = EXACT[k];
    for (const k of entry.t) {
      if (TPL[k] !== undefined && !seenTpl.has(k)) {
        seenTpl.add(k);
        tpl.push([k, TPL[k]]);
      }
    }
  }
  return { exact, tpl };
}
