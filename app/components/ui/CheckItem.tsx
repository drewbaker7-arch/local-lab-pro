/**
 * CheckItem — LocalLab.pro UI Primitive
 *
 * A single feature / benefit list item with a teal checkmark icon.
 * Used inside PricingCard feature lists and anywhere a bulleted benefit
 * list is needed.
 *
 * Design decisions:
 * - Teal checkmark (text-teal = #2a9d8f): teal is the single action /
 *   positive-signal color in the palette. Using it on checkmarks
 *   reinforces the "this is good" read instantly without explanation.
 * - text-text-muted (#454545) for the label: darker than a light gray
 *   but clearly subordinate to primary headings. Maintains legibility
 *   on both cream card backgrounds and highlighted cream-yellow cards.
 * - items-start: aligns the icon to the first line of multi-line text,
 *   which is more readable than items-center when features wrap.
 * - mt-0.5 on the icon: slight downward nudge to optically align the
 *   check center with the cap-height of the adjacent text.
 * - shrink-0 on the icon: prevents the SVG from compressing if the
 *   text is very long (e.g. in narrow pricing columns).
 */

interface CheckItemProps {
  children: React.ReactNode;
}

export function CheckItem({ children }: CheckItemProps) {
  return (
    <li className="flex items-start gap-3">
      {/*
       * Teal filled checkmark SVG.
       * Uses a filled path (not stroke) for crispness at small sizes (20×20).
       * aria-hidden: decorative icon — the text content carries the meaning.
       */}
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-teal"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>

      {/* Feature label — text-muted for a clear hierarchy step below headings */}
      <span className="text-text-muted">{children}</span>
    </li>
  );
}
