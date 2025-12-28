import React from 'react';


export default function FeaturesSection() {
  const topLogos = [
    { name: 'logo 1', src: "/lottie/icons/logo1.png" },
    { name: 'logo 2', src: "/lottie/icons/logo2.png" },
    { name: 'logo 3', src: "/lottie/icons/logo3.png" },
    { name: 'logo 4', src: "/lottie/icons/logo4.png" },
    { name: 'logo 5', src: "/lottie/icons/logo5.png" },
    { name: 'logo 6', src: "/lottie/icons/logo6.png" },
    { name: 'logo 7', src: "/lottie/icons/logo7.png" },
  ];


  return (
    <div
      // style={{
      //   width: '100%',
      //   height: '100vh',
      //   position: 'sticky',
      //   top: 0,
      //   backgroundColor: '#000000',
      //   transform: 'translateZ(0)'
      // }}

      id='services'
    >
      {/* Main Content */}
      <div
        style={{
          position: 'absolute',
          top: '70%',
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
        <div className=" px-6 pt-12 md:pt-40 md:pb-24">
          <div
            className="relative h-full mt-60 mx-auto w-full max-w-[1320px] rounded-xl border border-[rgba(255,255,255,0.08)] pb-8 backdrop-blur-lg lg:rounded-2xl"
            style={{
              paddingBottom: '330px',
              background: 'linear-gradient(180deg, rgba(49, 40, 65, 0.15) 0%, rgba(14, 3, 36, 0.05) 100%), rgba(0, 0, 0, 0.20)'
            }}
          >
            {/* Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#5B66A0] to-[#10192E] p-[1px] shadow-[inset_0_-10px_14px_0px_#101B36]">
              <div className="h-full w-full rounded-full bg-[#151322] px-6 py-2">
                <p className="bg-gradient-to-r text-nowrap from-[#DDB6ED] to-[#C6CAF8] bg-clip-text text-transparent">
                  Just Do That Features
                </p>
              </div>
            </div>

            {/* Header Section */}
            <div className="mx-auto flex w-full max-w-[829px] flex-col items-center gap-5 pt-20 pb-16 text-center">
              <h4 className=" md:mt-50 bg-gradient-to-b from-[#F4F4F6] from-[40.09%] to-[#B3B0BC] to-[90.52%] bg-clip-text text-3xl font-medium text-transparent md:text-5xl lg:text-[62px] lg:leading-[70px] lg:tracking-[-2px]">
                We are Just do that - the agency that doesn't just imagine your dreams, but creates them
              </h4>
              <p className="m-0 p-0 w-full max-w-[576px] font-medium text-[rgba(255,255,255,0.60)]">
                Forget limits, forget "maybe someday": we turn visions into bold realities, with creativity that sparks, strategy that delivers, and design that leaves a mark.
              </p>
              <p className="m-0 p-0 w-full max-w-[576px] font-medium text-[rgba(255,255,255,0.60)]">
                We thrive on the impossible. We craft experiences that feel alive. We transform ideas into stories, spaces, and futures.
              </p>

              <p className="m-0 p-0 w-full max-w-[576px] font-medium text-[rgba(255,255,255,0.60)]">
                For us, every project is more than a job it's a mission to prove that dreams are meant to be done.
              </p>
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
              {/* <div className=" mt-6 flex overflow-hidden text-[0px] select-none">
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
              </div> */}
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