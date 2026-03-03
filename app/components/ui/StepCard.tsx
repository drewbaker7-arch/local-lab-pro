/**
 * ProcessStep — LocalLab.pro UI Primitive
 *
 * A single step in the "How It Works" process grid. Features:
 *
 * - Large teal step number as the primary visual anchor
 * - Gradient reveal on hover (direction depends on grid row)
 * - Animated left bar indicator (neutral → teal, grows on hover)
 * - Title shifts right on hover for tactile feedback
 *
 * Designed to sit directly on the sky-blue canvas (#a5dbff).
 * Used inside a 2x2 responsive grid (1 col mobile, 2 cols md+).
 * Border classes are passed in since they depend on grid position.
 */

interface ProcessStepProps {
  /** Step number (1–4) displayed as a large teal numeral. */
  stepNumber: number;
  /** Step title — rendered in font-heading with hover shift. */
  title: string;
  /** Short description of this step. */
  description: string;
  /** Zero-based index — determines hover gradient direction. */
  index: number;
  /** Responsive border classes — varies by grid position. */
  borderClasses?: string;
}

export function ProcessStep({
  stepNumber,
  title,
  description,
  index,
  borderClasses = "",
}: ProcessStepProps) {
  /*
   * Top row (indices 0, 1): gradient washes up from the bottom.
   * Bottom row (indices 2, 3): gradient washes down from the top.
   * This creates a "meeting in the middle" hover energy across the 2x2 grid.
   */
  const isTopRow = index < 2;

  return (
    <div
      className={`relative flex flex-col py-10 group/feature ${borderClasses}`}
    >
      {/* Hover gradient reveal — direction depends on row */}
      <div
        className={`pointer-events-none absolute inset-0 h-full w-full opacity-0 transition duration-200 group-hover/feature:opacity-100 ${
          isTopRow
            ? "bg-gradient-to-t from-white/25 to-transparent"
            : "bg-gradient-to-b from-white/25 to-transparent"
        }`}
        aria-hidden="true"
      />

      {/* Step number — large teal numeral as the primary visual */}
      <div className="relative z-10 mb-4 px-8">
        <span className="font-heading text-5xl font-bold text-teal">
          {stepNumber}
        </span>
      </div>

      {/* Title with animated left bar indicator */}
      <div className="relative z-10 mb-2 px-8">
        {/*
         * Left bar — translucent white at rest, teal on hover.
         * Grows from h-6 to h-8 for a satisfying stretch microinteraction.
         */}
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-white/30 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-teal" />
        <span className="inline-block font-heading text-xl font-bold text-text-primary transition duration-200 group-hover/feature:translate-x-2 md:text-2xl">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="relative z-10 px-8 text-sm leading-relaxed text-text-muted">
        {description}
      </p>
    </div>
  );
}
