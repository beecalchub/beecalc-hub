import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about BeeCalc Hub - free, practical calculators for beekeepers at every level.',
};

export default function AboutPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-6">About BeeCalc Hub</h1>

      <div className="prose prose-smoke max-w-none space-y-6 text-smoke-700 leading-relaxed">
        <p className="text-lg">
          BeeCalc Hub is a free, open collection of practical calculators designed specifically for beekeepers -
          from first-year hobbyists to commercial operations running hundreds of hives.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Why We Built This</h2>
        <p>
          Beekeeping involves constant decisions backed by numbers: how much syrup to mix, when mite levels
          demand treatment, how many supers to add, whether a colony is strong enough to split. We built BeeCalc Hub
          to put all of that math in one place - quick to access, easy to use, and tuned to real-world beekeeping.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">How It Works</h2>
        <p>
          Each calculator is built around a specific decision or task a beekeeper faces. You enter your numbers,
          and the calculator shows you results along with the assumptions behind them. Every calculator is labeled
          by type - exact calculations, estimates, scorecards, planners, or decision helpers - so you know exactly
          what kind of output to expect.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Global unit toggle</strong> - switch between metric and imperial system-wide</li>
          <li><strong>Favorites</strong> - star your most-used calculators for quick access</li>
          <li><strong>Recently used</strong> - jump back to calculators you&apos;ve used before</li>
          <li><strong>Persistent inputs</strong> - your last-used values are saved locally for convenience</li>
          <li><strong>Mobile-first design</strong> - built to work in the field from your phone</li>
          <li><strong>No account required</strong> - everything runs in your browser</li>
        </ul>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Privacy</h2>
        <p>
          BeeCalc Hub stores all your preferences and data in your browser&apos;s local storage. Nothing is sent to
          any server. There are no accounts, no tracking, and no ads.
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <Link href="/calculators" className="btn-primary">Browse Calculators</Link>
        <Link href="/disclaimer" className="btn-secondary">Read Disclaimer</Link>
      </div>
    </div>
  );
}
