import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AREAS = [
  { name: "Old Ikoyi",     tag: "Flagship Territory", color: "#3B82F6" },
  { name: "Victoria Island", tag: "3 Active Projects", color: "#1E40AF" },
  { name: "Banana Island", tag: "Ultra-Luxury",       color: "#C9A84C" },
  { name: "Eko Atlantic",  tag: "Emerging Landmark",  color: "#3B82F6" },
  { name: "Lekki Phase 1", tag: "2 Available Now",    color: "#1E40AF" },
];

export default function LocationMap() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="location" className="py-32 px-14">
      <div
        ref={ref}
        className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <SectionTag>Prestige Addresses</SectionTag>
          <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,3.8rem)] font-light
                         text-white leading-[1.15] mb-4">
            Rooted in<br />
            Lagos' <em className="italic text-sky-400">Finest</em>
          </h2>
          <p className="text-white/55 font-light text-sm leading-[1.85] max-w-[480px] mb-10">
            Our projects occupy the most coveted coordinates in West Africa's commercial capital
            — where proximity is priceless and address defines legacy.
          </p>

          {/* Area list */}
          <div>
            {AREAS.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="flex items-center gap-4 py-4
                           border-b border-white/[0.06] last:border-none"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: area.color, boxShadow: `0 0 8px ${area.color}80` }}
                />
                <span className="font-cormorant text-base font-normal text-white flex-1">
                  {area.name}
                </span>
                <span className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40">
                  {area.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-sm overflow-hidden aspect-[4/3]"
        >
          <LagosMapSVG />
        </motion.div>
      </div>
    </section>
  );
}

function LagosMapSVG() {
  return (
    <svg viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Ocean */}
      <rect width="500" height="380" fill="#071830" />
      {/* Water shimmer lines */}
      {[300, 320, 340, 360].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y}
          stroke="rgba(59,130,246,0.06)" strokeWidth="1" />
      ))}
      {/* Mainland */}
      <path
        d="M0 0 L500 0 L500 140 Q450 145 400 142 L300 138 L200 140 L100 145 L0 150 Z"
        fill="#0D2A4A"
      />
      {/* Lagos Island mass */}
      <path
        d="M60 180 Q80 160 130 155 L260 150 Q300 148 340 155 L420 165 Q450 175 460 195 L455 240 Q440 260 400 265 L250 270 Q200 275 150 268 L80 255 Q55 245 50 220 Z"
        fill="#0D2A4A"
      />
      {/* Ikoyi highlight */}
      <path d="M240 155 L310 153 L315 215 L235 218 Z"
        fill="rgba(30,64,175,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
      {/* VI highlight */}
      <path d="M315 155 L395 160 L400 220 L318 218 Z"
        fill="rgba(30,64,175,0.12)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
      {/* Banana Island */}
      <ellipse cx="370" cy="135" rx="30" ry="12"
        fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      {/* Roads */}
      <line x1="0" y1="165" x2="500" y2="165" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      <line x1="180" y1="100" x2="180" y2="280" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="320" y1="95" x2="320" y2="275" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="0" y1="210" x2="500" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* Bridge lines */}
      <line x1="180" y1="140" x2="180" y2="165"
        stroke="rgba(59,130,246,0.2)" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="320" y1="140" x2="320" y2="155"
        stroke="rgba(59,130,246,0.2)" strokeWidth="2" strokeDasharray="5,3" />

      {/* Pin: Ikoyi (pulsing) */}
      <circle cx="270" cy="182" r="16" fill="none"
        stroke="rgba(59,130,246,0.4)" strokeWidth="1">
        <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="270" cy="182" r="6" fill="#3B82F6" />
      <circle cx="270" cy="182" r="3" fill="#fff" />

      {/* Pin: VI */}
      <circle cx="352" cy="186" r="6" fill="#1E40AF" />
      <circle cx="352" cy="186" r="3" fill="#fff" />

      {/* Pin: Banana Island */}
      <circle cx="370" cy="132" r="6" fill="#C9A84C" />
      <circle cx="370" cy="132" r="3" fill="#fff" />

      {/* Labels */}
      <text x="250" y="200" fill="rgba(255,255,255,0.5)" fontSize="9"
        fontFamily="DM Sans,sans-serif" textAnchor="middle" letterSpacing="0.08em">Ikoyi</text>
      <text x="355" y="204" fill="rgba(255,255,255,0.5)" fontSize="9"
        fontFamily="DM Sans,sans-serif" textAnchor="middle" letterSpacing="0.08em">V.I.</text>
      <text x="370" y="120" fill="rgba(201,168,76,0.7)" fontSize="8"
        fontFamily="DM Sans,sans-serif" textAnchor="middle" letterSpacing="0.08em">Banana Is.</text>
      <text x="90" y="235" fill="rgba(255,255,255,0.3)" fontSize="9"
        fontFamily="DM Sans,sans-serif" letterSpacing="0.08em">Lagos Island</text>
      <text x="200" y="90" fill="rgba(255,255,255,0.3)" fontSize="9"
        fontFamily="DM Sans,sans-serif" textAnchor="middle" letterSpacing="0.08em">Mainland</text>
      <text x="440" y="360" fill="rgba(255,255,255,0.15)" fontSize="8"
        fontFamily="DM Sans,sans-serif" letterSpacing="0.08em">Atlantic Ocean</text>

      {/* Compass */}
      <g transform="translate(460,35)">
        <circle r="16" fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="0" y="-5" fill="rgba(255,255,255,0.5)" fontSize="7"
          fontFamily="DM Sans,sans-serif" textAnchor="middle">N</text>
        <line x1="0" y1="-2" x2="0" y2="-11"
          stroke="#3B82F6" strokeWidth="1.5" />
        <line x1="0" y1="2" x2="0" y2="10"
          stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </g>

      {/* Scale */}
      <g transform="translate(20,360)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="30" y="-5" fill="rgba(255,255,255,0.25)" fontSize="7"
          fontFamily="DM Sans,sans-serif" textAnchor="middle">2 km</text>
      </g>
    </svg>
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
