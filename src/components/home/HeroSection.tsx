import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden honeycomb-bg">
      <div className="container-page py-16 sm:py-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-smoke-900 mb-4 leading-tight">
            Smart tools for
            <span className="text-honey-600 block">smarter beekeeping</span>
          </h1>
          <p className="text-lg sm:text-xl text-smoke-600 mb-8 leading-relaxed max-w-xl">
            Free, practical calculators for every aspect of beekeeping - from mixing syrup
            and managing varroa to projecting revenue and planning your season.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculators" className="btn-primary text-base px-6 py-3">
              Browse All Calculators
            </Link>
            <Link href="/category/education-and-hobbyist" className="btn-secondary text-base px-6 py-3">
              New to Beekeeping?
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-8xl opacity-20 select-none" aria-hidden="true">
          🐝🍯
        </div>
      </div>
    </section>
  );
}
