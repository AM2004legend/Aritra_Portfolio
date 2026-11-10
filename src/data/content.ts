const GH = "https://github.com/AM2004legend";

export const profile = {
  name: "Aritra Maity",
  email: "aritra2004maity@gmail.com",
  github: GH,
  linkedin: "https://www.linkedin.com/in/aritra-maity-a7526b324/",
  resume: "/Aritra_Maity_Resume.pdf",
  portrait: "/photos/portrait.webp",
};

/* ---------- At a glance (right under the hero, for recruiters) ---------- */

export const education = [
  {
    title: "B.Tech, Computer Science & Business Systems",
    place: "Heritage Institute of Technology, Kolkata",
    meta: "2024 – 2028 · SGPA 8.52",
  },
  {
    title: "Class XII (Science) · Class X",
    place: "DAV Public School, Haldia",
    meta: "84.8% · 96.3%",
  },
];

export const skills = [
  "Java", "Python", "TypeScript", "Kotlin", "C++", "SQL",
  "Node.js", "FastAPI", "PostgreSQL", "Prisma",
  "scikit-learn", "LightGBM", "RAG", "Android", "Salesforce", "Docker",
];

export const highlights = [
  "1st place, HackInverse 1.0",
  "Google Gemini Student Ambassador ’26",
  "Finalist, HackHeritage & Aignite ’25",
  "NPTEL, IIT Roorkee & IIT Madras",
];

/* ---------- Projects: one line each ---------- */

export type Project = {
  name: string;
  line: string;
  tags: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "ChurnLens",
    line: "Churn prediction that caught its own data leak, and explains every customer’s risk.",
    tags: ["Python", "LightGBM", "SHAP"],
    github: `${GH}/ChurnLens`,
    live: "https://churnlens-fkwdmuukkgvssxus8ebsgh.streamlit.app/",
  },
  {
    name: "Actum",
    line: "Screenshots and voice notes become alarms and events. Gemma 4, fully offline.",
    tags: ["Kotlin", "Compose", "Gemma 4"],
    github: `${GH}/ActIum`,
  },
  {
    name: "SplitLedger",
    line: "Group expenses, settled in the fewest payments, exact to the paisa.",
    tags: ["TypeScript", "PostgreSQL"],
    github: `${GH}/SplitLedger`,
  },
  {
    name: "FundPulse",
    line: "A daily pipeline for 18,000 mutual fund NAVs, with returns and drawdown.",
    tags: ["Python", "SQL", "Actions"],
    github: `${GH}/FundPulse`,
    live: "https://fundpulse.streamlit.app",
  },
  {
    name: "AskMyDocs",
    line: "Ask your PDFs anything. Get page citations, never leaked personal data.",
    tags: ["FastAPI", "pgvector"],
    github: `${GH}/AskMyDocs`,
  },
  {
    name: "ServDeck",
    line: "A full Salesforce service desk: intake, routing and SLA escalation.",
    tags: ["Apex", "LWC", "Flow"],
    github: `${GH}/ServDeck`,
  },
];

export const moreProjects = [
  { name: "NextStep", href: "https://next-step-vert.vercel.app" },
  { name: "DigiSuraksha", href: `${GH}/DigiSuraksha-SIH` },
  { name: "Gram Setu Chain", href: `${GH}/gram-setu-chain` },
  { name: "Asciiart", href: "https://asciiart-liard.vercel.app" },
];

/* ---------- Photos. CAPTIONS ARE DRAFTS: replace with your own. ---------- */

export type Photo = { src: string; caption: string; date: string; ratio: number; focus?: string };

/** About collage: bento grid (4 columns on desktop). CAPTIONS ARE DRAFTS. */
export type Moment = { src: string; caption: string; span: string; focus?: string };

export const moments: Moment[] = [
  { src: "/photos/hackinverse-crew.webp", caption: "HackInverse crew", span: "col-span-2 row-span-2", focus: "50% 45%" },
  { src: "/photos/hackspire-booth.webp", caption: "Hackspire", span: "row-span-2", focus: "50% 40%" },
  { src: "/photos/daksh.webp", caption: "Daksh 2026", span: "", focus: "50% 50%" },
  { src: "/photos/hult.webp", caption: "Hult Prize ’26", span: "", focus: "50% 72%" },
];

/** Hackathon gallery (navy section). */
export const photos: Photo[] = [
  { src: "/photos/hackinverse-win.webp", caption: "HackInverse 1.0, first place", date: "Oct 2026", ratio: 4 / 3 },
  { src: "/photos/hackspire-badges.webp", caption: "Signed in at Hackspire", date: "Oct 2026", ratio: 3 / 4 },
  { src: "/photos/hult.webp", caption: "Hult Prize ’26", date: "2026", ratio: 1 },
  { src: "/photos/ecoverse-pitch.webp", caption: "Pitching EcoVerse", date: "May 2026", ratio: 4 / 3 },
  { src: "/photos/gemma-benchmark.webp", caption: "Benchmarking Gemma on a phone", date: "Oct 2026", ratio: 4 / 3 },
];

/**
 * Travel vision board: polaroids. CAPTIONS ARE DRAFTS.
 * To add a photo: drop it in public/photos and set `src` on one of the
 * blank polaroids below (the ones without a src), or add a new entry.
 */
export type Polaroid = { src?: string; caption: string; focus?: string };

export const travel: Polaroid[] = [
  { src: "/photos/river.webp", caption: "where the river runs loud", focus: "50% 45%" },
  { src: "/photos/hills-clouds.webp", caption: "clouds rolling in", focus: "70% 50%" },
  { src: "/photos/cat.webp", caption: "made a friend", focus: "50% 30%" },
  { src: "/photos/window-mountains.webp", caption: "room with a view", focus: "50% 50%" },
  { src: "/photos/dog.webp", caption: "and another one", focus: "50% 35%" },
  { src: "/photos/beach.webp", caption: "salt air", focus: "50% 40%" },
  { src: "/photos/sunset.webp", caption: "sunset by the sea", focus: "52% 50%" },
  { src: "/photos/peaks.webp", caption: "first light on the peaks", focus: "38% 50%" },
];

export const milestones = [
  { year: "2026", title: "1st place, HackInverse 1.0" },
  { year: "2026", title: "Google Gemini Student Ambassador" },
  { year: "2026", title: "Organising committee, Daksh" },
  { year: "2025", title: "Finalist, HackHeritage & Aignite" },
  { year: "2025", title: "Top 20, Smart India Hackathon (college)" },
  { year: "", title: "4th place, IIM Calcutta Genesis BizQuiz" },
];
