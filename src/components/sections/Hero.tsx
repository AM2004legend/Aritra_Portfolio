import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education, highlights, profile, skills } from "../../data/content";
import { ease, Magnetic, Reveal, SplitText } from "../ui/motion";
import { useOpenResume } from "../layout/ResumeModal";
import { scrollToId } from "../layout/SmoothScroll";

const ARCH = "999px 999px 0 0";

/*
 * Stone archway drawn in a 300 x 400 space that matches the photo (3:4).
 * Voussoirs run around the semicircle, a navy keystone sits on top, and
 * the jambs are stacked blocks with staggered joints, like brickwork.
 */
const CX = 150;
const CY = 150;
const R_IN = 154;
const R_OUT = 184;
const GAP = 0.012; // radians between voussoirs

function voussoirs() {
  const n = 15;
  const out: { d: string; key: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI + (i / n) * Math.PI + GAP;
    const a1 = Math.PI + ((i + 1) / n) * Math.PI - GAP;
    const key = i === Math.floor(n / 2);
    const ro = key ? R_OUT + 10 : R_OUT;
    const p = (r: number, a: number) => `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
    out.push({
      d: `M${p(R_IN, a0)} L${p(ro, a0)} A${ro} ${ro} 0 0 1 ${p(ro, a1)} L${p(R_IN, a1)} A${R_IN} ${R_IN} 0 0 0 ${p(R_IN, a0)}Z`,
      key,
    });
  }
  return out;
}

function jambs() {
  const blocks: { x: number; y: number; w: number; h: number }[] = [];
  const w = R_OUT - R_IN;
  const left = CX - R_OUT;
  const right = CX + R_IN;
  let y = CY + 2;
  let row = 0;
  while (y < 400) {
    const h = row % 2 ? 26 : 38;
    const hh = Math.min(h, 400 - y);
    // alternate a full block with a pair of half blocks for a brick bond
    if (row % 2) {
      blocks.push({ x: left, y, w: w / 2 - 1.5, h: hh }, { x: left + w / 2 + 1.5, y, w: w / 2 - 1.5, h: hh });
      blocks.push({ x: right, y, w: w / 2 - 1.5, h: hh }, { x: right + w / 2 + 1.5, y, w: w / 2 - 1.5, h: hh });
    } else {
      blocks.push({ x: left, y, w, h: hh }, { x: right, y, w, h: hh });
    }
    y += h + 3;
    row++;
  }
  return blocks;
}

function StoneArch() {
  const vs = voussoirs();
  const js = jambs();
  return (
    <svg
      aria-hidden
      viewBox={`${CX - R_OUT - 12} ${CY - R_OUT - 14} ${2 * R_OUT + 24} ${400 - (CY - R_OUT - 14)}`}
      className="pointer-events-none absolute z-10 overflow-visible"
      style={{
        left: `${((CX - R_OUT - 12) / 300) * 100}%`,
        top: `${((CY - R_OUT - 14) / 400) * 100}%`,
        width: `${((2 * R_OUT + 24) / 300) * 100}%`,
        height: `${((400 - (CY - R_OUT - 14)) / 400) * 100}%`,
      }}
    >
      {/* jambs rise first, from the ground up */}
      {js
        .slice()
        .sort((a, b) => b.y - a.y)
        .map((b, i) => (
          <motion.rect
            key={`j${i}`}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="2.5"
            fill="#fff"
            stroke="#17306b"
            strokeWidth="1.3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.5 + i * 0.025 }}
          />
        ))}
      {/* then the arch, both sides meeting at the keystone */}
      {vs.map((v, i) => {
        const order = Math.min(i, vs.length - 1 - i);
        return (
          <motion.path
            key={`v${i}`}
            d={v.d}
            fill={v.key ? "#17306b" : "#fff"}
            stroke="#17306b"
            strokeWidth="1.3"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={{ duration: 0.5, ease, delay: 0.9 + order * 0.07 }}
          />
        );
      })}
    </svg>
  );
}

function ArchPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div ref={ref} className="relative mx-auto w-[min(70vw,370px)]">
      {/* soft disc behind the arch, like a late-afternoon sun over the Hooghly */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.2 }}
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cream-2"
      />
      {/* blue disc behind the lower left of the arch */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.35 }}
        className="absolute -left-24 bottom-[8%] h-64 w-64 rounded-full bg-[#c9d6ee]"
      />

      <div className="relative">
      {/* whitewashed stone archway, built block by block */}
      <StoneArch />

      {/* photo inside the arch */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, ease, delay: 0.3 }}
        className="relative aspect-[3/4] overflow-hidden bg-white"
        style={{ borderRadius: ARCH }}
      >
        <motion.img
          src={profile.portrait}
          alt="Aritra Maity"
          style={{ y, scale: 1.1 }}
          className="h-full w-full object-cover object-[50%_28%]"
          fetchPriority="high"
        />
      </motion.div>
      </div>
    </div>
  );
}

function Glance() {
  return (
    <Reveal className="relative mx-auto mt-24 max-w-[1200px] px-5 md:mt-28 md:px-10">
      <div className="overflow-hidden rounded-[22px] border border-sand bg-white shadow-[0_24px_60px_-28px_rgba(23,48,107,0.5)]">
        <div className="flex items-center justify-between bg-navy px-6 py-3 text-cream md:px-8">
          <span className="caps !text-[0.66rem]">At a glance</span>
          <span className="caps hidden !text-[0.66rem] text-cream/70 sm:inline">Open to internships</span>
        </div>
        <div className="grid divide-y divide-sand md:grid-cols-[1.1fr_1.3fr_1fr] md:divide-x md:divide-y-0">
          <div className="p-6 md:p-8">
            <div className="caps mb-4 text-navy">Education</div>
            <div className="space-y-5">
              {education.map((e) => (
                <div key={e.place}>
                  <div className="display text-[1.15rem] leading-snug text-ink">{e.title}</div>
                  <div className="mt-1 text-[0.95rem] text-ink-2">{e.place}</div>
                  <div className="mt-1 text-sm text-muted">{e.meta}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="caps mb-4 text-navy">Skills</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.025 }}
                  className="rounded-full border border-navy/20 bg-cream px-3 py-1 text-[0.9rem] text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="caps mb-4 text-navy">Highlights</div>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.98rem] leading-snug text-ink">
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-navy" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Hero() {
  const openResume = useOpenResume();

  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Greek key borders on the hero margins */}
      <div aria-hidden className="meander-y pointer-events-none absolute inset-y-0 left-5 hidden opacity-45 xl:block" />
      <div aria-hidden className="meander-y pointer-events-none absolute inset-y-0 right-5 hidden opacity-45 xl:block" />
      <div className="mx-auto grid max-w-[1200px] items-center gap-20 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="relative z-10 md:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="caps mb-7 text-navy"
          >
            Software engineer · Kolkata
          </motion.div>

          <h1 className="display text-[clamp(3.2rem,8vw,7rem)] leading-[0.98] text-ink">
            <SplitText text="Hey, I’m" onMount delay={0.2} />
            <br />
            <SplitText text="Aritra." onMount delay={0.38} className="italic text-navy" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="mt-8 max-w-[30rem] text-lg font-normal leading-relaxed text-ink-2"
          >
            Computer Science &amp; Business Systems student at Heritage Institute of Technology, Kolkata. I build backend
            systems, data pipelines and on-device AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("work")}
                className="caps rounded-full bg-ink px-7 py-4 !text-[0.68rem] text-white transition-transform active:scale-95"
              >
                See my work
              </button>
            </Magnetic>
            <button
              onClick={openResume}
              className="caps rounded-full border border-navy px-7 py-4 !text-[0.68rem] text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Résumé
            </button>
          </motion.div>
        </div>

        <div className="md:col-span-5">
          <ArchPortrait />
        </div>
      </div>

      <Glance />
    </section>
  );
}
