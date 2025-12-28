import React, { useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react";


const Features = () => {


  return (
    <section id="features" className="mt-6 relative z-10 bg-[#000000] px-6 pt-10 pb-4 md:pt-26 md:pb-12">
      <div className="mx-auto mb-13.5 w-full max-w-[690px] text-center">
        <h2 className="bg-gradient-to-b from-[#F4F4F6] to-[#B3B0BC] bg-clip-text text-3xl font-medium text-transparent md:text-5xl md:leading-normal md:tracking-[-2px]">
          Benefits you get with Just Do That
        </h2>
        <p className="mt-5 text-[#9192A1]">
          Work with your team to fix bugs faster with shared reports and issue tracking.
        </p>
      </div>

      <div className="mx-auto mt-10 flex flex-wrap justify-center gap-6 overflow-hidden">
        {/* Card 1: Real-Time Bug Detection */}
        <div className="w-[424px] overflow-hidden rounded-2xl border border-[rgba(182,157,255,0.20)] bg-[rgba(7,7,7,0.80)] px-8 pt-8 pb-8 backdrop-blur-[40px] flex flex-col">
          <h3 className="mb-3 text-xl font-medium text-[#E9E9E9]">
            Insight - Really understanding your project
          </h3>
          <p className="text-[#9192A1]">
            We don't start with the usual "generic ideas". We thoroughly analyze your goal, audience, and constraints.
          </p>

          <div className="flex-1 relative overflow-hidden pt-4">
            <Lottie
              path="/lottie/1.json"
              loop
              autoplay
              style={{ width: '100%', height: 300 }}
            />
          </div>
        </div>

        {/* Card 2: Detailed Error Reporting */}
        <div className="w-[424px] overflow-hidden rounded-2xl border border-[rgba(182,157,255,0.20)] bg-[rgba(7,7,7,0.80)] px-8 pt-8 backdrop-blur-[40px] flex flex-col">
          <h3 className="mb-3 text-xl font-medium text-[#E9E9E9]">
            Mapping – Charting the course
          </h3>
          <p className="text-[#9192A1]">
            We create a project map: timeline, milestones, roles, and priorities.
          </p>

          <div className="flex-1 relative overflow-hidden pt-4">
            <Lottie
              path="/lottie/2.json"
              loop
              autoplay
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Card 3: Seamless Integration */}
        <div className="w-[424px] overflow-hidden rounded-2xl border border-[rgba(182,157,255,0.20)] bg-[rgba(7,7,7,0.80)] px-8 pt-8 backdrop-blur-[40px] flex flex-col">
          <h3 className="mb-3 text-xl font-medium text-[#E9E9E9]">
            Planning - The action plan
          </h3>
          <p className="text-[#9192A1]">
            We define a concrete plan with digital tools, budget, resources, and well-distributed tasks.
          </p>

          <div className="flex-1 relative overflow-hidden pt-4">
            <Lottie
              path="/lottie/3.json"
              loop
              autoplay
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Features;