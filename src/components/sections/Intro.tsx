import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "../ui/motion";
import { scrollToId } from "../layout/SmoothScroll";

const BLOB =
  "M50 4 C72 2 92 18 90 42 C88 60 98 78 96 100 C94 128 76 148 50 147 C24 146 4 130 5 104 C6 82 12 66 9 46 C6 20 28 6 50 4 Z";

const WORDS = ["first name", "Aritra", "developer", "traveller"];

/** {{ first name | }} — types, pauses, deletes, moves to the next word. */
function Typer() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[i % WORDS.length];
    let t: number;
    if (!deleting && text === word) t = window.setTimeout(() => setDeleting(true), 1600);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else
      t = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 45 : 95,
      );
    return () => window.clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="font-[family-name:var(--font-mono)] whitespace-nowrap text-navy">
      {"{{ "}
      {text}
      <motion.span
        className="ml-0.5 inline-block w-[2px] translate-y-[0.12em] bg-navy align-baseline"
        style={{ height: "1em" }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
      {" }}"}
    </span>
  );
}

/** Duotone portrait in a blob, with loose hand-drawn outlines around it. */
function Portrait() {
  return (
    <div className="relative aspect-[805/1200] h-full">
      <svg aria-hidden viewBox="0 0 100 150" className="absolute -inset-[9%] h-[118%] w-[118%] overflow-visible text-navy">
        <defs>
          <filter id="sketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </defs>
        {[
          { k: 1.05, r: -3, dash: "58 5 30 7", w: 1.8, d: 0.9 },
          { k: 1.1, r: 4, dash: "34 9 40 17", w: 1.4, d: 1.1 },
          { k: 1.15, r: -1, dash: "18 14 26 42", w: 1.1, d: 1.3 },
        ].map((l, idx) => (
          <motion.path
            key={idx}
            d={BLOB}
            pathLength={100}
            fill="none"
            stroke="currentColor"
            strokeWidth={l.w}
            strokeLinecap="round"
            strokeDasharray={l.dash}
            vectorEffect="non-scaling-stroke"
            filter="url(#sketch)"
            transform={`translate(50 75) rotate(${l.r}) scale(${l.k}) translate(-50 -75)`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: l.d }}
          />
        ))}
      </svg>
      <motion.img
        src="/photos/intro-duotone.webp"
        alt="Aritra Maity"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.3, ease, delay: 0.25 }}
        className="relative h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(23,48,107,0.25)]"
        fetchPriority="high"
      />
    </div>
  );
}

