'use client';

import {
  AttendeeSection,
  CreatorSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  PricingSection,
  ReasonsSection,
  SimpleFlowSection,
  TicketTypesSection,
} from './_components/sections';

const HowItWorksPageClient = () => {
  return (
    <main className="overflow-hidden bg-white text-gray-900">
      <HeroSection />
      <SimpleFlowSection />
      <PricingSection />
      <CreatorSection />
      <AttendeeSection />
      <TicketTypesSection />
      <ReasonsSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
};

export default HowItWorksPageClient;
