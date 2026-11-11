import { motion } from "framer-motion";
import { travel, type Polaroid } from "../../data/content";
import { Chapter, ease, Reveal } from "../ui/motion";

const BOARD_TEXTURE = [
  // fine fibres and speckles
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.33  0 0 0 0 0.22  0 0 0 0 0.1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23f)'/></svg>\")",
  // larger, softer mottling so it reads as paper, not flat colour
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed='8' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.42  0 0 0 0 0.29  0 0 0 0 0.13  0 0 0 0.7 -0.12'/></filter><rect width='100%' height='100%' filter='url(%23m)'/></svg>\")",
  // faint dark specks
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='s'><feTurbulence type='turbulence' baseFrequency='0.6' numOctaves='1' seed='21'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 0 0.06  0 0 0 12 -10.4'/></filter><rect width='100%' height='100%' filter='url(%23s)'/></svg>\")",
].join(",");

const tilts = [-3, 2, -1.5, 3, 2.5, -2, 1.5, -2.5];
const tapes = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];

/** A loose postage stamp stuck on the board. */
function Stamp({ src, className = "", rotate = 0, delay = 0 }: { src: string; className?: string; rotate?: number; delay?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, rotate: rotate * 2 }}
      whileInView={{ opacity: 0.92, scale: 1, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={`pointer-events-none mix-blend-multiply ${className}`}
    />
  );
}

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
            Wander-<span className="italic text-navy">lust</span>
          </Chapter>
          <Reveal className="md:mb-16 md:max-w-xs">
            <p className="text-[1.05rem] leading-relaxed text-ink-2">A board of places I’ve been, and room for the next ones.</p>
          </Reveal>
        </div>

        {/* the board */}
        <div
          className="relative overflow-hidden rounded-[28px] border border-sand bg-[#e6d8bd] p-6 shadow-[inset_0_2px_18px_rgba(60,40,15,0.18),0_18px_40px_-28px_rgba(23,48,107,0.4)] sm:p-10 md:p-12"
        >
          {/* kraft paper: soft mottling + fine fibres + speckles */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: BOARD_TEXTURE }} />

          {/* vision-board extras: loose postage stamps in the corners (wider screens) */}
          <Stamp src="/photos/stamp-ny.png" className="absolute left-6 top-6 hidden w-24 md:block" rotate={-12} delay={0.3} />
          <Stamp src="/photos/stamp-washington.png" className="absolute right-8 top-8 hidden w-20 md:block" rotate={10} delay={0.4} />

          {/* prayer flags strung across the top of the board */}
          <motion.img
            src="/photos/prayer-flags.png"
            alt=""
            aria-hidden
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0, rotate: [0, 0.8, -0.6, 0] }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 0.8, ease },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-none relative mx-auto -mt-2 mb-8 w-full origin-top drop-shadow-[0_8px_10px_rgba(60,40,15,0.25)] sm:w-[78%] md:mb-10 md:w-[58%]"
          />

          <div className="relative grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-8 md:grid-cols-4 md:gap-y-12">
            {travel.map((p, i) => (
              <Card key={i} p={p} i={i} />
            ))}
          </div>

          {/* stamps along the bottom */}
          <div className="relative mt-10 flex items-end justify-between gap-4 md:mt-12">
            <Stamp src="/photos/stamp-airmail.png" className="relative hidden w-36 md:block" rotate={5} delay={0.2} />
            <Stamp src="/photos/stamps-cluster.png" className="relative mx-auto w-[86%] sm:w-[60%] md:mx-0 md:w-[320px]" rotate={-4} delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}
