'use client';

import WelcomeIntro, { useWelcomeIntro } from '@/components/WelcomeIntro';
import MarqueeBanner from '@/components/MarqueeBanner';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stories from '@/components/Stories';
import FacebookVideos from '@/components/FacebookVideos';
import ToursCarousel from '@/components/ToursCarousel';
import Experiences from '@/components/Experiences';
import TrendingAdventures from '@/components/TrendingAdventures';
import Destinations from '@/components/Destinations';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQ';
import LegalSection from '@/components/LegalSection';
import QuoteBanner from '@/components/QuoteBanner';

export default function HomePageClient() {
  const { showIntro, dismissIntro } = useWelcomeIntro();

  return (
    <>
      {showIntro && <WelcomeIntro onComplete={dismissIntro} />}
      <Hero />
      <MarqueeBanner />
      <Features />
      <Stories />
      <ToursCarousel />
      <Experiences />
      <TrendingAdventures />
      <Destinations />
      <Testimonials />
      <FAQSection />
      <FacebookVideos />
      <LegalSection />
      <QuoteBanner />
    </>
  );
}
