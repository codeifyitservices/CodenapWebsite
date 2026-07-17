import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import ComparisonSection from "../components/ComparisonSection";
import FAQSection from "../components/FAQSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import IndustriesSection from "../components/IndustriesSection";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ComparisonSection />
      <IndustriesSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
