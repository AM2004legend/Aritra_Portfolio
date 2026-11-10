import { AnimatePresence, motion, useInView } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile } from "../../data/content";
import { Arrow, ease, Magnetic, Reveal, SplitText } from "../ui/motion";
import { TravelSkyline } from "../decor/Ornaments";
import { useOpenResume } from "../layout/ResumeModal";

const loadSphere = () => import("../decor/InkSphere");
const InkSphere = lazy(loadSphere);

export default function Contact() {
  const openResume = useOpenResume();
  const ref = useRef<HTMLElement>(null);
  const near = useInView(ref, { once: true, margin: "400px" });

  // the 3D sphere is a large chunk; start downloading it once the page is idle
  useEffect(() => {
    const t = window.setTimeout(() => void loadSphere(), 4000);
    return () => window.clearTimeout(t);
  }, []);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden border-t border-sand">
      {/* 3D sphere of navy dots, loaded only when close */}
      <div className="pointer-events-none absolute right-[-48%] top-[-2%] h-[78vw] w-[78vw] opacity-25 md:right-[-6%] md:top-[4%] md:h-[42rem] md:w-[42rem] md:opacity-100">
        {near && (
          <Suspense fallback={null}>
            <motion.div className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <InkSphere />
            </motion.div>
          </Suspense>
        )}
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 pt-28 pb-10 md:px-10 md:pt-36 md:pb-12">
        <Reveal y={12}>
          <div className="font-[family-name:var(--font-mono)] text-[0.78rem] tracking-[0.06em] uppercase text-navy">[ 05 ] Contact</div>
        </Reveal>

        <h2 className="mt-5 max-w-[12ch] font-[family-name:var(--font-poster)] text-[clamp(3.2rem,8.6vw,7.6rem)] leading-[0.9] uppercase text-ink [&_.italic]:not-italic">
          <SplitText text="Let’s" />{" "}
          <SplitText text="connect." delay={0.2} className="italic text-navy" />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-lg font-normal text-ink-2">
            Open to internships and collaborations. The best way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <a href={`mailto:${profile.email}`} className="display link-draw text-[clamp(1.3rem,3vw,2.2rem)] italic text-navy">
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={copy}
              className="caps relative h-12 w-32 overflow-hidden rounded-full border border-navy/30 bg-white !text-[0.62rem] text-navy transition-colors hover:border-navy"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="absolute inset-0 grid place-items-center"
                >
                  {copied ? "Copied" : "Copy email"}
                </motion.span>
              </AnimatePresence>
            </button>
            <Magnetic>
              <button
                onClick={openResume}
                className="caps h-12 rounded-full bg-navy px-7 !text-[0.62rem] text-white transition-colors hover:bg-navy-deep"
              >
                Résumé
              </button>
            </Magnetic>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="caps inline-flex h-12 items-center gap-1.5 rounded-full border border-navy/30 bg-white px-6 !text-[0.62rem] text-ink-2 transition-colors hover:border-navy hover:text-navy"
            >
              LinkedIn <Arrow className="h-3 w-3" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="caps inline-flex h-12 items-center gap-1.5 rounded-full border border-navy/30 bg-white px-6 !text-[0.62rem] text-ink-2 transition-colors hover:border-navy hover:text-navy"
            >
              GitHub <Arrow className="h-3 w-3" />
            </a>
          </div>
        </Reveal>

      </div>

      {/* travel skyline standing on the footer */}
      <div aria-hidden className="relative -mb-px">
        <TravelSkyline />
      </div>
      <footer className="bg-navy text-cream">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <span className="caps !text-[0.62rem]">Aritra Maity · Kolkata</span>
          <span className="display text-sm italic text-cream/70">Thanks for stopping by.</span>
        </div>
      </footer>
    </section>
  );
}
