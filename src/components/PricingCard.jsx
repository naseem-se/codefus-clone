import { Canvas } from "@react-three/fiber";
import PricingCardModel from "./PricingCardModel";
import { useState } from "react";
import { Rotate3D } from "lucide-react";

export default function PricingCard({ plan }) {
  const { price, seats, storage, days, bg, model } = plan;
  const [hover, setHover] = useState(false);

  return (
    <div className="mx-auto relative p-6 rounded-2xl border border-white/10 bg-[rgba(0,0,0,0.20)]
        transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,255,255,0.08)]
        overflow-hidden max-w-[426px]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        
        >

      {/* 3D MODEL */}
      <div  className="absolute top-[-180px] right-[-100px] w-[340px] h-[300px]" style={{ transform: 'rotate(45deg)' }} >
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.8} />
          <directionalLight intensity={1} position={[1, 1, 1]} />
          <PricingCardModel type={model} hover={hover} />
        </Canvas>
      </div>

      {/* BG IMAGE */}
      <img
        src={bg}
        alt=""
        className="absolute top-[-14px] right-0 w-full h-full max-h-[280px] md:max-h-[340px] object-cover z-[-1]"
      />

      {/* CONTENT */}
      <div className="flex flex-col h-full min-h-[560px] gap-4">
        <div className="flex items-center gap-2">
          <img src="signal.svg" width="20" />
          <span className="text-lg font-semibold tracking-wider">Marketly</span>
        </div>

        <div className="mt-auto">
          <p className="text-7xl font-extralight tracking-tighter mb-7">${price}</p>

          <ul className="flex flex-col gap-4 mb-8">
            <li className="flex items-center gap-4 text-[#72727D]">
              <img src="check.svg" width="20" />
              <p><em className="text-[#B8B8C9] not-italic font-medium">{seats}</em> seats available</p>
            </li>

            <li className="flex items-center gap-4 text-[#72727D]">
              <img src="cloud.svg" width="20" />
              <p><em className="text-[#B8B8C9] not-italic font-medium">{storage}</em> of cloud storage</p>
            </li>
          </ul>

          <div className="mb-7 flex items-center gap-2 justify-center">
            <div className="h-[1px] bg-[#1F1F21] w-full" />
            <span className="text-xs uppercase text-[#49494F] w-full text-center">{days} DAYS FOR FREE</span>
            <div className="h-[1px] bg-[#1F1F21] w-full" />
          </div>

          <a href="https://riotters.com" className="group flex items-center justify-center gap-2 rounded-[58px] border-[1px] px-3.5 py-2.5 font-semibold transition-shadow duration-300 ease-in-out md:px-6 md:py-3 border-[#222] bg-[rgba(6,6,6,0.60)] text-[#B1B1B1] shadow-[0px_0.583px_2.333px_0px_#4E4E59_inset,0px_4.667px_18.667px_0px_rgba(52,52,60,0.40)_inset,0_0_0px_0px_rgba(34,34,34,0)] hover:shadow-[0px_0.583px_2.333px_0px_#4E4E59_inset,0px_4.667px_18.667px_0px_rgba(52,52,60,0.40)_inset,0_0_15px_#556]">
            Subscribe Now
          </a>

          <p className="text-center text-sm text-[#72727D] mt-4">
            <b className="text-[#B8B8C9] font-semibold">30‑day</b> money‑back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
