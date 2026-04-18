import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support BeeCalc Hub',
  description: 'Help keep BeeCalc Hub free for all beekeepers. Buy us a coffee or make a donation.',
};

// ──────────────────────────────────────────────
// CONFIGURE YOUR LINKS HERE:
const BMC_USERNAME = 'beecalchub';
const DONATION_URL = 'https://donate.stripe.com/8x200k3mE1qH7z46T6eEo00';
// ──────────────────────────────────────────────

export default function SupportPage() {
  const bmcUrl = BMC_USERNAME
    ? `https://www.buymeacoffee.com/${BMC_USERNAME}`
    : '#';
  const donateUrl = DONATION_URL || '#';
  const isConfigured = Boolean(BMC_USERNAME || DONATION_URL);

  return (
    <div className="container-page py-10 sm:py-16 max-w-2xl">
      <div className="text-center mb-10">
        <span className="text-5xl mb-4 block" aria-hidden="true">🍯</span>
        <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-4">
          Support BeeCalc Hub
        </h1>
        <p className="text-smoke-600 text-lg leading-relaxed">
          BeeCalc Hub is free, ad-free, and built with love for the beekeeping community.
          If these calculators help you save time, money, or bees - consider supporting
          the project so we can keep it running and build more tools.
        </p>
      </div>

      {/* Buy Me a Coffee */}
      <div className="mb-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFDD00]/20 to-amber-50 border-2 border-[#FFDD00]/30">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">☕</span>
          <div className="flex-1">
            <h2 className="font-display text-xl text-smoke-800 mb-2">Buy Me a Coffee</h2>
            <p className="text-smoke-600 text-sm mb-4">
              A quick, one-time way to say thanks. Every coffee helps cover hosting
              and domain costs. Takes less than a minute.
            </p>
            <a
              href={bmcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFDD00] text-smoke-900 font-semibold text-base hover:bg-[#FFE44D] transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
              style={{ minHeight: 48 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 110 8h-1" />
                <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
                <path d="M6 2v3M10 2v3M14 2v3" />
              </svg>
              Buy Me a Coffee
            </a>
          </div>
        </div>
      </div>

      {/* Donation */}
      <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200/50">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">💝</span>
          <div className="flex-1">
            <h2 className="font-display text-xl text-smoke-800 mb-2">Make a Donation</h2>
            <p className="text-smoke-600 text-sm mb-4">
              Prefer a direct donation? Any amount helps - $5 covers a month of hosting,
              $20 covers the annual domain cost. Every contribution makes a difference.
            </p>
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-smoke-700 font-semibold text-base border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
              style={{ minHeight: 48 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Donate
            </a>
          </div>
        </div>
      </div>

      {/* What your support covers */}
      <div className="rounded-2xl bg-smoke-50 p-6 sm:p-8 mb-10">
        <h2 className="font-display text-lg text-smoke-800 mb-4">Where Your Support Goes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <span className="text-2xl block mb-2" aria-hidden="true">🌐</span>
            <p className="font-medium text-smoke-800 text-sm">Domain & Hosting</p>
            <p className="text-xs text-smoke-500 mt-1">Keeping the site online and fast</p>
          </div>
          <div className="text-center p-4">
            <span className="text-2xl block mb-2" aria-hidden="true">🔧</span>
            <p className="font-medium text-smoke-800 text-sm">New Calculators</p>
            <p className="text-xs text-smoke-500 mt-1">Building more tools for beekeepers</p>
          </div>
          <div className="text-center p-4">
            <span className="text-2xl block mb-2" aria-hidden="true">🐝</span>
            <p className="font-medium text-smoke-800 text-sm">Ad-Free Forever</p>
            <p className="text-xs text-smoke-500 mt-1">No ads, no trackers, just tools</p>
          </div>
        </div>
      </div>

      {/* Thank you */}
      <div className="text-center text-smoke-500 text-sm">
        <p>Thank you for supporting the beekeeping community.</p>
        <p className="mt-1">Every contribution - no matter how small - helps.</p>
      </div>

    </div>
  );
}
