import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { profile } from "../../data/content";
import { ease } from "../ui/motion";
import { lockScroll } from "./SmoothScroll";

const ResumeContext = createContext<() => void>(() => {});

/** Returns a function that opens the résumé viewer. */
export const useOpenResume = () => useContext(ResumeContext);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <ResumeContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Résumé"
          >
            <div className="absolute inset-0 bg-ink/35 backdrop-blur-[6px]" onClick={() => setOpen(false)} />

            <motion.div
              className="relative flex max-h-[94svh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-3xl bg-cream shadow-[0_40px_120px_-20px_rgba(29,27,24,0.45)] sm:rounded-3xl"
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-sand px-5 py-3.5 sm:px-6">
                <div>
                  <div className="display text-xl">Résumé</div>
                  <div className="caps !text-[10px]">Aritra Maity · one page</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={profile.resume}
                    download="Aritra_Maity_Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm text-cream transition-transform hover:-translate-y-px active:scale-95"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download
                  </a>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden rounded-full border border-sand px-4 py-2 text-sm text-ink-2 transition-colors hover:border-muted sm:inline-flex"
                  >
                    Open PDF
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-cream-2"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto bg-cream-2 p-3 sm:p-6" data-lenis-prevent>
                <motion.img
                  src="/resume-page-1.webp"
                  alt="Résumé of Aritra Maity"
                  className="mx-auto w-full rounded-md bg-white shadow-[0_10px_40px_-12px_rgba(29,27,24,0.25)]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeContext.Provider>
  );
}
