/* ------------------------------------------------------------------ */
/* Side borders: Greek key down both page margins                      */
/* ------------------------------------------------------------------ */

export function SideBorders() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 right-0 z-0 hidden xl:block">
      <div className="meander-y absolute inset-y-0 left-5 opacity-45" />
      <div className="meander-y absolute inset-y-0 right-5 opacity-45" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Howrah Bridge clip-art: a solid silhouette that peeks in from the    */
/* edge of a section. Pass side="left" | "right".                       */
/* ------------------------------------------------------------------ */

const DECK = 128;
function topChord(x: number) {
  const pts: [number, number][] = [
    [60, DECK],
    [330, 18],
    [470, 64],
    [600, 54],
    [730, 64],
    [870, 18],
    [1140, DECK],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return DECK;
}

/** The bridge's shapes in a 1200 x 160 box, reusable inside other SVGs. */
function HowrahShape() {
  const step = 34;
  const web: string[] = [];
  let k = 0;
  for (let x = 60; x < 1140; x += step, k++) {
    const nx = Math.min(x + step, 1140);
    web.push(`M${x} ${topChord(x).toFixed(1)}V${DECK}`);
    web.push(k % 2 ? `M${x} ${topChord(x).toFixed(1)}L${nx} ${DECK}` : `M${x} ${DECK}L${nx} ${topChord(nx).toFixed(1)}`);
  }
  const chord = Array.from({ length: 109 }, (_, i) => 60 + i * 10)
    .map((x, i) => `${i ? "L" : "M"}${x} ${topChord(x).toFixed(1)}`)
    .join("");
  return (
    <g fill="none" stroke="currentColor" strokeLinejoin="round">
      <path d={web.join("")} strokeWidth="5" />
      <path d={chord} strokeWidth="10" />
      {[330, 870].map((tx) => (
        <rect key={tx} x={tx - 16} y="10" width="32" height="150" fill="currentColor" stroke="none" />
      ))}
      <rect x="0" y={DECK - 2} width="1200" height="16" fill="currentColor" stroke="none" />
    </g>
  );
}

export function HowrahClip({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 160" className={`pointer-events-none text-navy ${className}`}>
      <HowrahShape />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Travel skyline for the bottom of the page: Howrah Bridge, mountains, */
/* Statue of Liberty, Eiffel Tower, Taj Mahal, trees, birds, flight path */
/* ------------------------------------------------------------------ */

function Birds({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M0 0q6-7 12 0q6-7 12 0" />
      <path d="M30 -14q5-6 10 0q5-6 10 0" />
      <path d="M-22 -10q4-5 8 0q4-5 8 0" />
    </g>
  );
}

function onion(cx: number, base: number, w: number, h: number) {
  const r = w / 2;
  return `M${cx - r} ${base}C${cx - r * 1.25} ${base - h * 0.55} ${cx - r * 0.25} ${base - h * 0.7} ${cx} ${base - h}C${cx + r * 0.25} ${base - h * 0.7} ${cx + r * 1.25} ${base - h * 0.55} ${cx + r} ${base}Z`;
}

export function TravelSkyline({ className = "" }: { className?: string }) {
  const G = 236; // ground line
  return (
    <svg aria-hidden viewBox="0 0 1600 270" className={`block w-full text-navy ${className}`} fill="currentColor">
      {/* flight path + plane */}
      <path d="M640 120 C 760 60, 820 150, 930 95 S 1120 40, 1230 85 S 1400 70, 1470 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 7" opacity="0.7" />
      <path d="M1470 40l22-8-6 9 6 9z" />
      <Birds x={760} y={92} />
      <Birds x={1270} y={60} s={0.9} />
      <Birds x={1500} y={120} s={0.8} />

      {/* Howrah Bridge */}
      <svg x="0" y={G - 116} width="620" height="124" viewBox="0 0 1200 160" preserveAspectRatio="none">
        <HowrahShape />
      </svg>

      {/* mountains */}
      <g transform={`translate(600 ${G - 170})`}>
        <path d="M0 170 L95 70 L135 105 L205 0 L275 95 L310 62 L380 170Z" />
        <path d="M205 0 L182 34 L196 29 L207 41 L219 27 L231 33Z M95 70 L80 88 L94 83 L104 91Z M310 62 L298 76 L310 72 L320 79Z" fill="var(--color-cream)" />
      </g>

      {/* Statue of Liberty */}
      <g transform={`translate(985 ${G - 205})`}>
        <path d="M8 205V150h52v55z M14 150v-12h40v12z" />
        <path d="M22 138 L26 78 Q34 64 42 78 L46 138Z" />
        <circle cx="34" cy="60" r="8" />
        <path d="M26 54l-6-8M30 51l-2-10M34 50v-11M38 51l2-10M42 54l6-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M38 74 L50 26 L55 27 L44 76Z" />
        <path d="M47 26h10l-2-9h-6z" />
        <ellipse cx="52" cy="12" rx="4" ry="6" />
        <path d="M20 86h8v18h-8z" />
      </g>

      {/* Eiffel Tower */}
      <g transform={`translate(1075 ${G - 230})`}>
        <path d="M0 230 L32 158 L24 158 L24 148 L40 148 L50 100 L44 100 L44 92 L54 92 L58 44 L59 12 L60 0 L61 12 L62 44 L66 92 L76 92 L76 100 L70 100 L80 148 L96 148 L96 158 L88 158 L120 230 L96 230 Q60 170 24 230 Z" />
      </g>

      {/* Taj Mahal */}
      <g transform={`translate(1215 ${G - 170})`}>
        <path d="M0 160h270v10H0z" />
        <path d="M62 160V95h146v65z" />
        <path d="M117 160v-36q18-26 36 0v36z M78 160v-24q8-12 16 0v24z M176 160v-24q8-12 16 0v24z M78 122v-12q8-10 16 0v12z M176 122v-12q8-10 16 0v12z" fill="var(--color-cream)" />
        <path d="M98 88h74v7H98z" />
        <path d={onion(135, 88, 78, 64)} />
        <path d="M134 24h2v-16h-2z" />
        <circle cx="135" cy="7" r="2.5" />
        <path d={onion(80, 95, 22, 20)} />
        <path d={onion(190, 95, 22, 20)} />
        {[12, 258].map((mx) => (
          <g key={mx}>
            <path d={`M${mx - 5} 160V62h10v98z`} />
            <path d={onion(mx, 62, 14, 14)} />
            <path d={`M${mx - 7} 92h14v3h-14zM${mx - 7} 124h14v3h-14z`} />
          </g>
        ))}
      </g>

      {/* trees + hills */}
      <g transform={`translate(1490 ${G - 90})`}>
        <path d="M-10 90 Q 30 40 70 55 T 130 30 V90Z" />
        <circle cx="18" cy="48" r="16" />
        <circle cx="34" cy="40" r="14" />
        <path d="M24 60h4v30h-4z" />
        <path d="M78 46l8-26 8 26z M92 40l7-22 7 22z" />
      </g>

      {/* ground, flush with the footer */}
      <rect x="0" y={G} width="1600" height={270 - G} />
    </svg>
  );
}

/** Soft curved edge used to step from the navy section into white. */
export function Wave({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block w-full ${className}`}>
      <path d="M0 80V40C240 0 480 0 720 30s480 50 720 10v40z" fill="#ffffff" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Kolkata skyline silhouette: sits on top of the navy section          */
/* ------------------------------------------------------------------ */

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 150"
      preserveAspectRatio="xMidYMax slice"
      className={`block w-full text-navy ${className}`}
      fill="currentColor"
    >
      {/* old north-Kolkata houses */}
      <path d="M0 150V108h70v-14h46v14h58v-24h52v66zM230 150V96h40v-10h60v10h36v54zM380 150v-40h70v40z" />
      {/* Victoria Memorial */}
      <path d="M470 150v-38h40v-10h50v-14h120v14h50v10h40v38z" />
      <path d="M560 88a60 52 0 0 1 120 0z" />
      <path d="M612 40h16v-12h-16z M620 28l-4-10h8z" />
      <circle cx="620" cy="14" r="4" />
      <path d="M492 102a14 14 0 0 1 28 0z M720 102a14 14 0 0 1 28 0z" />
      {/* more houses */}
      <path d="M770 150v-50h60v-12h40v12h44v50zM930 150v-34h62v34z" />
      {/* Shaheed Minar */}
      <path d="M1022 150v-12h8V40h12v98h8v12z" />
      <path d="M1026 40a10 10 0 0 1 20 0z" />
      <path d="M1034 30v-8h4v8z" />
      <path d="M1070 150V100h64v-10h44v10h60v50zM1250 150v-36h80v-14h44v14h66v36z" />
    </svg>
  );
}
