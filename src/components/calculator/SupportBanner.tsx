'use client';

import React, { useState, useEffect } from 'react';

interface SupportBannerProps {
  /** Your Buy Me a Coffee username (e.g., 'beecalchub') */
  bmcUsername?: string;
  /** Your PayPal.me link (e.g., 'https://paypal.me/yourname') or other donation URL */
  donationUrl?: string;
  /** Compact mode for sidebar/inline placement */
  compact?: boolean;
  /** Custom CSS class */
  className?: string;
}

/**
 * SupportBanner - clean, non-intrusive "support this project" component.
 *
 * SETUP:
 *
 * 1. Buy Me a Coffee:
 *    - Go to https://www.buymeacoffee.com and create a free account
 *    - Your page will be: buymeacoffee.com/YOUR_USERNAME
 *    - Pass your username as the `bmcUsername` prop
 *
 * 2. Donations (PayPal):
 *    - Go to https://www.paypal.me and create your link
 *    - Your link will be: paypal.me/YOUR_NAME
 *    - Pass the full URL as the `donationUrl` prop
 *
 * 3. Donations (Stripe):
 *    - Create a Stripe payment link at https://dashboard.stripe.com/payment-links
 *    - Pass the link URL as the `donationUrl` prop
 */
export function SupportBanner({
  bmcUsername = '',
  donationUrl = '',
  compact = false,
  className = '',
}: SupportBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Clear any legacy dismissal so users see the banner after updates
    try {
      sessionStorage.removeItem('beecalc-support-dismissed');
      const stored = sessionStorage.getItem('beecalc-support-dismissed-v2');
      if (stored === 'true') setDismissed(true);
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('beecalc-support-dismissed-v2', 'true');
    } catch {
      // sessionStorage unavailable
    }
  };

  if (!hasMounted || dismissed) return null;

  // Use placeholder URLs if not configured - shows the component during development
  const bmcUrl = bmcUsername
    ? `https://www.buymeacoffee.com/${bmcUsername}`
    : '#configure-buymeacoffee';
  const donateUrl = donationUrl || '#configure-donation';
  const isConfigured = Boolean(bmcUsername || donationUrl);

  if (compact) {
    return (
      <div className={`rounded-xl border border-honey-200 bg-gradient-to-r from-honey-50 to-amber-50 p-4 ${className}`}>
        <p className="text-sm text-smoke-700 mb-3">
          <span aria-hidden="true">🐝</span>{' '}
          <span className="font-medium">Enjoy BeeCalc Hub?</span> Help keep it free and ad-free.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={bmcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFDD00] text-smoke-900 font-medium text-sm hover:bg-[#FFE44D] transition-colors shadow-sm"
            style={{ minHeight: 44 }}
          >
            <CoffeeIcon />
            Buy me a coffee
          </a>
          <a
            href={donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-smoke-700 font-medium text-sm border border-smoke-200 hover:border-honey-300 hover:bg-honey-50 transition-colors"
            style={{ minHeight: 44 }}
          >
            <HeartIcon />
            Donate
          </a>
        </div>
        {!isConfigured && (
          <p className="text-[10px] text-smoke-400 mt-2">
            Configure links in SupportBanner props - see AD-SETUP.md
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl border border-honey-200 bg-gradient-to-br from-honey-50 via-amber-50 to-orange-50 overflow-hidden ${className}`}>
      {/* Dismiss button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1.5 text-smoke-400 hover:text-smoke-600 rounded-lg hover:bg-white/60 transition-colors"
        style={{ minHeight: 36, minWidth: 36 }}
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl flex-shrink-0" aria-hidden="true">🍯</span>
          <div className="pr-8">
            <h3 className="font-display text-lg text-smoke-800">Support BeeCalc Hub</h3>
            <p className="text-sm text-smoke-600 mt-1">
              This site is free and always will be. If these calculators save you time or money,
              consider supporting the project so we can keep building more tools for beekeepers.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={bmcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#FFDD00] text-smoke-900 font-semibold text-sm hover:bg-[#FFE44D] transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            style={{ minHeight: 48 }}
          >
            <CoffeeIcon />
            Buy Me a Coffee
          </a>
          <a
            href={donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-white text-smoke-700 font-semibold text-sm border-2 border-smoke-200 hover:border-honey-300 hover:bg-honey-50 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            style={{ minHeight: 48 }}
          >
            <HeartIcon />
            Make a Donation
          </a>
        </div>

        {/* Dev hint */}
        {!isConfigured && (
          <p className="text-[10px] text-smoke-400 mt-3">
            ⚙️ Configure your links: pass bmcUsername and donationUrl props - see AD-SETUP.md
          </p>
        )}
      </div>

      {/* Subtle decorative honeycomb */}
      <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <path d="M60 10L95 30V70L60 90L25 70V30Z" fill="currentColor" className="text-honey-600" />
          <path d="M60 35L77.5 45V65L60 75L42.5 65V45Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-honey-600" />
        </svg>
      </div>
    </div>
  );
}

function CoffeeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 110 8h-1" />
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <path d="M6 2v3M10 2v3M14 2v3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
