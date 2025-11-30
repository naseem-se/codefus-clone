import React from 'react';

import acmeCorpLogo from '../assets/logos/acme-corp.svg';
import boltshiftLogo from '../assets/logos/boltshift.svg';
import cloudWatchLogo from '../assets/logos/cloud-watch.svg';
import epicuriousLogo from '../assets/logos/epicurious.svg';
import featherDevLogo from '../assets/logos/feather-dev.svg';
import globalBankLogo from '../assets/logos/global-bank.svg';
import lightboxLogo from '../assets/logos/lightbox.svg';
import nietzscheLogo from '../assets/logos/nietzsche.svg';
import polymathLogo from '../assets/logos/polymath.svg';
import spheruleLogo from '../assets/logos/spherule.svg';

export default function FeaturesSection() {
  const topLogos = [
    { name: 'Acme Corp', src: acmeCorpLogo },
    { name: 'Boltshift', src: boltshiftLogo },
    { name: 'Cloud Watch', src: cloudWatchLogo },
    { name: 'Epicurious', src: epicuriousLogo },
    { name: 'Feather Dev', src: featherDevLogo },
  ];

  const bottomLogos = [
    { name: 'Global Bank', src: globalBankLogo },
    { name: 'Lightbox', src: lightboxLogo },
    { name: 'Nietzsche', src: nietzscheLogo },
    { name: 'Polymath', src: polymathLogo },
    { name: 'Spherule', src: spheruleLogo },
  ];

  return (
    <div 
      style={{
        width: '100%',
        height: '100vh',
        position: 'sticky',
        top: 0,
        backgroundColor: '#000000',
        transform: 'translateZ(0)'
      }}
      
      id='services'
    >
      {/* Main Content */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 10,
          width: '100%',
          maxWidth: '1320px',
          willChange: 'transform, opacity',
          transform: 'translate(-50%, -50%) scale(1) translateZ(0px)',
          opacity: 1,
          pointerEvents: 'auto'
        }}
      >
        <div className="mt-50 px-6 pt-12 pb-6 md:pt-40 md:pb-24">
          <div 
            className="relative mx-auto w-full max-w-[1320px] rounded-xl border border-[rgba(255,255,255,0.08)] pb-8 backdrop-blur-lg lg:rounded-2xl"
            style={{
              background: 'linear-gradient(180deg, rgba(49, 40, 65, 0.15) 0%, rgba(14, 3, 36, 0.05) 100%), rgba(0, 0, 0, 0.20)'
            }}
          >
            {/* Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#5B66A0] to-[#10192E] p-[1px] shadow-[inset_0_-10px_14px_0px_#101B36]">
              <div className="h-full w-full rounded-full bg-[#151322] px-6 py-2">
                <p className="bg-gradient-to-r text-nowrap from-[#DDB6ED] to-[#C6CAF8] bg-clip-text text-transparent">
                  Codefus Features
                </p>
              </div>
            </div>

            {/* Header Section */}
            <div className="mx-auto flex w-full max-w-[829px] flex-col items-center gap-5 pt-20 pb-16 text-center">
              <h2 className="bg-gradient-to-b from-[#F4F4F6] from-[40.09%] to-[#B3B0BC] to-[90.52%] bg-clip-text text-3xl font-medium text-transparent md:text-5xl lg:text-[62px] lg:leading-[70px] lg:tracking-[-2px]">
                Connect with 100+ tools
              </h2>
              <p className="w-full max-w-[576px] font-medium text-[rgba(255,255,255,0.60)]">
                Gain invaluable predictive analytics and actionable insights, empowering your team to make data-driven decisions and close deal.
              </p>
              <a
                className="group flex items-center justify-center gap-2 rounded-[58px] border-[1px] px-3.5 py-2.5 font-semibold transition-shadow duration-300 ease-in-out md:px-6 md:py-3 border-[#222] bg-[rgba(6,6,6,0.60)] text-[#B1B1B1] shadow-[0px_0.583px_2.333px_0px_#4E4E59_inset,0px_4.667px_18.667px_0px_rgba(52,52,60,0.40)_inset,0_0_0px_0px_rgba(34,34,34,0)] hover:shadow-[0px_0.583px_2.333px_0px_#4E4E59_inset,0px_4.667px_18.667px_0px_rgba(52,52,60,0.40)_inset,0_0_15px_#556] mt-5"
                target="_blank"
                rel="noopener noreferrer"
                href="https://riotters.com/"
              >
                <span>Explore All Tools</span>
                <img
                  alt=">"
                  loading="lazy"
                  width="16"
                  height="16"
                  decoding="async"
                  className="transition-all duration-200 ease-in-out group-hover:translate-x-1 group-hover:drop-shadow-sm"
                  src="/arrow-right.svg"
                />
              </a>
            </div>

            {/* Logos Marquee */}
            <div className="w-full mb-60">
              {/* Top Row - Scroll Left to Right */}
              <div className="flex overflow-hidden text-[0px] select-none">
                <div className="marquee-scroll flex flex-shrink-0 whitespace-nowrap">
                  <div className="flex" aria-hidden="false">
                    {topLogos.map((logo, index) => (
                      <div
                        key={index}
                        className="mr-6 flex max-w-[166px] min-w-[166px] flex-shrink-0 items-center justify-center rounded-[15px] border border-[rgba(255,255,255,0.20)] bg-[rgba(4,4,12,0.70)] p-6 backdrop-blur-[15px] lg:max-w-[266px] lg:min-w-[266px] lg:px-12 lg:py-10"
                      >
                        <img
                          alt={`${logo.name} logo`}
                          width="178"
                          height="45"
                          decoding="async"
                          className="h-auto max-h-[45px] w-auto"
                          src={logo.src}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex" aria-hidden="true">
                    {topLogos.map((logo, index) => (
                      <div
                        key={`duplicate-${index}`}
                        className="mr-6 flex max-w-[166px] min-w-[166px] flex-shrink-0 items-center justify-center rounded-[15px] border border-[rgba(255,255,255,0.20)] bg-[rgba(4,4,12,0.70)] p-6 backdrop-blur-[15px] lg:max-w-[266px] lg:min-w-[266px] lg:px-12 lg:py-10"
                      >
                        <img
                          alt={`${logo.name} logo`}
                          width="178"
                          height="45"
                          decoding="async"
                          className="h-auto max-h-[45px] w-auto"
                          src={logo.src}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row - Scroll Right to Left */}
              <div className=" mt-6 flex overflow-hidden text-[0px] select-none">
                <div className="marquee-scroll-rtl flex flex-shrink-0 whitespace-nowrap">
                  <div className="flex" aria-hidden="false">
                    {bottomLogos.map((logo, index) => (
                      <div
                        key={index}
                        className="mr-6 flex max-w-[166px] min-w-[166px] flex-shrink-0 items-center justify-center rounded-[15px] border border-[rgba(255,255,255,0.20)] bg-[rgba(4,4,12,0.70)] p-6 backdrop-blur-[15px] lg:max-w-[266px] lg:min-w-[266px] lg:px-12 lg:py-10"
                      >
                        <img
                          alt={`${logo.name} logo`}
                          width="178"
                          height="45"
                          decoding="async"
                          className="h-auto max-h-[45px] w-auto"
                          src={logo.src}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex" aria-hidden="true">
                    {bottomLogos.map((logo, index) => (
                      <div
                        key={`duplicate-${index}`}
                        className="mr-6 flex max-w-[166px] min-w-[166px] flex-shrink-0 items-center justify-center rounded-[15px] border border-[rgba(255,255,255,0.20)] bg-[rgba(4,4,12,0.70)] p-6 backdrop-blur-[15px] lg:max-w-[266px] lg:min-w-[266px] lg:px-12 lg:py-10"
                      >
                        <img
                          alt={`${logo.name} logo`}
                          width="178"
                          height="45"
                          decoding="async"
                          className="h-auto max-h-[45px] w-auto"
                          src={logo.src}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Video */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          zIndex: 0,
          width: '100%',
          maxWidth: '100%',
          willChange: 'transform, opacity',
          transform: 'translate(-50%, -50%) scale(1) translateZ(0px)',
          opacity: 1,
          pointerEvents: 'auto'
        }}
      >
        <div className="relative mx-auto hidden aspect-[1680/945] w-full md:block">
          <video
            className="absolute top-0 left-0 h-full w-full"
            src="/bg-wave.mp4"
            autoPlay
            loop
            playsInline
            muted
            preload="metadata"
            style={{ opacity: 1 }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-scroll-rtl {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-scroll {
          animation: marquee-scroll 30s linear infinite;
        }

        .marquee-scroll-rtl {
          animation: marquee-scroll-rtl 30s linear infinite;
        }
      `}</style>
    </div>
  );
}