import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { milestones, photos, type Photo } from "../../data/content";
import { ease } from "../ui/motion";
import { Skyline, Wave } from "../decor/Ornaments";
import { lockScroll } from "../layout/SmoothScroll";

const H = "h-[50vh] max-h-[520px] min-h-[280px]";

/* Little road-trip van, beige and light blue. Wheels turn with scroll. */
const BEIGE = "#efe4cc";
const BEIGE_DARK = "#d9c7a3";
const SKY = "#a9bde3";
const SKY_DARK = "#7f9ad6";

function Wheel({ cx, spin }: { cx: number; spin: MotionValue<number> }) {
  return (
    <motion.g style={{ rotate: spin, transformBox: "fill-box", transformOrigin: "center" }}>
      <circle cx={cx} cy="96" r="15" fill="#0f2250" />
      <circle cx={cx} cy="96" r="7.5" fill={BEIGE} />
      <rect x={cx - 1.2} y="89" width="2.4" height="14" fill="#0f2250" />
      <rect x={cx - 7} y="94.8" width="14" height="2.4" fill="#0f2250" />
    </motion.g>
  );
}

function Van({ spin }: { spin: MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 200 116"
      className="w-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]"
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* luggage on the roof rack */}
      <rect x="58" y="10" width="34" height="20" rx="3" fill={SKY_DARK} />
      <rect x="72" y="6" width="8" height="5" rx="2" fill="none" stroke={SKY_DARK} strokeWidth="2" />
      <rect x="94" y="16" width="26" height="14" rx="3" fill={BEIGE_DARK} />
      <rect x="40" y="20" width="18" height="10" rx="2" fill={SKY} />
      <rect x="34" y="30" width="96" height="3.5" rx="1.5" fill="#0f2250" />
      <rect x="44" y="33" width="3" height="7" fill="#0f2250" />
      <rect x="116" y="33" width="3" height="7" fill="#0f2250" />
      {/* body */}
      <path d="M22 42 H140 Q150 42 158 52 L176 70 Q186 72 186 82 V92 Q186 98 180 98 H20 Q14 98 14 92 V50 Q14 42 22 42 Z" fill={BEIGE} />
      <path d="M14 70 H186 V80 H14 Z" fill={SKY} />
      <path d="M14 80 H186 V92 Q186 98 180 98 H20 Q14 98 14 92 Z" fill={BEIGE_DARK} />
      {/* windows */}
      <rect x="28" y="50" width="34" height="16" rx="3" fill={SKY} />
      <rect x="70" y="50" width="40" height="16" rx="3" fill={SKY} />
      <path d="M118 50 H146 L162 66 H118 Z" fill={SKY} />
      <rect x="118" y="50" width="2" height="16" fill={BEIGE} />
      {/* door line, handle, lights, spare wheel */}
      <rect x="114" y="46" width="1.6" height="46" fill={BEIGE_DARK} />
      <rect x="120" y="73" width="8" height="2" rx="1" fill="#0f2250" />
      <rect x="180" y="74" width="7" height="6" rx="1.5" fill="#f5eedf" />
      <rect x="6" y="56" width="9" height="26" rx="4" fill="#0f2250" />
      <Wheel cx={50} spin={spin} />
      <Wheel cx={150} spin={spin} />
    </motion.svg>
  );
}

function Frame({ p, i, onOpen }: { p: Photo; i: number; onOpen: () => void }) {
  return (
    <figure className="shrink-0" style={{ marginTop: i % 2 ? "7vh" : 0 }}>
      <motion.button
        layoutId={`photo-${p.src}`}
        onClick={onOpen}
        className={`group relative block ${H} cursor-zoom-in overflow-hidden rounded-[4px] border-[3px] border-white bg-white`}
        style={{ aspectRatio: p.ratio }}
        transition={{ duration: 0.6, ease }}
      >
        <img
          src={p.src}
          alt={p.caption}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </motion.button>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className="display text-lg italic text-white">{p.caption}</span>
        <span className="caps !text-[0.58rem] text-sky">{p.date}</span>
      </figcaption>
    </figure>
  );
}

export default function Hackathons() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState<Photo | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const vanX = useTransform(scrollYProgress, [0, 1], ["-22vw", "104vw"]);
  const wheelSpin = useTransform(scrollYProgress, [0, 1], [0, 1440]);

  useEffect(() => {
    lockScroll(!!open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Kolkata skyline rising into the navy section */}
      <div aria-hidden className="relative -mb-px">
        <Skyline className="h-[90px] md:h-[130px]" />
      </div>

      <section id="weekends" ref={section} className="relative bg-navy text-white" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-8 pl-5 pr-[8vw] md:gap-12 md:pl-10">
            {/* intro */}
            <div className={`flex ${H} w-[min(80vw,380px)] shrink-0 flex-col justify-center gap-6 md:ml-[max(0px,calc((100vw-1200px)/2))]`}>
              <div className="font-[family-name:var(--font-mono)] text-[0.78rem] tracking-[0.06em] uppercase text-sky">[ 03 ] Hackathons</div>
              <h2 className="font-[family-name:var(--font-poster)] text-[clamp(2.8rem,5.6vw,5rem)] leading-[0.92] uppercase text-white [&_.italic]:not-italic">
                Weekends, <span className="italic text-sky">mostly.</span>
              </h2>
              <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase text-cream/70">
                Scroll
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                  →
                </motion.span>
              </div>
            </div>

            {photos.map((p, i) => (
              <Frame key={p.src} p={p} i={i} onOpen={() => setOpen(p)} />
            ))}

            {/* scoreboard */}
            <div className="w-[min(84vw,400px)] shrink-0 self-center rounded-[20px] border border-white/15 bg-navy-deep/60 p-7">
              <div className="caps mb-5 text-sky">The scoreboard</div>
              <ol className="space-y-3.5">
                {milestones.map((m) => (
                  <li key={m.title} className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-3.5">
                    <span className="display text-[1.1rem] leading-snug text-white">{m.title}</span>
                    {m.year && <span className="caps !text-[0.58rem] text-sky">{m.year}</span>}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* road + van driving along with the slider */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[4%] h-[86px] md:bottom-[3%] md:h-[104px]">
            <div className="absolute inset-x-0 bottom-[10px] h-[2px] bg-cream/30" />
            <div className="absolute inset-x-0 bottom-[3px] h-[2px] bg-[repeating-linear-gradient(90deg,rgba(245,238,223,0.35)_0_26px,transparent_26px_52px)]" />
            <motion.div style={{ x: vanX }} className="absolute bottom-[8px] left-0 w-[150px] md:w-[190px]">
              <Van spin={wheelSpin} />
            </motion.div>
          </div>
        </div>
      </section>
      <div aria-hidden className="-mt-px bg-navy">
        <Wave className="h-[50px] md:h-[80px]" />
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex cursor-zoom-out flex-col items-center justify-center p-4 md:p-10"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy-deep/90 backdrop-blur-md" />
            <motion.div
              layoutId={`photo-${open.src}`}
              className="relative overflow-hidden rounded-[4px] border-[3px] border-white bg-white"
              style={{ aspectRatio: open.ratio, width: `min(92vw, calc(78svh * ${open.ratio}))` }}
              transition={{ duration: 0.6, ease }}
            >
              <img src={open.src} alt={open.caption} className="h-full w-full object-cover" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
              className="relative mt-5 text-center"
            >
              <span className="display text-xl italic text-white">{open.caption}</span>
              <span className="caps ml-3 !text-[0.6rem] text-sky">{open.date}</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
