export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1680px] flex-col items-center overflow-hidden px-6 md:px-20">
      <div className="mb-10 h-px w-full max-w-[1320px] bg-[linear-gradient(90deg,rgba(233,233,233,0.00)_0%,rgba(255,255,255,0.60)_53%,rgba(233,233,233,0.00)_100%)] opacity-30"></div>
      
      <p className="pb-6 text-center text-sm text-[#72727D] opacity-70 md:text-base">
        © 2025{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-50 transition-opacity duration-200 ease-in-out hover:underline"
          href="https://riotters.com/"
        >
          Riotters
        </a>
        . All rights reserved.{' '}
        <br className="md:hidden" />
        Project is developed as a part of RnD by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-50 transition-opacity duration-200 ease-in-out hover:underline"
          href="https://riotters.com/"
        >
          Riotters
        </a>
        .
      </p>
      
      <div className="h-[168px] overflow-hidden md:h-[272px] lg:h-[366px]">
        <p className="w-full bg-[linear-gradient(180deg,rgba(244,244,246,0.00)_22.29%,rgba(179,176,188,0.10)_90.52%)] bg-clip-text text-[clamp(64px,25vw,426px)] font-semibold text-transparent">
          Codefus
        </p>
      </div>
    </footer>
  );
}