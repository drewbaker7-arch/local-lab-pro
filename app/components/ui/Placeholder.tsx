/**
 * Placeholder — LocalLab.pro UI Primitive
 *
 * A labelled image placeholder used during development or when a real
 * image is not yet available. Maintains the correct aspect ratio so
 * layout does not shift when real images are eventually swapped in.
 *
 * Design decisions:
 * - bg-cream-dark (#f0eeeb): a step darker than the cream card surface
 *   so the placeholder is visible as a distinct zone, but warm enough
 *   to not read as a "loading state" or an error.
 * - text-text-subtle (#8a8a8a): the icon and label are intentionally
 *   quiet — they indicate a placeholder without demanding attention.
 * - rounded-2xl: proportional radius — slightly smaller than section
 *   card radius (rounded-3xl) since this is a child element.
 * - aspect-[4/3]: the most common landscape image ratio. Override
 *   via className if a different ratio is needed (e.g. aspect-square,
 *   aspect-video).
 */

interface PlaceholderProps {
  /** Descriptive label shown beneath the image icon. Defaults to "Image". */
  label?: string;
  /** Additional Tailwind classes — useful for overriding aspect ratio or sizing. */
  className?: string;
}

export function Placeholder({
  label = "Image",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`
        flex aspect-[4/3] items-center justify-center
        rounded-2xl
        bg-cream-dark
        ${className}
      `}
    >
      {/*
       * Icon + label are centered and styled in text-subtle (#8a8a8a).
       * The SVG uses a standard image/mountain icon so intent is immediately
       * clear without the element drawing visual attention.
       */}
      <div className="flex flex-col items-center gap-2 text-text-subtle">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Image frame */}
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          {/* Sun / lens circle */}
          <circle cx="8.5" cy="8.5" r="1.5" />
          {/* Mountain path */}
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
