import React from 'react';
import { RU_UI } from '@/i18n/ru';

const BMC_URL = 'https://www.buymeacoffee.com/beecalchub';
const DONATION_URL = 'https://donate.stripe.com/8x200k3mE1qH7z46T6eEo00';

export function RuSupportBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-honey-200 bg-gradient-to-r from-honey-50 to-comb-50 ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={compact ? 'text-2xl' : 'text-3xl'} aria-hidden="true">💛</span>
          <div>
            <p className={`font-display text-smoke-900 ${compact ? 'text-base' : 'text-lg'}`}>
              {RU_UI.support.bannerTitle}
            </p>
            <p className="text-sm text-smoke-600">{RU_UI.support.bannerText}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <a
            href={BMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-honey-500 text-white text-sm font-semibold hover:bg-honey-600 transition-colors"
          >
            ☕ {RU_UI.support.coffee}
          </a>
          <a
            href={DONATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border-2 border-honey-300 text-honey-800 text-sm font-semibold hover:border-honey-400 hover:bg-honey-50 transition-colors"
          >
            💝 {RU_UI.support.donate}
          </a>
        </div>
      </div>
    </div>
  );
}
