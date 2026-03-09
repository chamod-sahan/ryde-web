'use client';

import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import ServicesSection from '@/components/ServicesSection';


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary transition-colors duration-300">
      <HeroSection />
      <FleetSection />
      <ServicesSection />
    </main>
  );
}
