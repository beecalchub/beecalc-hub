'use client';

import React from 'react';
import Link from 'next/link';

// Fix #19: Made client component so copyright year is always current
export function Footer() {
  return (
    <footer className="bg-hive-900 text-hive-300 mt-auto">
      <div className="container-page py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl" aria-hidden="true">🐝</span>
              <span className="font-display text-lg text-honey-300">BeeCalc Hub</span>
            </Link>
            <p className="text-sm text-hive-400 leading-relaxed">
              Free, practical calculators built for beekeepers - hobbyist to commercial.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-display text-sm text-honey-300 mb-3">Calculators</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li><Link href="/calculators" className="hover:text-honey-200 transition-colors">All Calculators</Link></li>
              <li><Link href="/category/feeding-and-nutrition" className="hover:text-honey-200 transition-colors">Feeding</Link></li>
              <li><Link href="/category/honey-production-and-extraction" className="hover:text-honey-200 transition-colors">Honey Production</Link></li>
              <li><Link href="/category/varroa-and-pest-management" className="hover:text-honey-200 transition-colors">Varroa Management</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-display text-sm text-honey-300 mb-3">More</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li><Link href="/category/business-and-profitability" className="hover:text-honey-200 transition-colors">Business Tools</Link></li>
              <li><Link href="/category/education-and-hobbyist" className="hover:text-honey-200 transition-colors">Beginner Tools</Link></li>
              <li><Link href="/category/environmental-and-forage" className="hover:text-honey-200 transition-colors">Forage Tools</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-sm text-honey-300 mb-3">Info</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li><Link href="/about" className="hover:text-honey-200 transition-colors">About</Link></li>
              <li><Link href="/disclaimer" className="hover:text-honey-200 transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="hover:text-honey-200 transition-colors">Contact</Link></li>
              <li><Link href="/support" className="hover:text-honey-200 transition-colors">Support Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hive-700 text-center text-xs text-hive-500">
          © {new Date().getFullYear()} BeeCalc Hub. Free tools for beekeepers everywhere.
        </div>
      </div>
    </footer>
  );
}
