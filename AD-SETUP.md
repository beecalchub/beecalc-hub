# BeeCalc Hub - Revenue & Support Setup Guide

Your site has two built-in ways to generate revenue: **Buy Me a Coffee** and
**Donations**. Both are already wired into the site - you just need to create
your accounts and plug in the links.

---

## Option 1: Buy Me a Coffee (Quickest to Set Up)

Buy Me a Coffee lets visitors send you a one-time "coffee" payment (usually $3–5).
It's free to set up and takes about 5 minutes.

### Setup Steps:

1. Go to **https://www.buymeacoffee.com**
2. Click **Start my page** - sign up with email or Google
3. Choose a username (e.g., `beecalchub`)
4. Add a profile photo, short bio, and choose your "coffee" price
5. Connect your bank account or PayPal for payouts

### Connect to Your Site:

Edit these 3 files and set your username:

**`src/app/support/page.tsx`** - near the top:
```
const BMC_USERNAME = 'beecalchub';
```

**`src/app/page.tsx`** - find the SupportBanner:
```
bmcUsername="beecalchub"
```

**`src/components/calculator/CalculatorShell.tsx`** - same thing:
```
bmcUsername="beecalchub"
```

---

## Option 2: Donation Link (PayPal or Stripe)

### PayPal.me (Simplest)
1. Go to **https://www.paypal.me**
2. Create your link (e.g., `paypal.me/beecalchub`)

### Stripe (More Professional)
1. Go to **https://dashboard.stripe.com**
2. Create a "Customer chooses what to pay" payment link

### Connect to Your Site:

Same 3 files as above - set the `donationUrl` / `DONATION_URL`:
```
donationUrl="https://paypal.me/beecalchub"
```

---

## Where Support Banners Appear

| Location | Style | Behavior |
|---|---|---|
| Homepage | Full banner with description | Between categories and beginner section |
| Every calculator page | Compact banner | Between results and related calculators, dismissible |
| /support page | Dedicated full page | Linked from footer "Support Us" |

---

## Quick Setup Checklist

- [ ] Create Buy Me a Coffee account
- [ ] Create PayPal.me or Stripe payment link
- [ ] Edit 3 files with your links (support/page.tsx, page.tsx, CalculatorShell.tsx)
- [ ] Run `npm run build` to verify
- [ ] Deploy with `vercel --prod`
- [ ] Test both buttons on the live site

---

## Revenue Expectations

| Source | Realistic Range |
|---|---|
| Buy Me a Coffee | $5–50/month depending on traffic |
| PayPal donations | $5–30/month |
| Combined | Enough to cover domain (~$10/yr) + any extras |

The site is free on Vercel's free tier, so you only need ~$10/year for domain.
