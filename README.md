# 🐝 BeeCalc Hub

**Professional Beekeeping Calculators** - a free, mobile-first portal with 36 fully implemented calculators and architecture for 170+.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, SSG) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Testing | Jest + Testing Library |
| Deployment | Vercel / Docker / any Node host |

## Project Structure

```
src/
├── app/                    # Next.js pages and layouts
│   ├── layout.tsx          # Root layout (providers, header, footer)
│   ├── page.tsx            # Homepage
│   ├── calculators/        # All-calculators listing (with layout.tsx for SEO)
│   ├── category/[slug]/    # Category pages (15 categories)
│   ├── calculator/[slug]/  # Calculator detail pages (SSG for all 170+ slugs)
│   ├── about/              # About page
│   ├── disclaimer/         # Disclaimer page
│   └── contact/            # Contact placeholder
├── calculators/            # Calculator implementations
│   ├── index.ts            # Slug → component registry
│   └── <slug>/
│       ├── logic.ts        # Pure functions (unit-tested, no React)
│       └── Component.tsx   # React UI (shared components)
├── components/
│   ├── layout/             # Header, Footer, MobileMenu, Breadcrumb
│   ├── ui/                 # NumberInput, SelectInput, Checkbox, Card, Badge, etc.
│   ├── calculator/         # CalculatorShell, ResultPanel, ResultRow, etc.
│   └── home/               # Homepage sections
├── context/                # React contexts (units, favorites, recent)
├── data/
│   ├── registry.ts         # Single source of truth - all 170+ calculator metadata
│   ├── categories.ts       # 15 category definitions
│   └── constants.ts        # Beekeeping domain constants
├── hooks/                  # useLocalStorage, useUnitSystem, useCalculatorInputs, etc.
├── lib/                    # Shared utilities (units, validation, formatters, search, iCal)
└── types/                  # TypeScript type definitions
```

## Implemented Calculators (25 MVP)

**Colony & Hive Management:** Hive Population Estimator, Brood Area Calculator, Queen Rearing Timeline (with iCal export), Split Planning Calculator, Overwintering Readiness Scorecard

**Feeding & Nutrition:** Sugar Syrup Mixing, Winter Stores Calculator, Feed Cost Calculator, Fondant Recipe Calculator, Pollen Patty Batch Calculator, Apiary Total Feed Calculator

**Honey Production:** Honey Bottling, Honey Revenue, Moisture Correction, Harvest Estimator, Jar Inventory Planner, Super Requirement, Jar Label Quantity Calculator, Cappings Wax Yield Calculator

**Varroa & Pest Management:** Varroa Infestation Rate, OAV Dosing Calculator, Threshold Action Calculator, Treatment Cost Calculator

**Business & Profitability:** Cost Per Hive, Apiary Profit, Retail Pricing, Pollination Contract Pricing, Break-Even Calculator, Wholesale vs Retail Comparison

**Pollination Services:** Hive Strength Grading Calculator

**Education:** Beginner Hive Setup

**Environmental:** Bee Forage Radius, Water Requirement Estimator

**Utility:** Metric-Imperial Converter, Batch Scaling Calculator, Date Interval Calculator

## Production Hardening

This codebase has been through a full QA pass covering:

### Touch & Mobile
- All interactive elements meet the **44px minimum touch target** (Apple HIG)
- Buttons, toggles, checkboxes, filter pills, and remove buttons all sized for field use with gloves
- Batch scaling ingredient inputs stack vertically on mobile
- Tables scroll horizontally on narrow screens

### Accessibility
- All inputs have `aria-describedby` linking to their error/help text
- `aria-invalid` set on errored inputs
- `aria-pressed` on filter toggles
- `aria-live="polite"` on result counts
- `role="dialog"` and `aria-modal` on mobile menu with Escape key dismissal
- `scope="col"` on all table headers
- `aria-current="page"` on breadcrumb terminal item
- Decorative emoji marked `aria-hidden="true"`
- Shared `Checkbox` component with 44px hit area replaces all inline checkbox patterns

