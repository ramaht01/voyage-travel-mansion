import { useState } from "react";
import logo from "../assets/Logo.travel.jpeg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="border-b border-white/10 bg-slate-800  shadow-lg  animate-[navEnter_1200ms_ease-out]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo / Brand */}
          <a href="#home" className="group flex items-center">
            <img
              src={logo}
              alt="Voyage Travel Mansion"
              className="h-14 w-14 rounded-full object-contain transition-all duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-lg group-hover:shadow-cyan-400/20"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
           <a
  href="#home"
  className="group relative text-sm font-semibold text-white transition duration-300 hover:text-cyan-400"
>
  Home
  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
</a>

<a
  href="#about"
  className="group relative text-sm font-semibold text-white transition duration-300 hover:text-cyan-400"
>
  About
  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
</a>


           <a
  href="#services"
  className="group relative text-sm font-semibold text-white transition duration-300 hover:text-cyan-400"
>
  Services
  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
</a>

           <a
  href="#flight-booking"
  className="group relative text-sm font-semibold text-white transition duration-300 hover:text-cyan-400"
>
  Flight Booking
  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
</a>

    <a
  href="#visa"
  className="group relative text-sm font-semibold text-white transition duration-300 hover:text-cyan-400"
>
  Visa Assistance
  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
</a>       

           <a
  href="#contact"
  className="group relative text-sm font-semibold text-white transition duration-300 hover:text-cyan-400"
>
  Contact
  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full" />
</a>
          </div>

          {/* WhatsApp Button */}
        <a
  href="https://wa.me/27695877716"
  target="_blank"
  rel="noopener noreferrer"
  className="hidden rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-400/20 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/25 active:translate-y-0 md:block hover:scale-110"
>
  WhatsApp Us
</a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-white/30 bg-white/5 px-3 py-2 text-xl text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-slate-700 px-6 py-5 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-sm font-semibold text-white transition hover:text-cyan-400"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-sm font-semibold text-white transition hover:text-cyan-400"
              >
                About
              </a>

              <a
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-sm font-semibold text-white transition hover:text-cyan-400"
              >
                Services
              </a>

              <a
                href="#flight-booking"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-sm font-semibold text-white transition hover:text-cyan-400  "
              >
                Flight Booking
              </a>

              <a
                href="#visa"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-sm font-semibold text-white transition hover:text-cyan-400"
              >
                Visa Assistance
              </a>

              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-sm font-semibold text-white transition hover:text-cyan-400"
              >
                Contact
              </a>

              <a
                href="https://wa.me/27695877716"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-cyan-400"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
