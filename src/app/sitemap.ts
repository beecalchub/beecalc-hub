import type { MetadataRoute } from 'next';
import { calculatorRegistry } from '@/data/registry';
import { categories } from '@/data/categories';

const BASE_URL = 'https://beecalchub.com';

// Helper: entry with English + Russian alternates
function withLocales(
  path: string,
  changeFrequency: 'weekly' | 'monthly' | 'yearly',
  priority: number
): MetadataRoute.Sitemap {
  const enUrl = path === '/' ? BASE_URL : `${BASE_URL}${path}`;
  const ruUrl = path === '/' ? `${BASE_URL}/ru` : `${BASE_URL}/ru${path}`;
  const alternates = { languages: { en: enUrl, ru: ruUrl } };
  const lastModified = new Date();
  return [
    { url: enUrl, lastModified, changeFrequency, priority, alternates },
    { url: ruUrl, lastModified, changeFrequency, priority: Math.max(0.1, priority - 0.1), alternates },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    ...withLocales('/', 'weekly', 1),
    ...withLocales('/calculators', 'weekly', 0.9),
    ...withLocales('/about', 'monthly', 0.5),
    ...withLocales('/support', 'monthly', 0.5),
    ...withLocales('/contact', 'monthly', 0.4),
    ...withLocales('/disclaimer', 'yearly', 0.2),
  ];

  for (const cat of categories) {
    entries.push(...withLocales(`/category/${cat.slug}`, 'weekly', 0.8));
  }

  for (const calc of calculatorRegistry) {
    entries.push(...withLocales(`/calculator/${calc.slug}`, 'monthly', 0.7));
  }

  return entries;
}