### Unit Handling
- Global metric/imperial toggle affects all calculator results
- Winter Stores, Feed Cost, Honey Bottling show metric conversions inline
- Input help text shows live metric equivalent when toggle is set
- No "kg (enter lbs)" confusion - labels are clear

### Validation
- Jar Inventory Planner validates that size percentages sum to 100%
- NumberInput handles intermediate decimal typing (typing "3." no longer resets to 0)
- All calculators guard against division by zero

### Code Quality
- Zero dead imports (removed `Metadata` from client pages, `calculatorRegistry` from route page)
- Shared `Checkbox` component eliminates 4× duplicated inline checkbox pattern
- `useCalculatorInputs` uses `useRef` for defaults to prevent stale closure in reset
- MobileMenu has proper CSS animation (`animate-slide-in-right` added to Tailwind config)
- Footer is a client component for runtime copyright year

### SEO
- Calculator pages have OpenGraph title, description, and canonical URL
- All-calculators page has metadata via layout wrapper (client pages can't export metadata)
- Category pages have rich descriptions
- All pages have semantic headings and clean slugs

## Commands

```bash
npm run dev           # Development (http://localhost:3000)
npm run build         # Production build (165 static pages)
npm run start         # Start production server
npm run lint          # ESLint
npm test              # Run all tests (148 tests)
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Testing

**148 tests across 25 suites**, covering:
- Unit conversion functions (round-trip accuracy, edge cases)
- Validation helpers (required, positive, range, percentage, integer)
- Formatters (number, currency, percent, pluralization)
- Calculator logic for 22 calculators (sugar syrup, varroa, OAV, winter stores, honey bottling, honey revenue, moisture correction, population estimator, brood area, cost per hive, retail pricing, batch scaling, fondant recipe, pollen patty, threshold action, treatment cost, hive strength grading, break-even, wholesale vs retail, cappings wax yield, water requirement, date interval)

### Manual QA Checklist

- [ ] Homepage loads with all 5 sections
- [ ] All 15 category pages render with correct calculator counts
- [ ] All 25 MVP calculators accept input and produce results
- [ ] Non-MVP calculators show "Coming Soon" with related links
- [ ] Unit toggle switches labels in all metric-aware calculators
- [ ] Favorites persist after page reload
- [ ] Recently used list updates on calculator visit
- [ ] Copy button copies formatted text to clipboard
- [ ] Reset button clears inputs to defaults
- [ ] Queen timeline iCal download produces valid .ics file
- [ ] Search filters calculators by title and keywords
- [ ] Category filter works on all-calculators page
- [ ] Jar inventory shows error when percentages don't sum to 100
- [ ] All buttons/toggles/checkboxes are tappable on mobile (375px)
- [ ] Mobile menu opens, closes on backdrop tap and Escape key
- [ ] Tables scroll horizontally on narrow screens
- [ ] Breadcrumbs link correctly on all calculator pages

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export
```js
// next.config.js - change output to 'export'
const nextConfig = { output: 'export' };
```
Deploy the `out/` directory to Netlify, S3, GitHub Pages, or Cloudflare Pages.

## Adding a New Calculator

1. **Create directory:** `src/calculators/your-slug/`
2. **Write logic** (`logic.ts`) - pure functions, no React
3. **Write component** (`Component.tsx`) - compose from `NumberInput`, `SelectInput`, `Checkbox`, `Card`, `ResultPanel`, `ResultRow`, `AssumptionsPanel`, `ResetButton`, `CopyResultButton`
4. **Register component** in `src/calculators/index.ts`
5. **Set `isMvp: true`** on the entry in `src/data/registry.ts`
6. **Add tests** in `__tests__/calculators/your-slug.test.ts`

Routing, SEO, breadcrumbs, category pages, and search indexing are all automatic.

## License

MIT

---

Built with 🐝 for beekeepers everywhere.
