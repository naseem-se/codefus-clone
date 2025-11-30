export default function Hero() {
  return (
    <section id="hero" className="pt-30 md:pt-40 text-center px-6 relative z-10">
      <div className="mx-auto flex w-full max-w-[546px] flex-col gap-4 text-center max-md:flex-grow md:max-w-[864px]">
        <h1 style={{marginTop: '15px'}} className="mf-28 bg-[linear-gradient(180deg,_#F4F4F6_40.09%,_#B3B0BC_90.52%)] bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl md:text-[64px] md:leading-[72px] md:tracking-[-2px]">
          Detect, Report, and Fix Code
          Errors Faster Than Ever.
        </h1>
        </div>

        <p className="mt-2 text-[#e3e3e4] sm:text-lg md:text-xl md:text-[#9192A1]">
          Our intelligent tool automatically identifies bugs in your code.
        </p>

        <div className="mt-20 md:mt-10 flex flex-col md:flex-row justify-center gap-4">
          <a
            href="https://riotters.com/"
            className="group flex items-center justify-center gap-2 px-3.5 py-2 font-semibold transition-shadow duration-300 ease-in-out md:px-6 md:py-3 rounded-[500px] bg-[#151322] shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_0px_0px_rgba(93,104,163,0)] hover:shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_15px_#5D68A3]"
          >
            Try It Now For Free
          </a>

          <a
            href="https://riotters.com/"
            className="group flex items-center justify-center gap-2 rounded-[58px] border-[1px] px-3.5 py-2 font-semibold transition-shadow duration-300 ease-in-out md:px-6 md:py-3 border-[#222] bg-[rgba(6,6,6,0.60)] text-[#B1B1B1] shadow-[0px_0.583px_2.333px_0px_#4E4E59_inset,0px_4.667px_18.667px_0px_rgba(52,52,60,0.40)_inset,0_0_0px_0px_rgba(34,34,34,0)] hover:shadow-[0px_0.583px_2.333px_0px_#4E4E59_inset,0px_4.667px_18.667px_0px_rgba(52,52,60,0.40)_inset,0_0_15px_#556]"
          >
            Watch Demo
          </a>
        </div>
      </section>
  );
}
