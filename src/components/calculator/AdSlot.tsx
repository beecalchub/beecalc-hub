'use client';

import React, { useEffect, useRef } from 'react';

type AdSize = 'banner' | 'rectangle' | 'leaderboard' | 'skyscraper' | 'inline';

interface AdSlotProps {
  /** Unique identifier for this ad placement */
  slotId: string;
  /** Ad size preset */
  size?: AdSize;
  /** Google AdSense ad slot ID (from your AdSense dashboard) */
  adSlot?: string;
  /** Google AdSense publisher ID (ca-pub-XXXXXXX) */
  adClient?: string;
  /** Custom CSS class */
  className?: string;
  /** Whether to show a placeholder when no ad is configured */
  showPlaceholder?: boolean;
}

const SIZE_CLASSES: Record<AdSize, string> = {
  banner: 'h-[90px] max-w-[728px]',           // 728×90 leaderboard (desktop) or responsive
  rectangle: 'h-[250px] max-w-[336px]',       // 336×280 large rectangle
  leaderboard: 'h-[90px] max-w-[728px]',      // 728×90
  skyscraper: 'h-[600px] max-w-[160px]',      // 160×600
  inline: 'min-h-[100px] max-w-full',         // Responsive in-feed
};

/**
 * AdSlot - drop-in ad placement component.
 *
 * HOW TO SET UP GOOGLE ADSENSE:
 *
 * 1. Sign up at https://www.google.com/adsense/start/
 * 2. Add your site and get approved (takes a few days)
 * 3. Get your publisher ID (looks like: ca-pub-1234567890123456)
 * 4. Create ad units in your AdSense dashboard
 * 5. Add this to your root layout.tsx <head>:
 *
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
 *      crossOrigin="anonymous"></script>
 *
 * 6. Set the adClient and adSlot props on each AdSlot component.
 *
 * Until you add your AdSense credentials, the component shows a clean placeholder
 * that you can use to preview ad positions during development.
 */
export function AdSlot({
  slotId,
  size = 'inline',
  adSlot,
  adClient,
  className = '',
  showPlaceholder = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isConfigured = Boolean(adSlot && adClient);

  useEffect(() => {
    if (isConfigured && adRef.current) {
      try {
        // Push the ad to AdSense
        ((window as unknown as Record<string, unknown>).adsbygoogle as unknown[] || []).push({});
      } catch {
        // AdSense not loaded - that's fine in development
      }
    }
  }, [isConfigured]);

  // Don't render anything if no ad is configured and placeholders are off
  if (!isConfigured && !showPlaceholder) return null;

  return (
    <div
      className={`flex items-center justify-center mx-auto my-6 ${SIZE_CLASSES[size]} ${className}`}
      data-ad-slot={slotId}
    >
      {isConfigured ? (
        <div ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : showPlaceholder ? (
        <div className={`w-full h-full rounded-lg border-2 border-dashed border-smoke-200 bg-smoke-50 flex flex-col items-center justify-center text-smoke-400 ${SIZE_CLASSES[size]}`}>
          <span className="text-xs font-medium uppercase tracking-wide">Ad Space</span>
          <span className="text-[10px] mt-0.5">{slotId}</span>
        </div>
      ) : null}
    </div>
  );
}
