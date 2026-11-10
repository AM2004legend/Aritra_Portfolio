import { motion } from "framer-motion";
import { moments, type Moment } from "../../data/content";
import { Chapter, ease, Reveal } from "../ui/motion";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Tile({ m, i }: { m: Moment; i: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease, delay: (i % 4) * 0.07 }}
      className={`group relative overflow-hidden rounded-[18px] bg-navy-deep shadow-[0_24px_44px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${m.span}`}
    >
      <img
        src={m.src}
        alt={m.caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        style={{ objectPosition: m.focus ?? "50% 50%" }}
      />
      {/* soft fade so the label always reads */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep/80 via-navy-deep/30 to-transparent" />
      <figcaption className="absolute bottom-4 left-5 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.08em] text-white uppercase">
        {m.caption}
      </figcaption>
    </motion.figure>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-[1] bg-navy"
    >
      {/* paper grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: GRAIN }} />

      <div className="relative mx-auto max-w-[1200px] px-5 pt-24 pb-24 md:px-10 md:pt-28 md:pb-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Chapter n="01" label="About" light>
              A little <span className="italic">about me.</span>
            </Chapter>
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:pt-16">
            <p className="text-lg font-normal leading-relaxed text-cream/85">
              I’m a third-year B.Tech student at Heritage Institute of Technology, Kolkata. I enjoy building reliable
              software, working with data and taking part in hackathons. Outside of code, I love to travel.
            </p>
          </Reveal>
        </div>

        <div className="mt-4 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
          {moments.map((m, i) => (
            <Tile key={m.src} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
