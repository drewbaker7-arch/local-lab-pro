/**
 * SectionWrapper — LocalLab.pro UI Primitive
 *
 * The structural backbone of every page section. Controls two distinct
 * presentation modes driven by the `card` prop:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  card={false}  (default)                                        │
 * │  ─────────────                                                  │
 * │  Content renders directly on the sky-blue page canvas           │
 * │  (bg-page-bg = #a5dbff). Use for the Hero section and any       │
 * │  full-bleed treatments where you want the blue to show through. │
 * │                                                                 │
 * │  card={true}                                                    │
 * │  ─────────────                                                  │
 * │  Content is wrapped in a warm cream (#fbf9f5) rounded container │
 * │  that "floats" on the blue canvas. This is the defining visual  │
 * │  motif — cream papers pinned to a blue workshop wall.           │
 * │  rounded-3xl gives the large, friendly radius seen on the       │
 * │  reference site. A very subtle shadow lifts the card off the    │
 * │  canvas without competing with the content.                     │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Usage:
 *   <SectionWrapper id="services" card>
 *     ...
 *   </SectionWrapper>
 *
 *   <SectionWrapper id="hero">   ← no card, sits on blue
 *     ...
 *   </SectionWrapper>
 */

interface SectionWrapperProps {
  /** HTML id attribute — used by anchor navigation links. */
  id?: string;
  children: React.ReactNode;
  /**
   * When true, wraps the section in a warm cream card with rounded corners.
   * Set to false (or omit) for full-bleed sections like Hero that sit
   * directly on the sky-blue page background.
   */
  card?: boolean;
  /** Additional Tailwind classes passed through to the outer <section>. */
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  card = false,
  className = "",
}: SectionWrapperProps) {
  if (card) {
    /*
     * Card mode:
     * - mx-auto + max-w-6xl: constrains card width to match content grid
     * - bg-cream: the warm #fbf9f5 cream surface
     * - rounded-3xl: large friendly radius, signature of the reference design
     * - px-6 md:px-12 py-16 md:py-24: generous internal padding gives
     *   content breathing room inside the card
     * - shadow-sm: barely-there shadow separates card from blue canvas
     *   without adding visual noise
     * - scroll-mt-20: compensates for sticky nav offset on anchor jumps
     *
     * The outer <section> provides the vertical spacing between cards
     * (py-5 md:py-8) — keeping cards visually distinct on the blue canvas
     * without excessive gaps.
     */
    return (
      <section
        id={id}
        className={`scroll-mt-20 px-4 py-5 md:px-6 md:py-8 ${className}`}
      >
        <div
          className={`
            mx-auto max-w-6xl
            rounded-3xl
            bg-cream
            px-6 py-16
            shadow-sm
            md:px-12
            md:py-24
          `}
        >
          {children}
        </div>
      </section>
    );
  }

  /*
   * Non-card mode (default):
   * Section content renders directly on the sky-blue canvas.
   * Vertical padding is generous (py-20 md:py-28) since these sections
   * (e.g. Hero) typically fill a large viewport area.
   * The inner div constrains the content width to the standard grid.
   */
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">{children}</div>
    </section>
  );
}
