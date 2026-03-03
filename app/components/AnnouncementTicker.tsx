/**
 * AnnouncementTicker — LocalLab.pro
 *
 * A stock-ticker-style announcement bar fixed at the very top of the
 * viewport, above the navbar. Scrolls a "risk free guarantee" message
 * continuously from right to left.
 *
 * Design decisions:
 * - bg-charcoal + text-yellow: dark band with warm accent text.
 *   Mirrors the footer's dark strip, bookending the page.
 * - font-body (Plus Jakarta Sans) for consistency with body text.
 * - Inline CSS animation to avoid Tailwind v4 class purging issues.
 * - fixed top-0 z-[60]: sits above the navbar (z-50), below the
 *   booking modal (z-[100]).
 */

/** The announcement message displayed in the ticker. */
const MESSAGE =
  "risk free guarantee   \u2013   if you don\u2019t like it   \u2013   I won\u2019t charge you";

/**
 * Number of times to repeat the message. 8 repetitions ensures no
 * visible gap during the CSS translateX(-50%) loop on wide screens.
 */
const REPETITIONS = 8;

export function AnnouncementTicker() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-charcoal py-2"
      aria-label="Risk free guarantee. If you don't like it, I won't charge you."
      role="marquee"
    >
      {/* Inline style keyframe + animation to bypass Tailwind v4 purging */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 30s linear infinite" }}
      >
        {Array.from({ length: REPETITIONS }).map((_, i) => (
          <span
            key={i}
            className="mx-8 shrink-0 font-body text-xs font-semibold tracking-widest text-white"
          >
            {MESSAGE}
          </span>
        ))}
      </div>
    </div>
  );
}
