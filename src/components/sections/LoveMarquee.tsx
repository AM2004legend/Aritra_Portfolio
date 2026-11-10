import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/* Each row is a list of words. Strings in [brackets] are the highlighted phrases. */
const ROWS: string[][] = [
  ["LOVE", "LOVE", "[EXPLORING THE UNKNOWN]", "LOVE", "LOVE"],
  ["[CAFE HOPPING]", "LOVE", "[TRAVELLING]", "LOVE", "LOVE"],
  ["LOVE", "[MOUNTAINS]", "LOVE", "[BEACHES]", "LOVE"],
  ["LOVE", "[CODING]", "LOVE", "[MUSIC]", "LOVE", "LOVE"],
];

function Row({ words, i, progress }: { words: string[]; i: number; progress: MotionValue<number> }) {
  // a small horizontal drift tied to scroll; alternate rows go opposite ways
  const dir = i % 2 ? 1 : -1;
  const x = useTransform(progress, [0, 1], [`${-12 - dir * 6}%`, `${-12 + dir * 6}%`]);
  const run = [...words, ...words, ...words];
  return (
    <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
      {run.map((w, k) => {
        const hot = w.startsWith("[");
        return (
          <span key={k} className={`mr-[0.3em] ${hot ? "text-[#2a4bd7]" : "text-ink"}`}>
            {hot ? w.slice(1, -1) : w}
          </span>
        );
      })}
    </motion.div>
  );
}

export default function LoveMarquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 });

  return (
    <section ref={ref} aria-label="Things I love" className="relative overflow-hidden py-8 md:py-12">
      <span className="sr-only">
        I love exploring the unknown, cafe hopping, travelling, mountains, beaches, coding and music.
      </span>
      <div
        aria-hidden
        className="font-[family-name:var(--font-grotesk)] text-[clamp(2.4rem,6.2vw,5.6rem)] leading-[1.02] font-extrabold tracking-[-0.045em] uppercase"
      >
        {ROWS.map((words, i) => (
          <Row key={i} words={words} i={i} progress={progress} />
        ))}
      </div>
    </section>
  );
}
