import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { milestones, photos, type Photo } from "../../data/content";
import { ease } from "../ui/motion";
import { Skyline, Wave } from "../decor/Ornaments";
import { lockScroll } from "../layout/SmoothScroll";

const H = "h-[50vh] max-h-[520px] min-h-[280px]";

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
