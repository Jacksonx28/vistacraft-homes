import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: videoY }}
      >
        <video 
          src="/assets/tea1.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover" 
        />
        {/* Overlay to keep the text dark, luxury, and legible */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/60 to-navy/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-[900px]"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sky-400 text-[0.7rem] font-medium tracking-[0.3em] uppercase block mb-6"
        >
          Vista Craft Homes
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-5xl md:text-7xl font-light text-white mb-8 leading-tight"
        >
          A Statement of Success, a Sanctuary of Style
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#residences"
            className="bg-white text-navy no-underline hover:bg-white/90 px-9 py-4 text-[0.8rem] font-medium tracking-[0.12em] uppercase rounded-sm transition-all duration-300"
          >
            Explore Residences
          </a>
          <a
            href="#about"
            className="bg-transparent text-white no-underline border border-white/25 hover:border-white/60 hover:bg-white/5 px-9 py-4 text-[0.8rem] font-medium tracking-[0.12em] uppercase rounded-sm transition-all duration-300"
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 text-white/40 text-[0.65rem] tracking-[0.3em] uppercase">
        <div className="w-px h-12 bg-gradient-to-b from-sky-500/60 to-transparent animate-pulse" />
        <span>Scroll</span>
      </div>
    </section>
  );
}