import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCalculators } from '@/components/home/FeaturedCalculators';
import { CategoryOverview } from '@/components/home/CategoryOverview';
import { PopularTools } from '@/components/home/PopularTools';
import { BeginnerSection } from '@/components/home/BeginnerSection';
import { SupportBanner } from '@/components/calculator/SupportBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCalculators />
      <PopularTools />
      <CategoryOverview />
      <div className="container-page py-4">
        <SupportBanner
          bmcUsername="beecalchub"
          donationUrl="https://donate.stripe.com/8x200k3mE1qH7z46T6eEo00"
        />
      </div>
      <BeginnerSection />
    </>
  );
}
