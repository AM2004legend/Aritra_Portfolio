import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "../../data/content";
import { lockScroll } from "../layout/SmoothScroll";
import { ease } from "./motion";

/** Vertical flowchart: numbered steps joined by arrows. */
function FlowChart({ steps }: { steps: Project["flow"] }) {
  return (
    <ol className="relative">
      {steps.map((s, i) => (
        <motion.li
          key={s.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.35 + i * 0.08 }}
          className="relative"
        >
          <div className="flex items-stretch gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy font-[family-name:var(--font-mono)] text-[0.72rem] text-cream">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 rounded-[12px] border-[1.5px] border-navy/70 bg-white px-4 py-2.5 shadow-[0_8px_18px_-14px_rgba(23,48,107,0.6)]">
              <div className="font-[family-name:var(--font-poster)] text-[1.15rem] leading-tight uppercase text-navy">{s.label}</div>
              {s.note && <div className="mt-0.5 text-[0.86rem] leading-snug text-ink-2">{s.note}</div>}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div aria-hidden className="flex h-6 w-8 items-center justify-center">
              <svg viewBox="0 0 10 24" className="h-6 w-2.5 text-navy/60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 1v20M1.5 17.5 5 21l3.5-3.5" />
              </svg>
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    lockScroll(!!project);
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
        >
          <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="relative flex max-h-[94svh] w-full max-w-[1080px] flex-col overflow-hidden rounded-t-[26px] bg-cream shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:rounded-[26px]"
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease }}
          >
            {/* header */}
            <div className="flex items-center justify-between gap-4 border-b border-sand bg-navy px-5 py-3.5 text-cream md:px-7">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-poster)] text-[1.7rem] leading-none uppercase">{project.name}</span>
                <span className="hidden font-[family-name:var(--font-mono)] text-[0.7rem] uppercase text-sky sm:inline">
                  {project.tags.join(" · ")}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/30 transition-colors hover:bg-cream/10"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div className="overflow-y-auto" data-lenis-prevent>
              <div className="grid gap-7 p-5 md:grid-cols-[minmax(0,330px)_1fr] md:gap-10 md:p-8">
                {/* video, a phone-shaped frame for the vertical Short */}
                <div className="mx-auto w-full max-w-[230px] sm:max-w-[280px] md:max-w-none">
                  <div className="rounded-[30px] bg-ink p-2.5 shadow-[0_24px_40px_-20px_rgba(0,0,0,0.6)]">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-navy-deep">
                      {project.youtubeId ? (
                        <iframe
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={`${project.name} explainer video`}
                          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                          allowFullScreen
                        />
                      ) : (
                        <div className="grid h-full place-items-center px-6 text-center font-[family-name:var(--font-mono)] text-[0.75rem] uppercase text-cream/70">
                          Video coming soon
                        </div>
                      )}
                    </div>
                  </div>
                  {project.youtubeId && (
                    <a
                      href={`https://youtube.com/shorts/${project.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-center font-[family-name:var(--font-mono)] text-[0.7rem] uppercase text-navy transition-opacity hover:opacity-70"
                    >
                      [ watch on YouTube ↗ ]
                    </a>
                  )}
                </div>

                {/* explanation + flowchart */}
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[0.74rem] tracking-[0.06em] text-navy uppercase">
                    [ what it is ]
                  </div>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-ink">{project.about}</p>

                  <ul className="mt-5 space-y-2.5">
                    {project.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.95rem] leading-snug text-ink-2">
                        <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-navy" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 font-[family-name:var(--font-mono)] text-[0.74rem] tracking-[0.06em] text-navy uppercase">
                    [ how it flows ]
                  </div>
                  <div className="mt-4">
                    <FlowChart steps={project.flow} />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="caps rounded-full bg-navy px-6 py-3 !text-[0.66rem] text-white transition-colors hover:bg-navy-deep"
                      >
                        View code ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="caps rounded-full border border-navy px-6 py-3 !text-[0.66rem] text-navy transition-colors hover:bg-navy hover:text-white"
                      >
                        Try it live ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
