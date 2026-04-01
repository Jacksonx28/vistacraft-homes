import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const RESIDENCES = [
  {
    id: 0,
    title: "Ikoyi Sovereign",
    location: "Old Ikoyi · Lagos",
    status: "available",
    statusLabel: "Available Now",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    imgFull: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
    desc: "A six-bedroom waterfront masterpiece in Old Ikoyi. Curated finishes, private pool, and panoramic Lagos Lagoon vistas. Available for immediate acquisition.",
    featured: true,
  },
  {
    id: 1,
    title: "VI Eclipse",
    location: "Victoria Island · Lagos",
    status: "rising",
    statusLabel: "Rising Now",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
    imgFull: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85",
    desc: "An audacious mixed-use tower on Victoria Island. Full-floor penthouses from the 18th storey. Q4 2025 completion.",
  },
  {
    id: 2,
    title: "Banana Island Apex",
    location: "Banana Island · Lagos",
    status: "completed",
    statusLabel: "Completed",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    imgFull: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
    desc: "Our most awarded project — 8 ultra-luxury detached villas on Banana Island. A landmark of the city's skyline.",
  },
  {
    id: 3,
    title: "Lekki Pinnacle",
    location: "Lekki Phase 1 · Lagos",
    status: "available",
    statusLabel: "Available Now",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
    imgFull: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=85",
    desc: "Contemporary four-bedroom duplexes in Lekki Phase 1. Smart-home integrated. Two units remaining.",
  },
  {
    id: 4,
    title: "Eko Citadel",
    location: "Eko Atlantic · Lagos",
    status: "rising",
    statusLabel: "Rising Now",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
    imgFull: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=85",
    desc: "A boutique residential tower at Eko Atlantic City. 24 residences, Atlantic ocean frontage.",
  },
  {
    id: 5,
    title: "GRA Zenith",
    location: "GRA Ikeja · Lagos",
    status: "completed",
    statusLabel: "Completed",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    imgFull: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85",
    desc: "Five executive detached homes in GRA Ikeja. Completed and fully handed over in 2022.",
  },
];

const STATUS_STYLES = {
  available: "bg-green-500/10 text-green-400 border border-green-400/25",
  rising:    "bg-blue-500/10  text-blue-400  border border-blue-400/25",
  completed: "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25",
};
const DOT_STYLES = {
  available: "bg-green-400",
  rising:    "bg-blue-400",
  completed: "bg-[#C9A84C]",
};

export default function ResidencesGallery() {
  const [filter, setFilter]       = useState("all");
  const [lightbox, setLightbox]   = useState(null);
  const [ref, inView]             = useInView({ threshold: 0.1, triggerOnce: true });

  const visible = RESIDENCES.filter(r => filter === "all" || r.status === filter);

  return (
    <section id="residences" className="py-32 px-14 bg-navy">
      {/* Header */}
      <div
        ref={ref}
        className="max-w-[1300px] mx-auto mb-12 flex flex-wrap justify-between items-end gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <SectionTag>Portfolio</SectionTag>
          <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,3.8rem)] font-light
                         text-white leading-[1.15]">
            Residences of<br />
            <em className="italic text-sky-400">Distinction</em>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex gap-2 flex-wrap"
        >
          {[
            { key: "all",       label: "All" },
            { key: "available", label: "Available Now" },
            { key: "rising",    label: "Rising Now" },
            { key: "completed", label: "Completed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`
                px-5 py-2 text-[0.72rem] font-medium tracking-[0.12em] uppercase
                rounded-sm border transition-all duration-300
                ${filter === key
                  ? "bg-sky-500/12 border-sky-400 text-sky-400"
                  : "bg-transparent border-white/[0.08] text-white/45 hover:border-sky-400/60 hover:text-sky-300"
                }
              `}
            >
              {label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div
        className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px]"
        layout
      >
        <AnimatePresence>
          {visible.map((r, i) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className={`
                group relative overflow-hidden bg-[#0D2A4A]
                ${r.featured ? "row-span-2" : ""}
              `}
              style={{ aspectRatio: r.featured ? "auto" : "4/3" }}
              onClick={() => setLightbox(r)}
            >
              <img
                src={r.img}
                alt={r.title}
                loading="lazy"
                className="w-full h-full object-cover
                           brightness-75 saturate-90
                           group-hover:scale-[1.06] group-hover:brightness-85 group-hover:saturate-110
                           transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent
                              group-hover:opacity-70 transition-opacity duration-400" />
              {/* Expand icon */}
              <button
                className="absolute top-4 right-4 z-[2] w-9 h-9
                           bg-white/8 border border-white/15 rounded-full
                           flex items-center justify-center text-white
                           opacity-0 group-hover:opacity-100 transition-all duration-300
                           hover:bg-sky-500/30"
                aria-label="View"
              >
                ⤢
              </button>
              {/* Body */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]
                              translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm mb-3
                                  text-[0.62rem] font-semibold tracking-[0.2em] uppercase
                                  ${STATUS_STYLES[r.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${DOT_STYLES[r.status]}`} />
                  {r.statusLabel}
                </span>
                <h3 className="font-cormorant text-[1.4rem] font-normal text-white leading-[1.2] mb-1">
                  {r.title}
                </h3>
                <p className="text-[0.72rem] text-white/45 tracking-[0.1em]">{r.location}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-navy/96 z-[5000] flex items-center justify-center p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="max-w-3xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white
                           bg-none border-none text-xl transition-colors"
              >
                ✕
              </button>
              <img
                src={lightbox.imgFull}
                alt={lightbox.title}
                className="w-full max-h-[70vh] object-cover rounded-sm"
              />
              <div className="mt-6">
                <h3 className="font-cormorant text-3xl font-light text-white mb-2">
                  {lightbox.title}
                </h3>
                <p className="text-sm text-white/50 mb-3 tracking-[0.1em]">{lightbox.location}</p>
                <p className="text-white/65 text-sm leading-relaxed">{lightbox.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SectionTag({ children }) {
  return (
    <p className="flex items-center gap-3 text-sky-400 text-[0.68rem] font-medium
                  tracking-[0.35em] uppercase mb-6
                  before:content-[''] before:w-7 before:h-px before:bg-sky-400">
      {children}
    </p>
  );
}
