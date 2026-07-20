import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import ExpertMindsSection from "../components/ExpertMindsSection";
import ComparisonSection from "../components/ComparisonSection";
import FAQSection from "../components/FAQSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import IndustriesSection from "../components/IndustriesSection";
import { applyPageSEO } from "../utils/applyPageSEO";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  useEffect(() => {
    fetch(`${API_BASE}/api/settings/seo_home`)
      .then((r) => r.json())
      .then((data) => { if (data) applyPageSEO(data); })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-x-clip selection:bg-orange-500 selection:text-white">
      <HeroSection />
      <ServicesSection />
      {/* <WhyChooseUsSection /> */}
      <ExpertMindsSection />
      <ComparisonSection />
      <IndustriesSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
