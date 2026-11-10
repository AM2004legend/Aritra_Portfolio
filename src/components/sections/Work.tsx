import { motion } from "framer-motion";
import { moreProjects, projects, type Project } from "../../data/content";
import { Chapter, ease } from "../ui/motion";
import { HowrahClip } from "../decor/Ornaments";

/* Postcard look per card: tone, tilt and a little vertical stagger. */
const looks = [
  { tone: "navy", tilt: -3.5, y: 0 },
  { tone: "paper", tilt: 2.5, y: 36 },
  { tone: "ink", tilt: -1.5, y: 8 },
  { tone: "paper", tilt: 3, y: 20 },
  { tone: "navy", tilt: -2.5, y: 0 },
  { tone: "paper", tilt: 2, y: 30 },
] as const;

const tones = {
  navy: { card: "bg-navy text-cream", sub: "text-cream/80", num: "rgba(169,189,227,0.7)", tag: "border-cream/30 text-cream/85" },
  ink: { card: "bg-ink text-cream", sub: "text-cream/75", num: "rgba(245,238,223,0.45)", tag: "border-cream/25 text-cream/80" },
  paper: { card: "bg-[#e8dfcc] text-navy border-2 border-navy", sub: "text-ink-2", num: "rgba(23,48,107,0.45)", tag: "border-navy/30 text-navy" },
};

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Postcard({ p, i }: { p: Project; i: number }) {
  const look = looks[i % looks.length];
  const t = tones[look.tone];
  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotate: look.tilt * 2 }}
      whileInView={{ opacity: 1, y: look.y, rotate: look.tilt }}
      whileHover={{ rotate: 0, y: look.y - 12, scale: 1.03, zIndex: 20 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
      className={`group relative aspect-[6/7] w-[min(86vw,360px)] overflow-hidden rounded-[14px] p-6 shadow-[0_26px_44px_-20px_rgba(23,48,107,0.5)] md:-mx-3 ${t.card}`}
    >
      {/* paper grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

      {/* giant outlined index number as the card's graphic */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-[16%] font-[family-name:var(--font-poster)] text-[12.5rem] leading-none transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-3"
        style={{ color: "transparent", WebkitTextStroke: `1.5px ${t.num}` }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* postmark */}
      <div
        aria-hidden
        className={`absolute right-5 top-5 grid h-[68px] w-[68px] rotate-12 place-items-center rounded-full border-[1.5px] border-dashed text-center font-[family-name:var(--font-mono)] text-[0.55rem] leading-tight uppercase ${t.tag}`}
      >
        <span>
          {p.tags[0]}
          <br />
          <span className="opacity-70">2026</span>
        </span>
      </div>

      <div className="relative flex h-full flex-col">
        {/* typewriter caption */}
        <p className={`max-w-[13.5rem] font-[family-name:var(--font-mono)] text-[0.78rem] leading-relaxed lowercase ${t.sub}`}>
          {p.line}
        </p>

        <h3 className="mt-auto font-[family-name:var(--font-poster)] text-[3.2rem] leading-[0.9] uppercase md:text-[3.6rem]">
          {p.name}
        </h3>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <span key={tag} className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.68rem] ${t.tag}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-4 font-[family-name:var(--font-mono)] text-[0.74rem] uppercase">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
              [ code ↗ ]
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
              [ live ↗ ]
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <div className="relative overflow-hidden">
      {/* Howrah Bridge peeking in from the right edge */}
      <HowrahClip className="absolute -right-[34vw] top-20 hidden w-[68vw] max-w-[1100px] opacity-[0.09] md:block" />

      <section id="work" className="relative mx-auto max-w-[1200px] px-5 pt-24 pb-10 md:px-10 md:pt-32 md:pb-14">
        <Chapter n="02" label="Selected work">
          Things I’ve <span className="italic">built.</span>
        </Chapter>

        <div className="flex flex-wrap justify-center gap-y-10 pb-10 md:gap-y-4">
          {projects.map((p, i) => (
            <Postcard key={p.name} p={p} i={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-[0.8rem] uppercase text-ink-2">
          <span className="text-navy">[ also built ]</span>
          {moreProjects.map((m) => (
            <a key={m.name} href={m.href} target="_blank" rel="noreferrer" className="link-draw">
              {m.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
