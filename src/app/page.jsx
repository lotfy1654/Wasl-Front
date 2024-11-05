'use cleint';

import Footer from "@/components/Footer/Footer";
import AboutUs from "@/components/Home/AboutSection/AboutUs";
import BlogSection from "@/components/Home/BlogSection/BlogSection";
import ContactSection from "@/components/Home/ContactSection/ContactSection";
import HeroSection from "@/components/Home/HeroSection/Herosection";
import PricingSection from "@/components/Home/PricingSection/PricingSection";
import TestimonialSection from "@/components/Home/TestimonalSection/TestimonalSection";
import WhatWeOffer from "@/components/Home/WhatWeOffer/WhatWeOffer";
import WhyChooseUs from "@/components/Home/WhyChooseUs/WhyChooseUs";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <WhatWeOffer />
      <WhyChooseUs />
      <PricingSection />
      <BlogSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </>
  );
}