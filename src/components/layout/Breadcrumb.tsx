import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// Fix #19: Use label-based keys instead of index
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-smoke-500">
        <li>
          <Link href="/" className="hover:text-honey-700 transition-colors">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <span aria-hidden="true" className="text-smoke-300">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-honey-700 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-smoke-700" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
