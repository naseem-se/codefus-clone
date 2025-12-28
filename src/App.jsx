import React from "react";
import "./index.css";
import HexagonScene from "./components/HexagonScene";
import VideoBackground from "./components/VideoBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AnimateOnScroll from "./components/AnimateOnScroll";
import Features from "./components/Features";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <>
      <VideoBackground />
      <Header />
      <AnimateOnScroll delay={0.1}>
        <Hero />
      </AnimateOnScroll>

      {/* Hexagon Scene - becomes sticky during animation */}
      {/* <HexagonScene /> */}
      <HexagonScene stickyHeight="200vh" overlayContent={<FeaturesSection />} />


      <AnimateOnScroll delay={0.2}>
        <Features />
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.3}>
        <ContactForm />
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.4}>
        <Footer />
      </AnimateOnScroll>
    </>
  );
}
