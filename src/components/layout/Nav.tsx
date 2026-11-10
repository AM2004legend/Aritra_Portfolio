import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { scrollToId, scrollToTop } from "./SmoothScroll";
import { useOpenResume } from "./ResumeModal";
import { ease } from "../ui/motion";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "weekends", label: "Hackathons" },
  { id: "travel", label: "Travel" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const openResume = useOpenResume();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500);
    setScrolled(y > 40);
  });

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-navy" style={{ scaleX: progress }} />
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? "border-b border-sand/70 bg-cream/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className={`mx-auto flex max-w-[1200px] items-center justify-between px-5 transition-all duration-500 md:px-10 ${scrolled ? "py-3" : "py-5 md:py-6"}`}>
          <button onClick={scrollToTop} className="flex items-center gap-2.5 text-navy" aria-label="Back to top">
            <span className="font-[family-name:var(--font-hand)] text-[2.1rem] leading-none font-bold">Aritra</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="caps link-draw !text-[0.68rem] text-ink-2 transition-colors hover:text-navy"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={openResume}
            className="caps rounded-full bg-navy px-5 py-2.5 !text-[0.66rem] text-white transition-colors hover:bg-navy-deep"
          >
            Résumé
          </button>
        </div>
      </motion.header>
    </>
  );
}
