import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { certificates, type Certificate } from "../data/certificates";
import { Chapter, ease, Reveal } from "../components/ui/motion";
import { TravelSkyline } from "../components/decor/Ornaments";
import { lockScroll } from "../components/layout/SmoothScroll";
import { navigate } from "../lib/router";

const tilts = [-1.6, 1.4, -1.1, 1.8];

function CertCard({ c, i, onOpen }: { c: Certificate; i: number; onOpen: () => void }) {
  const tilt = tilts[i % tilts.length];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ duration: 0.7, ease, delay: (i % 4) * 0.06 }}
      className="group"
    >
      <button
        onClick={onOpen}
        className="block w-full cursor-zoom-in rounded-[14px] border-[1.5px] border-navy bg-white p-3 shadow-[0_22px_40px_-22px_rgba(23,48,107,0.55)] transition-shadow duration-500 group-hover:shadow-[0_30px_50px_-22px_rgba(23,48,107,0.65)] sm:p-4"
        aria-label={`View certificate: ${c.title}`}
      >
        <div className="overflow-hidden rounded-[6px] bg-cream-2" style={{ aspectRatio: c.ratio }}>
          <img
            src={c.image}
            alt={`${c.title} certificate`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      </button>

      <div className="mt-5 px-1">
        <div className="flex items-center justify-between gap-3">
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.06em] text-navy uppercase">
            {c.issuer}
          </span>
          {c.badge && (
            <span className="rounded-full bg-navy px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.62rem] tracking-[0.08em] text-cream uppercase">
              {c.badge}
            </span>
          )}
        </div>
        <h3 className="display mt-2 text-[1.45rem] leading-snug text-ink md:text-[1.6rem]">{c.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.92rem] text-ink-2">
          <span>{c.date}</span>
          {c.detail && <span className="text-muted">{c.detail}</span>}
          {c.verifyUrl && (
            <a
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-mono)] text-[0.72rem] text-navy uppercase transition-opacity hover:opacity-70"
            >
              [ verify ↗ ]
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function CertificatesPage() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(certificates.map((c) => c.category)))], []);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Certificate | null>(null);
  const shown = filter === "All" ? certificates : certificates.filter((c) => c.category === filter);

  useEffect(() => {
    lockScroll(!!open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <section className="relative mx-auto max-w-[1200px] px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Chapter n="06" label="Certificates">
            Proof of <span className="italic">learning.</span>
          </Chapter>
          <Reveal className="mb-8 md:mb-16 md:max-w-xs">
            <p className="text-[1.05rem] leading-relaxed text-ink-2">
              Courses and programmes I’ve completed. Click any certificate to see it in full.
            </p>
          </Reveal>
        </div>

        {/* filter tabs */}
        <Reveal y={12} className="mb-12 flex flex-wrap items-center gap-2 md:mb-16">
          {categories.map((cat) => {
            const active = filter === cat;
            const count = cat === "All" ? certificates.length : certificates.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-mono)] text-[0.74rem] uppercase transition-colors ${
                  active ? "border-navy bg-navy text-cream" : "border-navy/30 text-navy hover:border-navy"
                }`}
              >
                {cat} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => (
              <CertCard key={c.slug} c={c} i={i} onOpen={() => setOpen(c)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 flex justify-center md:mt-28">
          <button
            onClick={() => navigate("/")}
            className="caps rounded-full border border-navy px-7 py-4 !text-[0.68rem] text-navy transition-colors hover:bg-navy hover:text-white"
          >
            ← Back to home
          </button>
        </div>
      </section>

      {/* footer, matching the home page */}
      <div aria-hidden className="relative -mb-px">
        <TravelSkyline />
      </div>
      <footer className="bg-navy text-cream">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <span className="caps !text-[0.62rem]">Aritra Maity · Kolkata</span>
          <span className="display text-sm italic text-cream/70">Thanks for stopping by.</span>
        </div>
      </footer>

      {/* full-size viewer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex cursor-zoom-out flex-col items-center justify-center p-4 md:p-10"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <div className="absolute inset-0 bg-navy-deep/90 backdrop-blur-md" />
            <motion.img
              src={open.image}
              alt={`${open.title} certificate`}
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="relative max-h-[80svh] w-auto max-w-[94vw] rounded-[8px] bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
            />
            <p className="relative mt-5 text-center">
              <span className="display text-xl italic text-white">{open.title}</span>
              <span className="ml-3 font-[family-name:var(--font-mono)] text-[0.7rem] text-sky uppercase">
                {open.issuer}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
