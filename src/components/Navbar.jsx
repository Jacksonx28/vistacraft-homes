import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home",       href: "#hero" },
  { label: "Residences", href: "#residences" },
  { label: "About",      href: "#about" },
  { label: "Locations",  href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          flex items-center justify-between
          px-8 md:px-14 h-20
          transition-all duration-500
          ${scrolled
            ? "bg-navy/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
          }
        `}
      >
        {/* Brand Logo - Isolated on the left */}
        <a href="#hero" className="flex items-center flex-shrink-0">
          <img 
            src="assets/logo.png" 
            alt="VistaCraft Logo" 
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Links - Clustered on the right to prevent overlap */}
        <div className="hidden md:flex items-center gap-10 ml-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/75 hover:text-white no-underline text-[0.75rem] font-medium tracking-[0.2em] uppercase transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-sky-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="#contact"
            className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 no-underline px-6 py-2.5 text-[0.7rem] font-medium tracking-[0.15em] uppercase border border-sky-500/30 rounded-sm transition-all duration-300 ml-4"
          >
            Enquire
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer z-[1001]"
        >
          <span
            className="w-6 h-px bg-white transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "" }}
          />
          <span
            className="w-6 h-px bg-white transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? "translateY(-3.5px) rotate(-45deg)" : "" }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden fixed top-20 left-0 right-0 z-[999] bg-navy/95 backdrop-blur-2xl px-8 py-6 border-b border-white/[0.06]"
          >
            {[...links, { label: "Enquire", href: "#contact" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                className="block text-white/80 hover:text-sky-400 no-underline font-cormorant text-2xl font-light tracking-[0.05em] py-4 border-b border-white/[0.03]"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}