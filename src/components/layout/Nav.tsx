import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { lockScroll, scrollToId, scrollToTop } from "./SmoothScroll";
import { useOpenResume } from "./ResumeModal";
import { ease } from "../ui/motion";
import { isCertificatesPath, navigate, usePath } from "../../lib/router";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePath();
  const onCerts = isCertificatesPath(path);

  /** Section link: scroll on the home page, or go home and land on the section. */
  const toSection = (id: string) => {
    if (onCerts) navigate(`/#${id}`);
    else scrollToId(id);
  };
  const toHome = () => {
    if (onCerts) navigate("/");
    else scrollToTop();
  };
  const toCerts = () => navigate("/certificates");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500);
    setScrolled(y > 40);
  });

  // mobile menu: lock page scroll while open, close on Escape
  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // let the menu close (and scroll unlock) before jumping
    window.setTimeout(() => (id === "certificates" ? toCerts() : toSection(id)), 350);
  };

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-navy" style={{ scaleX: progress }} />
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? "border-b border-sand/70 bg-cream/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className={`mx-auto flex max-w-[1200px] items-center justify-between px-5 transition-all duration-500 md:px-10 ${scrolled ? "py-3" : "py-5 md:py-6"}`}>
          <button onClick={toHome} className="flex items-center gap-2.5 text-navy" aria-label="Home">
            <span className="font-[family-name:var(--font-hand)] text-[2.1rem] leading-none font-bold">Aritra</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => toSection(l.id)}
                className="caps link-draw !text-[0.68rem] text-ink-2 transition-colors hover:text-navy"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={toCerts}
              aria-current={onCerts ? "page" : undefined}
              className={`caps rounded-full border px-3.5 py-1.5 !text-[0.68rem] transition-colors ${
                onCerts ? "border-navy bg-navy text-white" : "border-navy/40 text-navy hover:bg-navy hover:text-white"
              }`}
            >
              Certificates
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openResume}
              className="caps rounded-full bg-navy px-5 py-2.5 !text-[0.66rem] text-white transition-colors hover:bg-navy-deep"
            >
              Résumé
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-navy/30 text-navy md:hidden"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-navy px-6 pt-5 pb-10 text-cream md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-hand)] text-[2.1rem] leading-none font-bold">Aritra</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/30"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-2">
              {[...links, { id: "certificates", label: "Certificates" }].map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.05 }}
                  className="flex items-baseline gap-4 text-left"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs text-sky">0{i + 1}</span>
                  <span className="font-[family-name:var(--font-poster)] text-5xl uppercase leading-[1.05]">{l.label}</span>
                </motion.button>
              ))}
            </nav>

            <button
              onClick={() => {
                setMenuOpen(false);
                openResume();
              }}
              className="caps mt-auto self-start rounded-full bg-cream px-6 py-3 !text-[0.7rem] text-navy"
            >
              View résumé
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
