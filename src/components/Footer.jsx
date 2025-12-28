export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1680px] flex-col items-center overflow-hidden px-6 md:px-20">
      <div className="mb-10 h-px w-full max-w-[1320px] bg-[linear-gradient(90deg,rgba(233,233,233,0.00)_0%,rgba(255,255,255,0.60)_53%,rgba(233,233,233,0.00)_100%)] opacity-30"></div>

      <div className="w-full overflow-hidden">
        <p className="w-full bg-[linear-gradient(180deg,rgba(244,244,246,0.00)_22.29%,rgba(179,176,188,0.10)_90.52%)] bg-clip-text text-[15vw] font-semibold text-transparent leading-[0.9] tracking-tight whitespace-nowrap">
          Just Do That
        </p>
      </div>
    </footer>
  );
}