import { motion } from "framer-motion";
import { travel, type Polaroid } from "../../data/content";
import { Chapter, ease, Reveal } from "../ui/motion";

const tilts = [-3, 2, -1.5, 3, 2.5, -2, 1.5, -2.5];
const tapes = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];

function Card({ p, i }: { p: Polaroid; i: number }) {
  const tilt = tilts[i % tilts.length];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease, delay: (i % 4) * 0.07 }}
      className="relative bg-white p-2.5 pb-0 shadow-[0_14px_28px_-12px_rgba(20,20,20,0.35)] sm:p-3 sm:pb-0"
    >
      {/* washi tape */}
      <span
        aria-hidden
        className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 bg-sky/70 shadow-sm ${tapes[i % tapes.length]}`}
      />
      <div className="aspect-square overflow-hidden bg-cream-2">
        {p.src ? (
          <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: p.focus }} />
        ) : (
          <div className="grid h-full place-items-center border-2 border-dashed border-sand bg-cream">
            <svg viewBox="0 0 48 40" className="h-8 w-10 text-navy/35" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="9" width="42" height="28" rx="4" />
              <circle cx="24" cy="23" r="8" />
              <path d="M16 9l3-5h10l3 5" />
            </svg>
          </div>
        )}
      </div>
      <figcaption className="py-3 text-center font-[family-name:var(--font-hand)] text-[1.35rem] leading-none text-ink-2 sm:py-4 sm:text-[1.5rem]">
        {p.caption}
      </figcaption>
    </motion.figure>
  );
}

export default function Travel() {
  return (
    <section id="travel" className="relative bg-white">
      <div className="mx-auto max-w-[1200px] px-5 pt-8 pb-24 md:px-10 md:pt-10 md:pb-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Chapter n="04" label="Travel">
            Places I’ve <span className="italic text-navy">been.</span>
          </Chapter>
          <Reveal className="md:mb-16 md:max-w-xs">
            <p className="text-[1.05rem] leading-relaxed text-ink-2">A board of places I’ve been, and room for the next ones.</p>
          </Reveal>
        </div>

        {/* the board */}
        <div className="rounded-[28px] border border-sand bg-cream-2 p-6 shadow-[inset_0_2px_14px_rgba(23,48,107,0.12)] sm:p-10 md:p-12">
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-8 md:grid-cols-4 md:gap-y-12">
            {travel.map((p, i) => (
              <Card key={i} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
