import React from "react";
import "./index.css";
import HexagonScene from "./components/HexagonScene";
import VideoBackground from "./components/VideoBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AnimateOnScroll from "./components/AnimateOnScroll";
import Features from "./components/Features";
import PricingSlider from "./components/PricingSlider";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";

export default function App() {
  return (
    <>
      <VideoBackground />
      <Header />
      <AnimateOnScroll delay={0.1}>
        <Hero />
      </AnimateOnScroll>

      {/* Hexagon Scene - becomes sticky during animation */}
      <HexagonScene stickyHeight="200vh" overlayContent={<FeaturesSection />} />

      <AnimateOnScroll delay={0.2}>
        <Features />
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.3}>
        <PricingSlider />
      </AnimateOnScroll>

      <p className="px-6 mt-10 pt-10 pb-8 text-center text-sm text-[#72727D] opacity-70 md:pb-20">
        The offer is available for a limited time. After the trial period
        expires, the amount shown on each option of the subscription plan will
        be charged.
      </p>

      <AnimateOnScroll delay={0.4}>
        <Footer />
      </AnimateOnScroll>
    </>
  );
}