/** A decorative sticker that pops in, then sways a little. */
function Sticker({ src, className, rotate, delay }: { src: string; className: string; rotate: number; delay: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute z-0 drop-shadow-[0_12px_14px_rgba(23,48,107,0.22)] ${className}`}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate * 2 }}
      animate={{ opacity: 1, scale: 1, rotate: [rotate, rotate + 3, rotate] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { type: "spring", stiffness: 260, damping: 14, delay },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function Word({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="poster block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const big = "text-[clamp(4.2rem,11.5vw,11.5rem)]";

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      {/* prayer flags strung from the top across to the right edge */}
      <motion.img
        src="/photos/prayer-flags.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[1.5%] top-[58px] z-20 hidden w-[min(36vw,60svh)] max-w-[560px] origin-top lg:block"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0, rotate: [0, 1.2, -0.8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.9 },
          y: { duration: 0.8, delay: 0.9, ease },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* corner decorations, anchored to the screen edges (not the centred content) */}
      <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-0 z-0">
          {/* conch resting in the bottom-left corner */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[8%] left-[3%] z-0 hidden w-[clamp(140px,14vw,220px)] lg:block"
            initial={{ opacity: 0, x: -20, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: [-4, -2, -4] }}
            transition={{
              opacity: { duration: 1, delay: 1.4 },
              x: { duration: 1, delay: 1.4, ease },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <img src="/photos/conch.png" alt="" className="w-full drop-shadow-[0_14px_16px_rgba(23,48,107,0.25)]" />
          </motion.div>

          {/* stickers in the empty corners */}
          <Sticker src="/photos/sticker-computer.webp" className="hidden left-[2.5%] top-[13%] w-[clamp(110px,10vw,165px)] lg:block" rotate={-8} delay={1.2} />
          <Sticker src="/photos/sticker-headphones.webp" className="hidden right-[2.5%] top-[44%] w-[clamp(105px,9.5vw,160px)] lg:block" rotate={7} delay={1.5} />
          {/* suitcase tucked behind, in the gap between HELLO and MEET */}
          <Sticker src="/photos/sticker-suitcase.webp" className="hidden left-[12%] top-[36%] w-[clamp(80px,6.5vw,120px)] lg:block" rotate={-5} delay={1.4} />
          <Sticker src="/photos/sticker-heart.webp" className="hidden bottom-[3%] right-[2%] w-[clamp(100px,8.5vw,165px)] lg:block" rotate={-6} delay={1.7} />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-5 pt-24 pb-16 md:px-10">
        {/* desktop composition */}
        <div className="relative hidden w-full grid-cols-[1fr_auto_1fr] grid-rows-2 items-center lg:grid" style={{ height: "min(72svh, 720px)" }}>
          <motion.div style={{ x: left }} className="relative z-10 -mr-[3vw] self-start justify-self-end pt-[4%]">
            <Word text="Hello" delay={0.35} className={big} />
          </motion.div>

          <motion.div style={{ y: photoY }} className="row-span-2 h-full">
            <Portrait />
          </motion.div>

          <motion.div style={{ x: right }} className="self-end pb-[8%] pl-[3vw]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-[clamp(1.4rem,2.6vw,2.6rem)]"
            >
              <Typer />
            </motion.div>
          </motion.div>

          <motion.div style={{ x: left }} className="relative z-10 -mr-[2vw] self-end justify-self-end pb-[2%]">
            <Word text="Meet" delay={0.5} className={big} />
          </motion.div>

          <motion.div style={{ x: right }} className="relative z-10 -ml-[2vw] self-end pb-[2%]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease }}
              className="mb-3 pl-[4vw] font-[family-name:var(--font-mono)] text-[0.78rem] tracking-[0.08em] text-ink uppercase"
            >
              Developer / Traveller / Builder
            </motion.div>
            <Word text="Aritra" delay={0.65} className={big} />
          </motion.div>
        </div>

        {/* mobile / tablet composition */}
        <div className="flex w-full flex-col items-center text-center lg:hidden">
          <div className="relative w-full">
            <Word text="Hello" delay={0.3} className="text-[clamp(4rem,18vw,8rem)]" />
            <Sticker src="/photos/sticker-computer.webp" className="left-0 top-1/2 w-[17vw] max-w-[96px] -translate-y-1/2" rotate={-10} delay={1.0} />
            <Sticker src="/photos/sticker-headphones.webp" className="right-0 top-1/2 w-[16vw] max-w-[92px] -translate-y-1/2" rotate={9} delay={1.15} />
          </div>
          <div className="relative mt-8 mb-14 flex w-full justify-center">
            <div className="h-[44svh] max-h-[440px]">
              <Portrait />
            </div>
            <Sticker src="/photos/sticker-suitcase.webp" className="left-[-1%] top-[6%] w-[12vw] max-w-[70px]" rotate={-6} delay={1.3} />
            <Sticker src="/photos/sticker-conch.webp" className="bottom-[2%] left-[-2%] w-[17vw] max-w-[96px]" rotate={-4} delay={1.45} />
            <Sticker src="/photos/sticker-heart.webp" className="right-[-2%] top-[38%] w-[16vw] max-w-[92px]" rotate={8} delay={1.6} />
          </div>
          <div className="text-[clamp(1.2rem,5vw,1.8rem)]">
            <Typer />
          </div>
          <div className="mt-6">
            <Word text="Meet Aritra" delay={0.5} className="text-[clamp(3rem,13vw,6rem)]" />
          </div>
          <div className="mt-3 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.08em] text-ink uppercase">
            Developer / Traveller / Builder
          </div>
        </div>

        <motion.button
          onClick={() => scrollToId("intro-end")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.12em] text-ink-2 uppercase"
        >
          Scroll{" "}
          <motion.span className="inline-block" animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ↓
          </motion.span>
        </motion.button>
      </motion.div>
      <div id="intro-end" />
    </section>
  );
}
