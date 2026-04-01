import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Marquee from "./components/Marquee";
import ResidencesGallery from "./components/ResidencesGallery";
import About from "./components/About";
import LocationMap from "./components/LocationMap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progressRef.current) {
        progressRef.current.style.width = `${scrolled * 100}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Scroll progress */}
        <div
          ref={progressRef}
          className="fixed top-0 left-0 h-[2px] z-[9999] bg-gradient-to-r from-royal to-sky-500 transition-all"
          style={{ width: "0%" }}
        />

        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Marquee
            items={[
              "Ikoyi Sovereign",
              "Victoria Island Eclipse",
              "Lekki Phase 1 Pinnacle",
              "Banana Island Apex",
              "Eko Atlantic Citadel",
            ]}
          />
          <ResidencesGallery />
          <About />
          <Marquee
            reverse
            items={[
              "Mastery in Every Beam",
              "Elevate Beyond Ordinary",
              "Forge Lagos' Boldest Horizons",
              "Built for Legacy",
            ]}
          />
          <LocationMap />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
