import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import PricingCard from "./PricingCard";

import bgBlue from "../assets/bg-blue.webp";
import bgPurple from "../assets/bg-purple.webp";
import bgMagenta from "../assets/bg-magenta.webp";

const plans = [
  {
    price: 19,
    seats: "3",
    storage: "500GB",
    days: "7",
    model: "cube",
    bg: bgBlue,
  },
  {
    price: 29,
    seats: "9",
    storage: "1TB",
    days: "14",
    model: "spring",
    bg: bgPurple,
  },
  {
    price: 49,
    seats: "Unlimited",
    storage: "Unlimited",
    days: "30",
    model: "sphere",
    bg: bgMagenta,
  },
];

export default function PricingSlider() {
  return (
    <div id="pricing" className="max-w-[1372px] mx-auto px-6">
      <div
        className="mx-auto mb-4 max-w-md overflow-hidden px-6 pt-18 text-center md:mb-8 md:pt-28"
        style={{ opacity: 1, transform: "none" }}
      >
        <h2 className="mb-4 bg-gradient-to-b from-[#F4F4F6] from-40% to-[#B3B0BC] to-90% bg-clip-text text-5xl/tight font-medium tracking-tighter text-transparent md:mb-6">
          Pricing
        </h2>
        <p className="text-base font-normal text-[#9192A1]">
          Free forever. Upgrade for unlimited seats, more cloud storage, and
          exclusive features.
        </p>
      </div>

      <Swiper
        spaceBetween={24}
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="pricing-swiper mt-14"
      >
        {plans.map((plan, i) => (
          <SwiperSlide key={i}>
            <PricingCard plan={plan} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
