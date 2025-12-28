import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ zIndex: '99999' }} className="fixed top-4 left-1/2 z-90 w-full -translate-x-1/2 px-4 md:top-8 md:px-6">
      <nav style={{ padding: '1rem' }} className="mp-0 mx-auto flex w-full max-w-[1060px] items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-xl md:min-h-[72px] md:rounded-[50px] md:p-3 shadow-lg">

        <img
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />

        <div className="hidden md:flex gap-10">
          <a className="hover:text-white text-gray-300 transition-colors" href="#services">
            Services
          </a>
          <a className="hover:text-white text-gray-300 transition-colors" href="#features">
            Features
          </a>
          <a className="hover:text-white text-gray-300 transition-colors" href="#contact">
            Contact Us
          </a>
        </div>

        <a
          className="hidden md:flex items-center gap-2 border border-white/20 px-6 py-2 rounded-full
              bg-white/10 backdrop-blur-md text-gray-200 hover:bg-white/15 hover:shadow-lg transition-all"
          href="#"
        >
          Contact Us <img
            alt=">"
            loading="lazy"
            width="16"
            height="16"
            decoding="async"
            className="transition-all duration-200 ease-in-out group-hover:translate-x-1 group-hover:drop-shadow-sm"
            src="/arrow-right.svg"
          />
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-300 text-2xl"
          aria-label="menu-button"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-3 mx-auto w-full max-w-[1060px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            <a
              className="hover:text-white text-gray-300 py-2 px-4 rounded-lg hover:bg-white/10 transition-all"
              href="#services"
              onClick={() => setOpen(false)}
            >
              Services
            </a>
            <a
              className="hover:text-white text-gray-300 py-2 px-4 rounded-lg hover:bg-white/10 transition-all"
              href="#features"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
            <a
              className="hover:text-white text-gray-300 py-2 px-4 rounded-lg hover:bg-white/10 transition-all"
              href="#pricing"
              onClick={() => setOpen(false)}
            >
              Pricing
            </a>
            <a
              className="flex items-center justify-center gap-2 border border-white/20 px-6 py-3 rounded-full
                  bg-white/10 backdrop-blur-md text-gray-200 hover:bg-white/15 hover:shadow-lg transition-all mt-2"
              href="#"
              onClick={() => setOpen(false)}
            >
              Try For Free
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}