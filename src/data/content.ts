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

/** One step in a project's flowchart. */
export type FlowStep = { label: string; note?: string };

export type Project = {
  name: string;
  line: string;
  tags: string[];
  github?: string;
  live?: string;
  /** YouTube video id of the explainer (from youtube.com/shorts/<id>). */
  youtubeId?: string;
  /** Two or three plain sentences: what it is and why it exists. */
  about: string;
  /** Three short highlights. */
  points: string[];
  /** The project's flow, top to bottom, for the flowchart in the pop-up. */
  flow: FlowStep[];
};

export const projects: Project[] = [
  {
    name: "ChurnLens",
    line: "Churn prediction that caught its own data leak, and explains every customer’s risk.",
    tags: ["Python", "LightGBM", "SHAP"],
    github: `${GH}/ChurnLens`,
    live: "https://churnlens-fkwdmuukkgvssxus8ebsgh.streamlit.app/",
    youtubeId: "K8sDdVzfMnw",
    about:
      "One churn-analytics pipeline for any customer business. Give it a labelled customer table or a raw transaction log, and it cleans the data, guards against leakage, compares models, picks a decision threshold from the business’s own costs, and explains every prediction.",
    points: [
      "Tested unchanged on four datasets from four industries, including one with no churn label",
      "Caught a leak: 66% near-duplicate rows had pushed ROC-AUC to 0.9985; the honest score is 0.943",
      "SHAP gives each customer their top three risk reasons and a suggested action",
    ],
    flow: [
      { label: "Load & map", note: "one YAML maps any business’s columns" },
      { label: "Clean & split", note: "grouped or time-based, so nothing leaks" },
      { label: "Leakage guard", note: "flags IDs, duplicates, too-good features" },
      { label: "Compare models", note: "logistic regression vs LightGBM, 5-fold CV" },
      { label: "Pick a threshold", note: "maximise savings from real costs" },
      { label: "Explain & segment", note: "SHAP reasons + actions per customer" },
    ],
  },
  {
    name: "Actum",
    line: "Screenshots and voice notes become alarms and events. Gemma 4, fully offline.",
    tags: ["Kotlin", "Compose", "Gemma 4"],
    github: `${GH}/ActIum`,
    youtubeId: "1BDaYdlCNJc",
    about:
      "An offline Android app for the small jobs we keep putting off. Share a screenshot, a PDF or a note, or just say it, and Actum finds the tasks inside and turns each into a ready card: an event, an alarm, an expense, a contact or a to-do. You check it and tap once.",
    points: [
      "Gemma 4 E2B runs on the phone; the app has no internet permission at all",
      "The model only proposes; plain Kotlin resolves every date, time and amount",
      "Understands English, slang, Hinglish and Benglish",
    ],
    flow: [
      { label: "Share, type or say it", note: "screenshot · PDF · note · voice" },
      { label: "Rules first", note: "simple commands are read instantly" },
      { label: "Gemma on the phone", note: "everything else, as strict JSON" },
      { label: "Validator", note: "Kotlin checks dates, times, amounts" },
      { label: "One card per action", note: "every field editable" },
      { label: "Tap to confirm", note: "calendar · clock · contacts · ledger" },
    ],
  },
  {
    name: "SplitLedger",
    line: "Group expenses, settled in the fewest payments, exact to the paisa.",
    tags: ["TypeScript", "PostgreSQL"],
    github: `${GH}/SplitLedger`,
    youtubeId: "b6UY06yKI58",
    about:
      "Flatmates, hostel rooms and trips all end with “so who owes whom?”. SplitLedger records every shared expense, keeps an exact balance for each person, and works out a short list of payments that settles everyone. It’s a REST API with a small web app on top.",
    points: [
      "Money is stored as whole paise, so nothing is lost to floating point",
      "A max-heap settle-up never needs more than n − 1 payments for n people",
      "Balances are checked to sum to zero before the API returns them",
    ],
    flow: [
      { label: "Create a group", note: "sign up, add people by email" },
      { label: "Add an expense", note: "who paid, split equally or custom" },
      { label: "Split in paise", note: "leftover paise handed out one by one" },
      { label: "Running balances", note: "paid − shares ± settlements = 0 overall" },
      { label: "Settle up", note: "largest debtor pays largest creditor" },
      { label: "Record payments", note: "balances update instantly" },
    ],
  },
  {
    name: "FundPulse",
    line: "A daily pipeline for 18,000 mutual fund NAVs, with returns and drawdown.",
    tags: ["Python", "SQL", "Actions"],
    github: `${GH}/FundPulse`,
    live: "https://fundpulse.streamlit.app",
    youtubeId: "RJ_F8gBxBLs",
    about:
      "Every business day AMFI publishes the price of every mutual fund in India as one messy text file. FundPulse turns it into clean history automatically, every day, and computes returns, volatility and maximum drawdown in SQL for a live dashboard.",
    points: [
      "Runs itself every morning on GitHub Actions, with no manual steps",
      "Bad rows are quarantined, not crashed on; loads happen in one transaction",
      "Risk metrics are SQL window functions, tested like the Python code",
    ],
    flow: [
      { label: "Scheduled run", note: "GitHub Actions, every morning" },
      { label: "Extract", note: "download ~18,000 lines, with retries" },
      { label: "Raw layer", note: "every line kept exactly as received" },
      { label: "Transform", note: "parse, normalise, quarantine bad rows" },
      { label: "Load + quality checks", note: "one transaction, then 4 checks" },
      { label: "SQL views → dashboard", note: "returns, volatility, drawdown" },
    ],
  },
  {
    name: "AskMyDocs",
    line: "Ask your PDFs anything. Get page citations, never leaked personal data.",
    tags: ["FastAPI", "pgvector"],
    github: `${GH}/AskMyDocs`,
    youtubeId: "xu_Ld5kpZCY",
    about:
      "Upload any document and ask questions about it. Answers come only from the document and cite the chapter, clause or page, and the app says “I couldn’t find that” instead of guessing. In Sensitive mode, personal data never leaves your computer.",
    points: [
      "Hybrid search: meaning (pgvector) plus exact words, merged with RRF",
      "Off-topic questions are refused without calling the LLM at all",
      "Sensitive mode swaps personal data for placeholders locally, with a tripwire",
    ],
    flow: [
      { label: "Upload a document", note: "PDF · DOCX · EPUB · scans" },
      { label: "Parse & OCR locally", note: "split into sections and chunks" },
      { label: "Embed & index", note: "pgvector + full-text in Postgres" },
      { label: "Ask a question", note: "hybrid search finds the best excerpts" },
      { label: "Relevant enough?", note: "if not, refuse; no LLM call" },
      { label: "Answer with citations", note: "Gemini / Groq, redacted if sensitive" },
    ],
  },
  {
    name: "ServDeck",
    line: "A full Salesforce service desk: intake, routing and SLA escalation.",
    tags: ["Apex", "LWC", "Flow"],
    github: `${GH}/ServDeck`,
    youtubeId: "psuDuWWr_Tk",
    about:
      "A configurable service desk on Salesforce for any organisation that serves people: a housing society, a hostel, a co-working space or a support team. Requests are routed to the right team, get an SLA deadline, escalate automatically when late, and ask for a rating when closed.",
    points: [
      "Declarative flows for routing, SLA, escalation and feedback; Apex only where it’s needed",
      "A bulk-safe duplicate guard, tested with 200 records at once",
      "36 Apex tests, 97% coverage, plus a Unit 360 view and a manager dashboard",
    ],
    flow: [
      { label: "Web request", note: "Web-to-Case form, or logged by staff" },
      { label: "Route + SLA", note: "category → team queue, deadline set" },
      { label: "Duplicate guard", note: "same unit and category in 24 h" },
      { label: "Escalate if overdue", note: "fires exactly at the SLA deadline" },
      { label: "Resolve & close", note: "resolution time recorded" },
      { label: "Feedback + dashboard", note: "1–5 rating, managers see it all" },
    ],
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
